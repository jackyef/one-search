import React, { Component } from 'react';
import { Card, TextField } from 'unify-react-mobile';
import * as _ from 'lodash';
import axios from 'axios';
import 'unify-react-mobile/build/styles.css';

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

  handleSearchChange = (e) => {
    this.setState({
      keyword: e.value
    });
    // this.handleSearchSubmit(e.value);
  }

  handleSearchSubmit = keyword => {
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
            <div>Sumber: {product.source}</div>
          </Card>
        )
      })
    } else {
      return;
    }
    
    return (
      <Card container>
        Showing {products.length} result for <b>'{submittedKeyword}'</b>
        {products}
      </Card>
    )
  }

  render() {
    console.log("state", this.state);
    return (
      <div>
        <TextField 
          className='u-px4 u-py2'
          placeholder="Enter keyword here..." 
          onChange={this.handleSearchChange}
          onKeyDown={this.handleSearchKeyDown} />
        {this.renderResult()}
      </div>
    );
  }
}

export default Search;
