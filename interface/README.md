# Uniswap Interface

[![Tests](https://github.com/Uniswap/uniswap-interface/workflows/Tests/badge.svg)](https://github.com/Uniswap/uniswap-interface/actions?query=workflow%3ATests)
[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

An open source interface for Uniswap -- a protocol for decentralized exchange of Ethereum tokens.

- Website: [uniswap.org](https://uniswap.org/)
- Interface: [app.uniswap.org](https://app.uniswap.org)
- Docs: [uniswap.org/docs/](https://uniswap.org/docs/)
- Twitter: [@UniswapProtocol](https://twitter.com/UniswapProtocol)
- Reddit: [/r/Uniswap](https://www.reddit.com/r/Uniswap/)
- Email: [contact@uniswap.org](mailto:contact@uniswap.org)
- Discord: [Uniswap](https://discord.gg/Y7TF6QA)
- Whitepaper: [Link](https://hackmd.io/C-DvwDSfSxuh-Gd4WKE_ig)

## Accessing the Uniswap Interface

To access the Uniswap Interface, use an IPFS gateway link from the
[latest release](https://github.com/Uniswap/uniswap-interface/releases/latest), 
or visit [app.uniswap.org](https://app.uniswap.org).

## Listing a token

Please see the
[@uniswap/default-token-list](https://github.com/uniswap/default-token-list) 
repository.

## Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"`
3. Change `REACT_APP_NETWORK_URL` to e.g. `"https://{YOUR_NETWORK_ID}.infura.io/v3/{YOUR_INFURA_KEY}"` 

Note that the interface only works on testnets where both 
[Uniswap V2](https://uniswap.org/docs/v2/smart-contracts/factory/) and 
[multicall](https://github.com/makerdao/multicall) are deployed.
The interface will not work on other networks.

## Fork info:
- factory: 0x537333a5767587df88d7e1c0650986f7b8cc587b
- code hash: 0x9caff2cce4e27dd473f096c99efe0853916cb5f46d88b841b09a2d150fa7a518
- routerv2: 0xfdbc9B276b49355246029Dc7C27772BFf605ffac
- weth: 0xF6a785b301CE4F1610CE30E435AA41Ed08d77220
- multicall: 0x2Fafad9c3100BBEd839ACb9534CA7955DB112C93
- token list: https://salmon-fancy-leopard-207.mypinata.cloud/ipfs/QmVJjtkm72yTsMuk4bdUKgAJ6pNGYHYFydV6Kka7VVVTft

1. You should go in the `forks/` folder that contains the Uniswap sdk part and add these values so the sdk use your contracts.
2. If you want to add a chain, you will have to modify and re deploy a lot of stuff (see the list just above):
    - Search for `128123` and `Etherlink` and you will see most of the locations where you need to change/add/redeploy something.
    - You will have to do your own `tokens_list.json` as explained above. You can then deploy it (on IPFS, HTTPS, etc) and add the link in the constants of the project in `src/constants/lists.ts` under the variable `DEFAULT_TOKEN_LIST_URL`. You could also directly test it when the app is running, you have to select a token, click on the bottom right of the modale on the button `Change` to see the List manager and add your new list.
    - In `getTokenLogoURL()` in `src/components/CurrencyLogo/index.tsx`, you should either add a link that resolve properly to all currencies or add an array with key as address of the token and value the url for it image/logo.