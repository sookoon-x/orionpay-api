"""
Price Analysis Service for OrionPay
Provides price analysis, predictions, and market insights for cryptocurrencies
"""
from typing import Dict, Any, List
import numpy as np
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta

class PriceAnalysisService:
    def __init__(self):
        self.price_history = self._initialize_price_history()
        self.models = self._initialize_models()
    
    def _initialize_price_history(self) -> Dict[str, List[float]]:
        """Initialize sample price history for major cryptocurrencies"""
        # Generate 30 days of sample price data
        history = {}
        base_prices = {
            "ETH": 3500,
            "BTC": 68000,
            "MATIC": 0.85,
            "SOL": 175,
            "AVAX": 45,
            "OP": 3.50,
            "BASE": 1.20
        }
        
        for currency, base_price in base_prices.items():
            prices = []
            current_price = base_price * 0.9  # Start 10% lower
            for _ in range(30):
                # Add random walk with slight upward trend
                change = np.random.normal(0.01, 0.05)
                current_price *= (1 + change)
                prices.append(current_price)
            history[currency.upper()] = prices
        
        return history
    
    def _initialize_models(self) -> Dict[str, LinearRegression]:
        """Initialize prediction models for each currency"""
        models = {}
        for currency in self.price_history.keys():
            model = LinearRegression()
            # Train on historical data
            X = np.arange(30).reshape(-1, 1)
            y = self.price_history[currency]
            model.fit(X, y)
            models[currency] = model
        return models
    
    def analyze(self, currency: str) -> Dict[str, Any]:
        """
        Get comprehensive price analysis for a currency
        """
        currency = currency.upper()
        if currency not in self.price_history:
            raise ValueError(f"No price data available for {currency}")
        
        prices = self.price_history[currency]
        current_price = prices[-1]
        week_ago = prices[-7] if len(prices) >=7 else prices[0]
        month_ago = prices[0]
        
        # Calculate metrics
        weekly_change = ((current_price - week_ago) / week_ago) * 100
        monthly_change = ((current_price - month_ago) / month_ago) * 100
        
        # Generate predictions
        predictions = self._predict_prices(currency, days_ahead=7)
        
        # Generate insights
        insights = self._generate_insights(currency, current_price, weekly_change, monthly_change, predictions)
        
        return {
            "currency": currency,
            "current_price_usd": round(current_price, 2),
            "weekly_change_percent": round(weekly_change, 2),
            "monthly_change_percent": round(monthly_change, 2),
            "7day_forecast": [round(p, 2) for p in predictions],
            "insights": insights,
            "last_updated": datetime.utcnow().isoformat()
        }
    
    def _predict_prices(self, currency: str, days_ahead: int) -> List[float]:
        """Generate price predictions for the next N days"""
        model = self.models[currency]
        future_days = np.arange(30, 30 + days_ahead).reshape(-1, 1)
        predictions = model.predict(future_days)
        return predictions.tolist()
    
    def _generate_insights(self, currency: str, current_price: float, 
                          weekly_change: float, monthly_change: float,
                          predictions: List[float]) -> List[str]:
        """Generate actionable insights based on price analysis"""
        insights = []
        next_week_prediction = predictions[-1]
        projected_change = ((next_week_prediction - current_price) / current_price) * 100
        
        # Current trend insights
        if monthly_change > 10:
            insights.append(f"{currency} has shown strong upward momentum over the past month")
        elif monthly_change < -10:
            insights.append(f"{currency} has experienced downward pressure over the past month")
        
        # Prediction insights
        if projected_change > 5:
            insights.append("Bullish forecast: Expected to rise over 5% in the next 7 days")
        elif projected_change < -5:
            insights.append("Bearish forecast: Expected to fall over 5% in the next 7 days")
        else:
            insights.append("Stable forecast: Expected to remain relatively flat next week")
        
        # Volatility assessment
        recent_volatility = np.std(self.price_history[currency][-7:]) / current_price * 100
        if recent_volatility > 5:
            insights.append("High volatility detected - exercise caution with large transactions")
        elif recent_volatility < 2:
            insights.append("Low volatility detected - favorable conditions for large transactions")
        
        return insights
    
    def get_best_execution_time(self, currency: str, amount: float) -> Dict[str, Any]:
        """Recommend the best time to execute a large transaction"""
        # Analyze historical patterns to find optimal execution window
        analysis = self.analyze(currency)
        predictions = analysis['7day_forecast']
        min_price = min(predictions)
        min_day = predictions.index(min_price)
        
        optimal_date = datetime.utcnow() + timedelta(days=min_day)
        
        return {
            "optimal_execution_day": optimal_date.isoformat(),
            "predicted_price_at_execution": round(min_price, 2),
            "potential_savings_usd": round(amount * (predictions[0] - min_price) / predictions[0], 2),
            "confidence_level": "medium"  # Would be calculated based on model accuracy
        }