import React, { Component } from 'react';
import { Card } from 'unify-react-mobile';
import * as _ from 'lodash';
import axios from 'axios';
import 'unify-react-mobile/build/styles.css';

import TextField from '../../components/TextField';

import searchIcon from './assets/ic_search_black_24px.svg';
import './styles.css';

import mockProducts from './__mocks__/products';

const HOSTNAME = `http://${window.location.host}` || 'http://lite.devel-go.tkpd:9001';

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleSearchSubmit = _.debounce(this.handleSearchSubmit, 1000);
  }

  state = {
    keyword: '',
    loading: false,
    submittedKeyword: '',
    result: [],
  }

  handleSearchChange = e => {
    this.setState({
      keyword: e.value
    });
    // this.handleSearchSubmit(e.value);
  }

  handleSearchKeyDown = e => {
    if (e.key === 'Enter') {
      this.handleSearchSubmit();
    }
  }

  handleSearchSubmit = keyword => {
    if (!keyword) return false;

    this.setState({ loading: true, submittedKeyword: keyword, result: [] });
    
    axios.get(`${HOSTNAME}/tkpd-ace?keyword=${this.state.keyword}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => this.setState(prevState => { 
      const data = res.data;
      return { result: [ ...prevState.result, ...data ] }
    }))

    axios.get(`${HOSTNAME}/bl?keyword=${this.state.keyword}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => this.setState(prevState => { 
      const data = res.data;
      return { result: [ ...prevState.result, ...data ] }
    }))

    axios.get(`${HOSTNAME}/blibli?keyword=${this.state.keyword}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => this.setState(prevState => { 
      const data = res.data;
      return { result: [ ...prevState.result, ...data ] }
    }))

    axios.get(`${HOSTNAME}/lazada?keyword=${this.state.keyword}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => this.setState(prevState => { 
      const data = res.data;
      return { result: [ ...prevState.result, ...data ] }
    }))
  }

  renderResult() {
    let { submittedKeyword, result } = this.state;
    result = mockProducts;
    let products;
    
    if (result && result.length > 0) {
      products = result.map((product, i) => {
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
      <Card container className='search-result-container'>
        <div className='search-result-container--title'>Showing {products.length} result for <b>'{submittedKeyword}'</b></div>
        <div className='search-result-container--products'>{products}</div>
      </Card>
    )
  }

  render() {
    return (
      <div>
        <Card container>
          <TextField
            ref={this.setSearchInputRef}
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
