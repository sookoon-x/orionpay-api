import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Web3 } from 'web3';

@Injectable()
export class BlockchainService {
  private providers: Map<string, Web3>;

  constructor(private configService: ConfigService) {
    this.providers = new Map();
    this.initializeProviders();
  }

  private initializeProviders() {
    // Initialize RPC providers for each supported chain
    const rpcUrls = this.configService.get<string>('BLOCKCHAIN_RPC_URLS', '').split(',');
    
    const chains = ['ethereum', 'polygon', 'arbitrum', 'optimism', 'base', 'solana', 'avalanche'];
    chains.forEach((chain, index) => {
      if (rpcUrls[index]) {
        this.providers.set(chain, new Web3(rpcUrls[index]));
      }
    });
  }

  async generateAddress(chain: string): Promise<string> {
    const web3 = this.providers.get(chain);
    if (!web3) throw new Error(`No provider configured for chain: ${chain}`);
    
    const account = web3.eth.accounts.create();
    return account.address;
  }

  async getBalance(chain: string, address: string): Promise<number> {
    const web3 = this.providers.get(chain);
    if (!web3) throw new Error(`No provider configured for chain: ${chain}`);
    
    const balance = await web3.eth.getBalance(address);
    return Number(web3.utils.fromWei(balance, 'ether'));
  }

  async sendTransaction(
    chain: string,
    fromAddress: string,
    toAddress: string,
    amount: number,
    privateKey: string
  ): Promise<string> {
    const web3 = this.providers.get(chain);
    if (!web3) throw new Error(`No provider configured for chain: ${chain}`);
    
    const value = web3.utils.toWei(amount.toString(), 'ether');
    const gasPrice = await web3.eth.getGasPrice();
    
    const tx = {
      from: fromAddress,
      to: toAddress,
      value,
      gas: 21000,
      gasPrice,
    };
    
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
    return receipt.transactionHash.toString();
  }

  getSupportedChains(): string[] {
    return Array.from(this.providers.keys());
  }
}