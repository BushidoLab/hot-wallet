/**
*
* WelcomeText
*
*/

import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 22px;
  color: rgb(255, 255, 255);
  font-weight: 400;
`;

const H2 = styled.h2`
font-size: 18px;
margin-top:30px;
color: rgb(232, 232, 232);
font-weight: 400;
`;

function WelcomeText() {
  return (
    <div>
      <H1>Welcome to Hot Wallet <br />To begin, create or restore Ethereum wallet<br /></H1>
      <H2>
        Connection to Ethereum network is made via infura / local node. <br />
        Keystore is encrypted using the password. When the wallet is locked, you can only view balances. <br />
        We recommend turning off browser extensions and if you are using chrome, running this website on incognito mode. <br />
        This is to avoid any chance of malicious attacks from third party plugins
      </H2>
    </div>
  );
}

WelcomeText.propTypes = {

};

export default WelcomeText;
