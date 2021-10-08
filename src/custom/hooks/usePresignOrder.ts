import { useCallback } from 'react'
// import { useTransactionAdder } from 'state/enhancedTransactions/hooks'

import { useGP2SettlementContract } from 'hooks/useContract'
import { ContractTransaction } from 'ethers'
// import { HashType } from 'state/enhancedTransactions/reducer'

export type PresignOrderFn = (orderId: string) => Promise<ContractTransaction>

export function usePresignOrder(): ((orderId: string) => Promise<ContractTransaction>) | null {
  // const addTransaction = useTransactionAdder()
  const settlementContract = useGP2SettlementContract()

  const presignOrder = useCallback<PresignOrderFn>(
    async (orderId) => {
      console.log('Presigning order', orderId)

      if (!settlementContract) {
        throw Error('SettlementContract is not ready')
      }

      // TODO: This message is just temporary. We probably do some better merging of the two transactions
      const txReceipt = await settlementContract.setPreSignature(orderId, true)

      // const trimmedOrderId = `${orderId.substring(0, 12)}...${orderId.substring(orderId.length - 12, orderId.length)}`
      // addTransaction({
      //   hash: txReceipt.hash,
      //   summary: `Pre-sign order ${trimmedOrderId}`,
      // })

      console.log('Sent transaction for presigning', orderId, txReceipt)

      return txReceipt
    },
    [settlementContract]
  )

  return settlementContract && presignOrder
}