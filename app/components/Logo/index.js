/**
*
* Logo
*
*/

import React from 'react';
import styled from 'styled-components';
import { website } from 'utils/constants';
import walletLogo from './hot-wallet.svg';
import walletLogo2 from '../../images/token-icons/ethicon.png';

const Div = styled.div`
  height: 80px;
  font-size: 18px;
  line-height: 80px; 
`;

const Img = styled.img`
  height: 40px;
  line-height: 80px;
  width: 40px;
  margin-right: 10px;
`;

function Logo() {
  return (
    <Div>
      <Img alt="logo" src={walletLogo2} />
      <a href={website}>
        Hot Wallet
      </a>
    </Div>
  );
}

Logo.propTypes = {

};

export default Logo;
