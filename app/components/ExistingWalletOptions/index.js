import React from 'react';
import styled from 'styled-components';
import IconButton from 'components/IconButton';
import LockButton from 'components/LockButton';
import { Popconfirm, Button, Menu } from 'antd';
import PropTypes from 'prop-types';

const PaddedDiv = styled.div`
  padding: 30px 5px 20px 10px;
  min-height: 100px;
`;

const Div = styled.div`
  margin-top: 14px;
`;

function ExistingWalletOptions(props) {
  const { onLockWallet, password, onUnlockWallet, onCloseWallet } = props;
  const lockButtonProps = { onLockWallet, password, onUnlockWallet };

  return (
    <Div>
      <LockButton key="lock_button" {...lockButtonProps} />
      <br />
      <Popconfirm placement="right" title="Wallet will be deleted from memory and LocalStorage" onConfirm={onCloseWallet} okText="Confirm" cancelText="Abort">
        <Button key="close_wallet" type="default" icon="close-square-o" size="large" style={{ width: '200px' }}>
          Close wallet
        </Button>
      </Popconfirm>,
    </Div>
  );
}

ExistingWalletOptions.propTypes = {
  onCloseWallet: PropTypes.func,
  onLockWallet: PropTypes.func,
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onUnlockWallet: PropTypes.func,
};

export default ExistingWalletOptions;
