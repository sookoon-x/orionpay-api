"""
Fraud Detection Service for OrionPay
Uses machine learning to identify suspicious transactions
"""
from typing import Dict, List, Any
import numpy as np
from sklearn.ensemble import IsolationForest

class FraudDetectionService:
    def __init__(self):
        # Initialize anomaly detection model
        self.model = IsolationForest(contamination=0.1, random_state=42)
        self._train_initial_model()
    
    def _train_initial_model(self):
        """Train the model with sample data (would be replaced with real transaction data)"""
        # Sample feature vectors representing normal transactions
        sample_transactions = np.random.randn(1000, 10)  # 10 features
        self.model.fit(sample_transactions)
    
    def analyze(self, transaction: Dict[str, Any]) -> float:
        """
        Analyze a transaction and return fraud risk score (0-1)
        Higher score = higher risk of fraud
        """
        # Extract features from transaction
        features = self._extract_features(transaction)
        
        # Get anomaly score from model
        score = self.model.score_samples([features])[0]
        
        # Normalize score to 0-1 range
        normalized_score = self._normalize_score(score)
        
        return normalized_score
    
    def _extract_features(self, transaction: Dict[str, Any]) -> List[float]:
        """Extract numerical features from transaction for model input"""
        features = []
        features.append(transaction.get('amount', 0))
        features.append(len(transaction.get('sender_address', '')))
        features.append(len(transaction.get('recipient_address', '')))
        # Add more features as needed - transaction frequency, location, etc.
        
        # Pad to ensure consistent feature length
        while len(features) < 10:
            features.append(0.0)
        
        return features
    
    def _normalize_score(self, raw_score: float) -> float:
        """Convert raw model score to 0-1 risk score"""
        # Isolation Forest returns negative scores, more negative = more anomalous
        # Scale to 0-1 where 1 is highest risk
        min_score = -10
        max_score = 0
        normalized = (raw_score - min_score) / (max_score - min_score)
        return max(0, min(1, 1 - normalized))  # Invert so higher = riskier
    
    def get_recommendations(self, risk_score: float) -> List[str]:
        """Generate recommendations based on risk score"""
        if risk_score > 0.9:
            return ["Block transaction", "Flag account for review", "Additional verification required"]
        elif risk_score > 0.7:
            return ["Flag for manual review", "Monitor account activity"]
        elif risk_score > 0.5:
            return ["Monitor transaction", "Additional checks recommended"]
        else:
            return ["Transaction approved", "No additional actions needed"]