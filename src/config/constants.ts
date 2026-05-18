export const NETWORKS = {
  MAINNET: 'https://horizon.stellar.org',
  TESTNET: 'https://horizon-testnet.stellar.org',
  FUTURENET: 'https://horizon-futurenet.stellar.org',
  STANDALONE: 'http://localhost:8000',
} as const

export const SOROBAN_NETWORKS = {
  MAINNET: {
    networkPassphrase: 'Public Global Stellar Network ; September 2015',
    rpcUrl: 'https://rpc.mainnet.stellar.org',
  },
  TESTNET: {
    networkPassphrase: 'Test SDF Network ; September 2021',
    rpcUrl: 'https://soroban-testnet.stellar.org',
  },
  FUTURENET: {
    networkPassphrase: 'Test SDF Future Network ; October 2022',
    rpcUrl: 'https://rpc-futurenet.stellar.org',
  },
  STANDALONE: {
    networkPassphrase: 'Standalone Network ; February 2017',
    rpcUrl: 'http://localhost:8000/soroban/rpc',
  },
} as const

export const CONTRACT_IDS = {
  AID_TOKEN: (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_AID_TOKEN_CONTRACT) || '',
  CAMPAIGN_MANAGER: (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_CAMPAIGN_MANAGER_CONTRACT) || '',
  BENEFICIARY_REGISTRY: (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_BENEFICIARY_REGISTRY_CONTRACT) || '',
} as const

export const APP_CONFIG = {
  NAME: 'AidLink',
  DESCRIPTION: 'Decentralized Humanitarian Aid Platform',
  VERSION: '1.0.0',
  SUPPORTED_NETWORKS: ['testnet', 'futurenet'],
  DEFAULT_NETWORK: 'testnet',
} as const

export const CATEGORIES = {
  EMERGENCY: 'emergency',
  HEALTHCARE: 'healthcare',
  EDUCATION: 'education',
  FOOD: 'food',
  SHELTER: 'shelter',
  OTHER: 'other',
} as const

export const STATUS_COLORS = {
  active: 'text-green-600 bg-green-50',
  completed: 'text-blue-600 bg-blue-50',
  paused: 'text-yellow-600 bg-yellow-50',
  pending: 'text-gray-600 bg-gray-50',
  suspended: 'text-red-600 bg-red-50',
  verified: 'text-green-600 bg-green-50',
  rejected: 'text-red-600 bg-red-50',
} as const
