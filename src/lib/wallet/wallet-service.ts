import { FreighterApi } from '@stellar/freighter-api'
import { WalletKit } from '@stellar/wallet-sdk'
import { SorobanSDK } from '../soroban/sdk'

export interface WalletInfo {
  publicKey: string
  address: string
  network: string
}

export class WalletService {
  private freighterApi: FreighterApi
  private walletKit: WalletKit
  private sorobanSDK: SorobanSDK

  constructor() {
    this.freighterApi = new FreighterApi()
    this.walletKit = new WalletKit({
      network: 'testnet',
    })
    this.sorobanSDK = new SorobanSDK('testnet')
  }

  async isFreighterConnected(): Promise<boolean> {
    try {
      return await this.freighterApi.isConnected()
    } catch (error) {
      console.error('Error checking Freighter connection:', error)
      return false
    }
  }

  async connectFreighter(): Promise<WalletInfo> {
    try {
      const publicKey = await this.freighterApi.getPublicKey()
      const address = publicKey
      
      // Get balance
      const balance = await this.sorobanSDK.getBalance(address)
      
      return {
        publicKey,
        address,
        network: 'testnet',
      }
    } catch (error) {
      console.error('Error connecting Freighter:', error)
      throw new Error('Failed to connect Freighter wallet')
    }
  }

  async connectWalletKit(): Promise<WalletInfo> {
    try {
      const { publicKey } = await this.walletKit.getAddress()
      const address = publicKey
      
      // Get balance
      const balance = await this.sorobanSDK.getBalance(address)
      
      return {
        publicKey,
        address,
        network: 'testnet',
      }
    } catch (error) {
      console.error('Error connecting WalletKit:', error)
      throw new Error('Failed to connect wallet')
    }
  }

  async signTransaction(xdr: string): Promise<string> {
    try {
      const signedXdr = await this.freighterApi.signTransaction(xdr, 'testnet')
      return signedXdr
    } catch (error) {
      console.error('Error signing transaction:', error)
      throw new Error('Failed to sign transaction')
    }
  }

  async getNetwork(): Promise<string> {
    try {
      const network = await this.freighterApi.getNetwork()
      return network
    } catch (error) {
      console.error('Error getting network:', error)
      return 'testnet'
    }
  }

  async disconnect(): Promise<void> {
    // Freighter doesn't have a disconnect method, but we can clear local state
    // WalletKit may have disconnect functionality
    try {
      // Clear any session data if needed
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
    }
  }
}

export const walletService = new WalletService()
