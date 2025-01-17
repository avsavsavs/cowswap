import { TradeType, useTradeTypeInfo } from './useTradeTypeInfo'
import { useMemo } from 'react'
import { TradeRawState } from 'modules/trade/types/TradeRawState'
import { useAdvancedOrdersRawState, useUpdateAdvancedOrdersRawState } from 'modules/advancedOrders'
import { useLimitOrdersRawState, useUpdateLimitOrdersRawState } from 'modules/limitOrders/hooks/useLimitOrdersRawState'
import { useSwapRawState, useUpdateSwapRawState } from 'modules/swap/hooks/useSwapRawState'

export function useTradeState(): { state?: TradeRawState; updateState?: (state: TradeRawState) => void } {
  const tradeTypeInfo = useTradeTypeInfo()

  const limitOrdersState = useLimitOrdersRawState()
  const updateLimitOrdersState = useUpdateLimitOrdersRawState()

  const advancedOrdersState = useAdvancedOrdersRawState()
  const updateAdvancedOrdersState = useUpdateAdvancedOrdersRawState()

  const swapTradeState = useSwapRawState()
  const updateSwapState = useUpdateSwapRawState()

  return useMemo(() => {
    if (!tradeTypeInfo) return {}

    if (tradeTypeInfo.tradeType === TradeType.SWAP) {
      return {
        state: swapTradeState,
        updateState: updateSwapState,
      }
    }

    if (tradeTypeInfo.tradeType === TradeType.ADVANCED_ORDERS) {
      return {
        state: advancedOrdersState,
        updateState: updateAdvancedOrdersState,
      }
    }

    return {
      state: limitOrdersState,
      updateState: updateLimitOrdersState,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(tradeTypeInfo),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(limitOrdersState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(advancedOrdersState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(swapTradeState),
    updateSwapState,
    updateLimitOrdersState,
  ])
}
