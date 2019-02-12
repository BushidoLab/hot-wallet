/**
*
* LockButton
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function LockButton(props) {
  const { onLockWallet, password, onUnlockWallet } = props;

  if (password) {
    return (
      <Popconfirm key="close_wallet" placement="right" title="Comfirm locking wallet" onConfirm={onLockWallet} okText="Confirm" cancelText="Cancel">
        <Button icon="lock" type="default" size="large" style={{ width: '200px' }} >
          Lock Wallet
        </Button>
      </Popconfirm>
    );
  }

  return (
    <Button icon="unlock" type="default" size="large" onClick={onUnlockWallet} style={{ width: '200px' }}>
      Unlock Wallet
    </Button>
  );
}

LockButton.propTypes = {
  onLockWallet: PropTypes.func,
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onUnlockWallet: PropTypes.func,
};

export default LockButton;
