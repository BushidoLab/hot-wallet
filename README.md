## Ethereum wallet with ERC20 support - A web wallet

### Core components

- [ ] [LightWallet V3](https://github.com/ConsenSys/eth-lightwallet)
- [ ] [Web3.js](https://github.com/ethereum/web3.js/) Ethereum JavaScript API
- [ ] [React-boilerplate](https://github.com/react-boilerplate/react-boilerplate) as a wrapper of React JS, Redux, Saga, Reselect, ImmutableJS and more
- [ ] [Ant Design](https://github.com/ant-design/ant-design) React js components
- [ ] [Webpack 3](https://github.com/webpack/webpack) - A bundler for javascript and friends.

### API Providers

- [ ] [Infura.io](https://infura.io/) as JsonRPC provider
- [ ] [Coinmarketcap](https://coinmarketcap.com/) as exchange rates provider

### Features

- [x] Encryption keys generated from seed and stored in the browser.
- [x] Network selector including local and remote rpc
- [x] Eth balance auto converted to btc/usd/euro.
- [x] Responsive design for mobile support.

#### npm scripts for eth-hot wallet:

`npm run build:dll` to build webpack DLL required for development.

`npm run start` to start development mode. Go to http://localhost:3001 - changes will be reflected in realtime using hot module reloading.

`npm run build` to create bundle for publishing

`npm run generate` to create new components / containers using the generator.

After build, webpack monitor will generate stats about bundle size:
