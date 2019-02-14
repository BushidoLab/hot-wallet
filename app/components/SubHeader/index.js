/**
*
* SubHeader
*
*/

import React from 'react';
import { Button, Popconfirm, Menu, Icon, Alert } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LockButton from 'components/LockButton';
import WelcomeText from 'components/WelcomeText';
import IconButton from 'components/IconButton';

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

const paddedDiv = styled.div`
  margin-top: 14px;
  margin-left: 10px;
  min-width: '250px';
`;

function SubHeader(props) {
  const {
    onGenerateWallet, onShowRestoreWallet, isComfirmed, onCloseWallet,
    onLockWallet, password, onUnlockWallet,
    onGenerateAddress, addressListLoading, addressListError, // Add address
    networkReady, checkingBalances, checkingBalancesError, onCheckBalances,
    onGetExchangeRates, onShowTokenChooser,
    getExchangeRatesLoading, getExchangeRatesError, checkingBalanceDoneTime,
    addressListMsg, getExchangeRatesDoneTime, generateKeystoreError,
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
  };

  const lockButtonProps = { onLockWallet, password, onUnlockWallet };
  const noWalletSubHeader = [
    <Button key="new_wallet" type="primary" size="large" onClick={onGenerateWallet}>
      New wallet
    </Button>,
    <Button key="restore_wallet" type="default" size="large" onClick={onShowRestoreWallet}>
      Restore wallet
    </Button>,
  ];
  const existingWalletSubHeader = [
    <Menu
      mode="horizontal"
      style={{ marginTop: '-30px', 'background-color': '#c1bfbf' }}
    >
      <SubMenu title={<span><Icon type="setting" />Wallet Options</span>}>
        <Menu.Item style={{ height: '50px', marginTop: '20px' }} disabled>
          <LockButton key="lock_button" {...lockButtonProps} />
        </Menu.Item>
        <Menu.Item style={{ height: '50px', marginTop: '20px' }} disabled>
          <Popconfirm placement="right" title="Wallet will be deleted from memory and LocalStorage" onConfirm={onCloseWallet} okText="Confirm" cancelText="Abort">
            <Button key="close_wallet" type="default" icon="close-square-o" size="large" style={{ width: '200px' }}>
              Close wallet
            </Button>
          </Popconfirm>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={<span className="submenu-title-wrapper"><Icon type="plus" />Addresses</span>}>
        <AddressTableFooter {...addressTableFooterProps} />
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
};

export default SubHeader;
