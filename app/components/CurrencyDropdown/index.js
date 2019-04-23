/**
*
* CurrencyDropdown
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon } from 'antd';
// import styled from 'styled-components';
const MenuItem = Menu.Item;

function CurrencyDropdown(props) {
  const { exchangeRates, onSelectCurrency, convertTo } = props;

  const convertToSymbol = convertTo.length > 4 ? convertTo.slice(4).toUpperCase() : 'USD';

  const convertMenuOptions = [];
  if (exchangeRates) {
    Object.keys(exchangeRates).forEach((currency) => {
      convertMenuOptions.push(<MenuItem key={currency}>{exchangeRates[currency].name}</MenuItem>);
    });
  }
  const convertToMenu = (
    <Menu onClick={(evt) => onSelectCurrency(evt.key)} >
      {convertMenuOptions}
    </Menu>
  );

  return (
    <Dropdown overlay={convertToMenu}>
      <span style={{ fontWeight: 900, color: '#e8e8e8' }}>
        {convertToSymbol === 'USD' ? 'Convert' : `${convertToSymbol}`}<Icon type="down" />
      </span>
    </Dropdown>
  );
}

CurrencyDropdown.propTypes = {
  convertTo: PropTypes.string,
  exchangeRates: PropTypes.object,
  onSelectCurrency: PropTypes.func,
};

export default CurrencyDropdown;
