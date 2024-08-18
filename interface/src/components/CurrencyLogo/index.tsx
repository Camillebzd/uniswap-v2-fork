import { Currency, TEZ, Token } from '@uniswap/sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'

// import EthereumLogo from '../../assets/images/ethereum-logo.png'
import TezLogo from '../../assets/images/tezos-xtz-logo.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'

const tokenURLs: {[key: string]: string} = {
  "0xa7c9092A5D2C3663B7C5F714dbA806d02d62B58a": "https://s3.amazonaws.com/roll-token.tryroll.com/USDC/46907d92-3d53-4302-8342-1b260faf376d", // USDC
  "0xD21B917D2f4a4a8E3D12892160BFFd8f4cd72d4F": "https://s3.amazonaws.com/roll-token.tryroll.com/USDT/2a996945-ceb5-4d18-8455-4af5e4d1d9d5", // USDT
  "0xB1Ea698633d57705e93b0E40c1077d46CD6A51d8": "https://raw.githubusercontent.com/tachyswap/tokenlist/main/token/addresses/0x340Fa96ACF0b8D36828e1D8963CdF3E95c58ed06/logo.png", // WXTZ
}

const getTokenLogoURL = (address: string) =>
  // `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`
  tokenURLs[address]

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === TEZ) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }

      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === TEZ) {
    return <StyledEthereumLogo src={TezLogo} size={size} style={style} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
