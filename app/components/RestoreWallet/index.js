/**
*
* RestoreWallet
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function RestoreWallet({ isShowRestoreWallet, userSeed, onChangeUserSeed, onRestoreWalletFromSeed }) {
  if (isShowRestoreWallet) {
    return (
      <div>
        <br />
        <form >
          <label htmlFor="restoreWalletBox">
            <input
              id="restoreWalletBox"
              type="text"
              placeholder="Enter seed"
              value={userSeed}
              onInput={onChangeUserSeed}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </label>
          <br />
          <button onClick={onRestoreWalletFromSeed}>
            Restore from seed
          </button>
        </form>
      </div>
    );
  }
  return null;
}

RestoreWallet.propTypes = {
  isShowRestoreWallet: PropTypes.bool,
  userSeed: PropTypes.string,
  onChangeUserSeed: PropTypes.func,
  onRestoreWalletFromSeed: PropTypes.func,
};

export default RestoreWallet;
