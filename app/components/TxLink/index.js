/**
*
* TxLink
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Span = styled.span`
  overflow-wrap: break-word;
`;

function TxLink(props) {
  const { tx, explorer } = props;
  console.log('href: ', explorer, tx);
  if (explorer) {
    return (
      <a href={`https://etherscan.io/tx/${tx}`} target="_blank" rel="noopener">
        <Span>{tx}</Span>
      </a>
    );
  }
  return (<Span>{tx}</Span>);
}

TxLink.propTypes = {
  tx: PropTypes.string,
  explorer: PropTypes.string,
};

export default TxLink;
