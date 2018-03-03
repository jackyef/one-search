import React, { Component } from 'react';
import { Card, Tab } from 'unify-react-mobile';
import * as _ from 'lodash';
import axios from 'axios';
import 'unify-react-mobile/build/styles.css';

import TextField from '../../components/TextField';

import searchIcon from './assets/ic_search_black_24px.svg';
import './styles.css';

import mockProducts from './__mocks__/productsB';

const HOSTNAME = `http://${window.location.host}` || 'http://lite.devel-go.tkpd:9001';

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleSearchSubmit = _.debounce(this.handleSearchSubmit, 1000);
  }

  state = {
    activeTabIndex: 0,
    keyword: '',
    loading: false,
    submittedKeyword: '',
    result: {},
  }

  handleSearchChange = e => {
    this.setState({
      keyword: e.target.value
    });
  }

  handleSearchKeyDown = e => {
    if (e.key === 'Enter') {
      this.handleSearchSubmit();
    }
  }

  handleSearchSubmit = () => {
    const { keyword } = this.state;

    if (!keyword) return false;

    this.setState({ loading: true, submittedKeyword: keyword, result: {} });
    
    axios.get(`${HOSTNAME}/tkpd-ace?keyword=${this.state.keyword}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => this.setState(prevState => { 
      const data = res.data;
      return { result: { ...prevState.result, Tokopedia: data } };
    }))

    axios.get(`${HOSTNAME}/bl?keyword=${this.state.keyword}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => this.setState(prevState => { 
      const data = res.data;
      return { result: { ...prevState.result, Bukalapak: data } };
    }))

    axios.get(`${HOSTNAME}/blibli?keyword=${this.state.keyword}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => this.setState(prevState => { 
      const data = res.data;
      return { result: { ...prevState.result, Blibli: data } };
    }))

    axios.get(`${HOSTNAME}/lazada?keyword=${this.state.keyword}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => this.setState(prevState => { 
      const data = res.data;
      return { result: { ...prevState.result, Lazada: data } };
    }))
  }

  handleChangeResultTab = (element, item) => {
    this.setState({ activeTabIndex: item.index || 0 });
  }

  renderResult() {
    let { result, activeTabIndex } = this.state;
    // result = mockProducts;

    let tabItems = [];
    let allProductData = [];

    for (let key in result) {
      tabItems.push({
        key: `search-tab-${key}`,
        text: key,
        count: result[key].length,
      });
      allProductData = [...allProductData, ...result[key]];
    }

    tabItems = [
      {
        key: 'search-tab-All',
        text: 'All',
        count: allProductData.length,
      }, 
      ...tabItems,
    ];

    let productData = !activeTabIndex ? allProductData : result[tabItems[activeTabIndex].text];
    let products;

    if (productData && productData.length > 0) {
      products = productData.map((product, i) => {
        return (
          <Card
            key={`product-result-${i}`}
            subheader={product.name}
          >
            <div>Harga: {product.price}</div>
            <div>Lihat di {product.source}</div>
          </Card>
        )
      })
    } else {
      return;
    }

    return (
      <div>
        <Tab secondary
          items={tabItems}
          indexActive={this.state.activeTabIndex}
          onItemClick={this.handleChangeResultTab}
        />
        <div className='search-result-container--products--b'>{products}</div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Card container>
          <TextField
            type="text" 
            className='search-input'
            placeholder="Enter keyword here..." 
            onChange={this.handleSearchChange}
            onKeyDown={this.handleSearchKeyDown} 
            hasButton
            buttonIcon={searchIcon}
            buttonAction={this.handleSearchSubmit}
          />
        </Card>
        {this.renderResult()}
      </div>
    );
  }
}

export default Search;
