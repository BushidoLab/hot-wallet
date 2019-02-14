/**
*
* LoadingIndicator
*
*/

import React from 'react';
import { Spin, Icon } from 'antd';
import styled from 'styled-components';

const Div = styled.div`
position: fixed;
top: 50%;
left: 50%;
/* bring your own prefixes */
transform: translate(-50%, -50%);

`;
const antIcon = <Icon type="loading" style={{ fontSize: 24, position: 'static' }} spin />;

function LoadingIndicator() {
  return (
    <Div>
      <Spin size="large" indicator={antIcon} style={{ color: '#FF007F' }} />
    </Div>
  );
}

LoadingIndicator.propTypes = {

};

export default LoadingIndicator;
