import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WalletState } from '@/types'

interface WalletStore extends WalletState {
  setWallet: (wallet: Partial<WalletState>) => void
  disconnect: () => void
  switchNetwork: (network: 'mainnet' | 'testnet' | 'futurenet' | 'standalone') => void
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set) => ({
      isConnected: false,
      address: null,
      publicKey: null,
      network: 'testnet',
      balance: '0',
      setWallet: (wallet) => set((state) => ({ ...state, ...wallet })),
      disconnect: () =>
        set({
          isConnected: false,
          address: null,
          publicKey: null,
          balance: '0',
        }),
      switchNetwork: (network) => set({ network }),
    }),
    {
      name: 'wallet-storage',
    }
  )
)
