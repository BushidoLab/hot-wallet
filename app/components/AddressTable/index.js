/**
*
* AddressTable
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';

import CurrencyDropdown from 'components/CurrencyDropdown';
import TokenIcon from 'components/TokenIcon';

// const { Column } = Table;
// import { LocaleProvider } from 'antd';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

// const AddrTable = styled(Table)`
//   max-width: 860px;
//   margin-left: auto;
//   margin-right: auto;
//   tbody{
//     background: white;
//   }
//   .ant-table{
//     font-size: 13px !important;
//   }
//   th.columnCenter,
//   td.columnCenter{
//     text-align: center;
//   }
// `;

/**
 * Create list of rows, one row per token for given address
 * @param  {object} tokenDecimalsMap
 * @param  {object} tokenMapIN
 * @param  {string} address current address
 * @param  {number} startKey the first key of the given address
 *
 * @return {object[]} array as rows, one row per token/address
 * row:
{
  key: '1',
  index: '1',
  token: 'eth',
  address: '13c...9d06',
  balance: '3',
  convert: '',
} */
const splitAddrToRows = (tokenDecimalsMap, tokenMapIN, address, startKey) => {
  let key = startKey;
  const tokenMap = tokenMapIN;
  const index = tokenMap.index;
  delete tokenMap.index;

  return Object.keys(tokenMap).map((token) => {
    const sameAddressRow = {};
    sameAddressRow.index = index;
    sameAddressRow.key = key;
    key += 1;
    sameAddressRow.token = token;
    sameAddressRow.address = address;
    const balance = tokenMap[token].balance;
    const decimals = tokenDecimalsMap[token];
    sameAddressRow.balance = balance ? balance.div((10 ** decimals).toString()).toString(10) : 'n/a';
    // sameAddressRow.convert = '';
    return sameAddressRow;
  });
};

/**
 * Transforms addressMap into Array of rows
 * @param  {object} addressMap
 * @param  {object} tokenDecimalsMap number of decimal for each currency
 * @param  {boolean} showTokens should show token in the table
 * return example: addressArray =
  [{{
    key: '1',
    index: '1',
    token: 'eth',
    address: '13c...9d06',
    balance: '3',
    convert: '200 USD',
  },
    key: '2',
    index: '1',
    token: 'eos',
    address: '13c...9d06',
    balance: '3',
    convert: '15 USD',
  }, {
    key: '3',
    index: '1',
    token: 'ppt',
    address: '13c...9d06',
    balance: '3',
    convert: '13 USD',
  },
] */
const transformList = (addressMap, tokenDecimalsMap, showTokens) => { //eslint-disable-line
  // const showTokens = true;
  let iKey = 1;
  const list = Object.keys(addressMap).map((address) => {
    const tokenMap = addressMap[address];
    const sameAddressList = splitAddrToRows(tokenDecimalsMap, tokenMap, address, iKey);

    iKey += sameAddressList.length;
    return sameAddressList;
  });
  return [].concat(...list); // flaten array
};

/**
 * return conversion rate from given token
 * @param  {object} exchangeRates available exchange rates
 * @param  {string} from symbol to convert from: 'eth' / 'usd' / ..
 * @param  {string} to the convertion pair to use: ie "eth_usd"
 *
 * @return {Array} array as data for table, see example above
 */
const getConvertRate = (exchangeRates, from, to) => {
  const fromKey = `eth_${from}`;
  // convert token to eth by invert(eth_token)
  const toEthRate = exchangeRates[fromKey].rate.toPower(-1);
  const toTokenRate = exchangeRates[to].rate;
  return toEthRate && toTokenRate && toEthRate.times(toTokenRate);
};

/**
 * Add converted rates to all rows
 * adds nothing if exchange rate not found
 * @param  {object[]} rowList table rows contains balance
 * @param  {object} exchangeRates all available exchange rates
 * @param  {string} convertTo the convertion pair to use: ie "eth_usd"
 *
 * @return {Array} array as data for table, see example above
 */
const addConvertRates = (rowList, exchangeRates, convertTo) =>
  rowList.map((row) => {
    try {
      // const convertToSymbol = convertTo.slice(4).toUpperCase();
      if (`eth_${row.token}` === convertTo) {
        row.convert = row.balance; // eslint-disable-line
      } else {
        const convertRate = getConvertRate(exchangeRates, row.token, convertTo);
        row.convert = convertRate.times(row.balance).round(5).toString(10); // eslint-disable-line
      }
      return row;
    } catch (err) {
      // no rates found
      return row;
    }
  });

