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

const PaddedDiv = styled.div`
  padding: 30px 5px 20px 10px;
  min-height: 100px;
`;

function SubHeader(props) {
  const {
    onGenerateWallet, onShowRestoreWallet, isComfirmed, onCloseWallet,
    onLockWallet, password, onUnlockWallet,
    onGenerateAddress, addressListLoading, addressListError, // Add address
    networkReady, checkingBalanceDoneTime, checkingBalances, checkingBalancesError, onCheckBalances,
    onGetExchangeRates, addressListMsg, onShowTokenChooser,
    getExchangeRatesDoneTime, getExchangeRatesLoading, getExchangeRatesError,
  } = props;

  const lockButtonProps = { onLockWallet, password, onUnlockWallet };

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
      style={{ marginTop: '-40px', 'background-color': '#afafaf' }}
    >
      <SubMenu title={<span className="submenu-title-wrapper" ><Icon type="setting" />Wallet Options</span>}>
        <Menu.Item>
          <LockButton key="lock_button" {...lockButtonProps} />
        </Menu.Item>
        <Menu.Item key="Close">
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
  isComfirmed: PropTypes.bool,
  onCloseWallet: PropTypes.func,
  onLockWallet: PropTypes.func,
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onUnlockWallet: PropTypes.func,
  onCheckBalances: PropTypes.func,

  networkReady: PropTypes.bool,
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),

  onGenerateAddress: PropTypes.func,
  addressListLoading: PropTypes.bool,
  addressListError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),

  onGetExchangeRates: PropTypes.func,
  getExchangeRatesLoading: PropTypes.bool,
  getExchangeRatesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  onShowTokenChooser: PropTypes.func,
};

export default SubHeader;
