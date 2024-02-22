import { CurrencyAmount, TEZ, JSBI } from '@uniswap/sdk'
import { MIN_XTZ } from '../constants'

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend(currencyAmount?: CurrencyAmount): CurrencyAmount | undefined {
  if (!currencyAmount) return undefined
  if (currencyAmount.currency === TEZ) {
    if (JSBI.greaterThan(currencyAmount.raw, MIN_XTZ)) {
      return CurrencyAmount.ether(JSBI.subtract(currencyAmount.raw, MIN_XTZ))
    } else {
      return CurrencyAmount.ether(JSBI.BigInt(0))
    }
  }
  return currencyAmount
}
