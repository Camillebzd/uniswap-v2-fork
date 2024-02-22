import { Currency, TEZ, Token } from '@uniswap/sdk'

export function currencyId(currency: Currency): string {
  if (currency === TEZ) return 'XTZ'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
