import { serializeToken } from 'legacy/state/user/hooks'
import { addPendingOrder, AddPendingOrderParams, SerializedOrder } from 'legacy/state/orders/actions'
import { AddUnserialisedPendingOrderParams } from 'legacy/state/orders/hooks'
import { AppDispatch } from 'legacy/state'

export function addPendingOrderStep(addOrderParams: AddUnserialisedPendingOrderParams, dispatch: AppDispatch) {
  const serialisedSellToken = serializeToken(addOrderParams.order.inputToken)
  const serialisedBuyToken = serializeToken(addOrderParams.order.outputToken)
  const order: SerializedOrder = {
    ...addOrderParams.order,
    inputToken: serialisedSellToken,
    outputToken: serialisedBuyToken,
  }
  const params: AddPendingOrderParams = {
    ...addOrderParams,
    order,
  }
  dispatch(addPendingOrder(params))
}
