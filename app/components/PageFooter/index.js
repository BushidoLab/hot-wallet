/**
*
* PageFooter
*
*/

import React from 'react';
import { github } from 'utils/constants';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import { StickyFooter } from './sticky';


const Footer = StickyFooter.extend`
  textAlign: center;
  background: #1e1e1e;
  color: #5a5a5a;
  padding: 10px;
  font-size: 14px;
`;

function PageFooter() {
  return (
    <Footer>
      <Row>
        <Col sm={12} xs={24}>
          {'Hot Wallet - '}
          Created using: eth-lightwallet, React.js, Ant design by <a href="https://www.bushidolab.com/">Bushido Lab</a>
        </Col>

      </Row>
    </Footer>
  );
}

PageFooter.propTypes = {

};

export default PageFooter;
