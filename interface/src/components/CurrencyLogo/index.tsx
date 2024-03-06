import { Currency, TEZ, Token } from '@uniswap/sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'

// import EthereumLogo from '../../assets/images/ethereum-logo.png'
import TezLogo from '../../assets/images/tezos-xtz-logo.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'

const tokenURLs: {[key: string]: string} = {
  "0x07648428EF73dde0ba38D3775C6aaDc48fD20d9D": "https://s3.amazonaws.com/roll-token.tryroll.com/USDC/46907d92-3d53-4302-8342-1b260faf376d", // USDC
  "0x42b2ae83596fA9f4D8D9958f571a10934ED5B2cc": "https://s3.amazonaws.com/roll-token.tryroll.com/USDT/2a996945-ceb5-4d18-8455-4af5e4d1d9d5", // USDT
  "0xb8f26e0c5cc99Cdd8A42Ae8A8BaEbB20ecBD1C99": "https://s3.amazonaws.com/roll-token.tryroll.com/DAI/8405fc15-2269-4228-b69e-79a6717eb15b", // DAI
  "0xF6a785b301CE4F1610CE30E435AA41Ed08d77220": "https://s3.amazonaws.com/roll-token.tryroll.com/WETH/8b5214dc-7b7e-4e04-89de-f0f4ae05a3b6" // WETH
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