function createTable(data, props) {
  const table = [];
  const currencyDropdownProps = props;

  // Style objects
  const cardGridStyle = { width: '40%', padding: '0px', marginLeft: '7%' };
  const cardGridStyleSm = { width: '15%', padding: '0px' };
  const headerStyles = { fontSize: '14px', paddingTop: 0, margin: 0, fontWeight: 900 };
  const tableHeader = { backgroundColor: '#e8e8e8', border: '1px solid gray' };

  for (let i = 0; i < data.length; i += 1) {
    const address = data[i].address;
    const icon = data[i].token;
    const balance = data[i].balance;
    const key = data[i].key;

    let convert;
    if (data[i].convert) {
      convert = data[i].convert;
    } else {
      convert = 'N/A';
    }

    if (table.length === 0) {
      table.push(
        <div>
          <Card.Grid type="inner" style={cardGridStyle} key={key}>
            <Card style={tableHeader}>
              <h1 style={headerStyles}>Address</h1>
            </Card>
          </Card.Grid>
          <Card.Grid type="inner" style={cardGridStyleSm}>
            <Card style={tableHeader}>
              <h1 style={headerStyles}>Icon</h1>
            </Card>
          </Card.Grid>
          <Card.Grid type="inner" style={cardGridStyleSm}>
            <Card style={tableHeader}>
              <h1 style={headerStyles}>Balance</h1>
            </Card>
          </Card.Grid>
          <Card.Grid type="inner" style={cardGridStyleSm}>
            <Card style={tableHeader}>
              <CurrencyDropdown {...currencyDropdownProps} />
            </Card>
          </Card.Grid>
          <hr />
        </div>
      );
      table.push(
        <span>
          <Card.Grid type="inner" style={cardGridStyle} key={key}>
            <Card>
              {address}
            </Card>
          </Card.Grid>
          <Card.Grid type="inner" style={cardGridStyleSm}>
            <Card>
              {icon.toUpperCase()} <TokenIcon tokenSymbol={icon} />
            </Card>
          </Card.Grid>
          <Card.Grid type="inner" style={cardGridStyleSm}>
            <Card>
              {balance}
            </Card>
          </Card.Grid>
          <Card.Grid type="inner" style={cardGridStyleSm}>
            <Card>
              {convert}
            </Card>
          </Card.Grid>
        </span>
      );
    } else {
      table.push(
        <span>
          <Card.Grid type="inner" style={cardGridStyle} key={key}>
            <Card>
              {address}
            </Card>
          </Card.Grid>
          <Card.Grid type="inner" style={cardGridStyleSm}>
            <Card>
              {icon.toUpperCase()} <TokenIcon tokenSymbol={icon} />
            </Card>
          </Card.Grid>
          <Card.Grid type="inner" style={cardGridStyleSm}>
            <Card>
              {balance}
            </Card>
          </Card.Grid>
          <Card.Grid type="inner" style={cardGridStyleSm}>
            <Card>
              {convert}
            </Card>
          </Card.Grid>
        </span>
      );
    }
  }
  return table;
}

function AddressTable(props) {
  const {
    addressMap,
    tokenDecimalsMap,
    onShowSendToken,
    exchangeRates,
    onSelectCurrency,
    convertTo,
  } = props;

  const currencyDropdownProps = { exchangeRates, onSelectCurrency, convertTo };

  const rowList = transformList(addressMap, tokenDecimalsMap, true);
  const completeRowList = addConvertRates(rowList, exchangeRates, convertTo);
  const info = completeRowList;

  const address = info[0].address;
  const icon = info[0].token;

  return (
    <div>
      <Card title="Wallet information" style={{ minWidth: '800px' }} bodyStyle={{ backgroundColor: '#f4f4f4' }} >
        {createTable(completeRowList, currencyDropdownProps)}
      </Card>
      <Button style={{ position: 'relative', bottom: '10px', marginTop: '30px' }}>
        <div role="presentation" onClick={() => onShowSendToken(address, icon)}>Send</div>
      </Button>
    </div>
  );
}

AddressTable.propTypes = {
  addressMap: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  tokenDecimalsMap: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onShowSendToken: PropTypes.func,
  exchangeRates: PropTypes.object,
  onSelectCurrency: PropTypes.func,
  convertTo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default AddressTable;
