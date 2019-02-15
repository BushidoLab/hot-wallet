/**
*
* SubHeader
*
*/

import React from 'react';
import { Button, Popconfirm, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LockButton from 'components/LockButton';
import AddressTableFooter from 'components/AddressTableFooter';

const SubMenu = Menu.SubMenu;
const Div = styled.div`
  .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
  }
  .anticon-lock {
    color: red;
  }
  .anticon-unlock {
    color: green;
  }
`;

const splitAddrToRows = (tokenDecimalsMap, tokenMapIN, address, startKey) => {
  let key = startKey;
  const tokenMap = tokenMapIN;
  const index = tokenMap.index;
  delete tokenMap.index;

  return Object.keys(tokenMap).map((token) => {
    const sameAddressRow = {};
    sameAddressRow.index = index;
    sameAddressRow.key = key;
    key += 1;
    sameAddressRow.token = token;
    sameAddressRow.address = address;
    const balance = tokenMap[token].balance;
    const decimals = tokenDecimalsMap[token];
    sameAddressRow.balance = balance ? balance.div((10 ** decimals).toString()).toString(10) : 'n/a';
    // sameAddressRow.convert = '';
    return sameAddressRow;
  });
};

const transformList = (addressMap, tokenDecimalsMap, showTokens) => { //eslint-disable-line
  // const showTokens = true;
  let iKey = 1;
  const list = Object.keys(addressMap).map((address) => {
    const tokenMap = addressMap[address];
    const sameAddressList = splitAddrToRows(tokenDecimalsMap, tokenMap, address, iKey);

    iKey += sameAddressList.length;
    return sameAddressList;
  });
  return [].concat(...list); // flaten array
};

function SubHeader(props) {
  const {
    onGenerateWallet, onShowRestoreWallet, isComfirmed, onCloseWallet,
    onLockWallet, password, onUnlockWallet,
    onGenerateAddress, addressListLoading, addressListError, // Add address
    networkReady, checkingBalances, checkingBalancesError, onCheckBalances,
    onGetExchangeRates, onShowTokenChooser,
    getExchangeRatesLoading, getExchangeRatesError, checkingBalanceDoneTime,
    addressListMsg, getExchangeRatesDoneTime, onShowSendToken,
    addressMap, tokenDecimalsMap,
  } = props;

  const addressTableFooterProps = {
    checkingBalanceDoneTime,
    checkingBalances,
    checkingBalancesError,
    onCheckBalances,
    networkReady,

    isComfirmed,
    onGenerateAddress,
    addressListLoading,
    addressListError,
    addressListMsg,

    onGetExchangeRates,
    getExchangeRatesDoneTime,
    getExchangeRatesLoading,
    getExchangeRatesError,

    onShowTokenChooser,
    onShowSendToken,

    addressMap,
    tokenDecimalsMap,
  };

  const lockButtonProps = { onLockWallet, password, onUnlockWallet };
  const noWalletSubHeader = [
    <Button key="new_wallet" type="primary" size="large" onClick={onGenerateWallet} style={{ color: 'white', backgroundColor: '#FF007F', border: '0.5px solid black' }}>
      New wallet
    </Button>,
    <Button key="restore_wallet" type="default" size="large" onClick={onShowRestoreWallet} style={{ color: 'white', backgroundColor: 'black', border: '0.5px solid black' }}>
      Restore wallet
    </Button>,
  ];

  const subHeaderStyles = {
    display: 'block',
    marginTop: '-30px',
    backgroundImage: 'linear-gradient(#4b4b4b, black)',
    border: '1px solid black',
  };
  const menuStyles = { height: '50px', marginTop: '20px', padding: '0px' };
  const borderStyles = { borderRight: '0.25px solid black', borderLeft: '0.25px solid black', color: 'white' };
  const caretStyles = { marginLeft: '10px', marginRight: '0px' };

  let rowList;
  if (addressMap !== null) {
    rowList = transformList(addressMap, tokenDecimalsMap, true);
  }


  const existingWalletSubHeader = [
    <Menu
      mode="horizontal"
      style={subHeaderStyles}
    >
      <SubMenu title={<span>Wallet Options <Icon type="caret-down" style={caretStyles} /></span>} style={borderStyles}>
        <Menu.Item style={menuStyles} disabled key="1">
          <LockButton key="lock_button" {...lockButtonProps} />
        </Menu.Item>
        <Menu.Item style={menuStyles} disabled key="2">
          <Popconfirm placement="right" title="Wallet will be deleted from memory and LocalStorage" onConfirm={onCloseWallet} okText="Confirm" cancelText="Abort">
            <Button key="close_wallet" type="default" icon="close" size="large" style={{ width: '200px' }}>
              Close wallet
            </Button>
          </Popconfirm>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={<span>Addresses<Icon type="caret-down" style={caretStyles} /></span>} style={{ borderRight: '0.25px solid black', color: 'white' }}>
        <AddressTableFooter {...addressTableFooterProps} />
      </SubMenu>
      <SubMenu title={<span>Transfer <Icon type="caret-down" style={caretStyles} /></span>} style={borderStyles}>
        <Menu.Item title="Send" style={menuStyles} disabled>
            <Button 
              type="default" 
              icon="double-right" 
              size="large" 
              onClick={() => onShowSendToken(rowList[0].address, rowList[0].token)} 
              style={{ width: '200px', marginLeft: '10px', marginRight: '10px' }}
            >
              Send
            </Button>
        </Menu.Item>
      </SubMenu>
    </Menu>,
  ];

  const subHeader = isComfirmed ? existingWalletSubHeader : noWalletSubHeader;

  return (
    <Div>
      {subHeader}
    </Div>
  );
}

SubHeader.propTypes = {
  onGenerateWallet: PropTypes.func,
  onShowRestoreWallet: PropTypes.func,
  onCloseWallet: PropTypes.func,
  onLockWallet: PropTypes.func,
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onUnlockWallet: PropTypes.func,

  generateKeystoreLoading: PropTypes.bool,
  generateKeystoreError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  isComfirmed: PropTypes.bool,
  addressMap: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array,
  ]),
  tokenDecimalsMap: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onShowSendToken: PropTypes.func,
  onShowTokenChooser: PropTypes.func,

  onGenerateAddress: PropTypes.func,
  addressListLoading: PropTypes.bool,
  addressListError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  addressListMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  onCheckBalances: PropTypes.func,
  networkReady: PropTypes.bool,
  checkingBalanceDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),

  exchangeRates: PropTypes.object,
  onSelectCurrency: PropTypes.func,
  convertTo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  onGetExchangeRates: PropTypes.func,
  getExchangeRatesDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  getExchangeRatesLoading: PropTypes.bool,
  getExchangeRatesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),

  onShowSendToken: PropTypes.func,
};

export default SubHeader;
