'use client'

import { useState, useEffect } from 'react'
import { useNotificationStore } from '@/store/notification-store'

export interface Transaction {
  id: string
  type: 'donation' | 'distribution' | 'refund'
  to: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  timestamp: Date
}

export function useRealTimeTransactions(initialTransactions: Transaction[]) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const { addNotification } = useNotificationStore()

  useEffect(() => {
    // Simulate real-time updates with polling
    const interval = setInterval(() => {
      // 30% chance of a new transaction every 10 seconds
      if (Math.random() < 0.3) {
        const newTransaction: Transaction = {
          id: Date.now().toString(),
          type: Math.random() > 0.3 ? 'donation' : 'distribution',
          to: Math.random() > 0.5 ? 'Emergency Relief Campaign' : 'Beneficiary #' + Math.floor(Math.random() * 1000),
          amount: Math.floor(Math.random() * 500) + 50,
          status: 'completed',
          timestamp: new Date(),
        }

        setTransactions((prev) => [newTransaction, ...prev].slice(0, 10))

        // Add notification for new transaction
        addNotification({
          type: 'transaction',
          title: `New ${newTransaction.type}`,
          message: `${newTransaction.amount} XLM ${newTransaction.type === 'donation' ? 'received' : 'distributed'} to ${newTransaction.to}`,
        })
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [addNotification])

  return transactions
}
