/**
*
* Logo
*
*/

import React from 'react';
import styled from 'styled-components';
import walletLogo2 from '../../images/token-icons/ethicon-white.png';
// import { website } from 'utils/constants';

const Div = styled.div`
  height: 80px;
  font-size: 18px;
  line-height: 80px;
  margin-left: -50%;
  color: 'white';
`;

const Img = styled.img`
  height: 40px;
  line-height: 80px;
  width: 40px;
  margin-right: 10px;
`;

const Text = styled.text`
  color: white;
`;

function Logo() {
  return (
    <Div>
      <Img alt="logo" src={walletLogo2} style={{ color: 'white' }} />
      {/* <a href={website}> */}
      <Text>
        Hot Wallet
      </Text>
      {/* </a> */}
    </Div>
  );
}

Logo.propTypes = {

};

export default Logo;
