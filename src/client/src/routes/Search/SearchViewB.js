import React, { Component } from 'react';
import ReactTouchEvents from 'react-touch-events';
import cx from 'classnames';
import { Card, Chip, Tab } from 'unify-react-mobile';
import * as _ from 'lodash';
import axios from 'axios';
import 'unify-react-mobile/build/styles.css';

import TextField from '../../components/TextField';
import ImageElement from '../../components/ImageElement';

import searchIcon from './assets/ic_search_black_24px.svg';
import './styles.css';

import mockProducts from './__mocks__/productsB';

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleSearchSubmit = _.debounce(this.handleSearchSubmit, 500, { leading: true });
  }

  state = {
    activeTabIndex: 0,
    keyword: '',
    loading: false,
    error: false,
    submittedKeyword: '',
    result: {},
    scrollingDown: false,
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
    const { keyword, loading } = this.state;

    if (!keyword || loading) return false;

    this.setState({ loading: true, submittedKeyword: keyword, result: {}, activeTabIndex: 0 });
    
    Promise.all([
      axios.get(`/tkpd-ace?keyword=${this.state.keyword}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }).then(res => this.setState(prevState => { 
        const data = res.data;
        return { result: { ...prevState.result, Tokopedia: data } };
      })),
      axios.get(`/bl?keyword=${this.state.keyword}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }).then(res => this.setState(prevState => { 
        const data = res.data;
        return { result: { ...prevState.result, Bukalapak: data } };
      })),
      axios.get(`/blibli?keyword=${this.state.keyword}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }).then(res => this.setState(prevState => { 
        const data = res.data;
        return { result: { ...prevState.result, Blibli: data } };
      })),
      axios.get(`/lazada?keyword=${this.state.keyword}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }).then(res => this.setState(prevState => { 
        const data = res.data;
        return { result: { ...prevState.result, Lazada: data } };
      })),
    ]).then(() => {
      this.setState({ loading: false, error: false });
    }).catch(() => {
      this.setState({ loading: false, error: true });
    })
  }

  handleChangeResultTab = (element, item) => {
    this.setState({ activeTabIndex: item.index || 0 });
  }

  handleProductWheel = e => {
    if (e.deltaY > 0) {
      if (!this.state.scrollingDown) this.setState({ scrollingDown: true });
    } else {
      if (this.state.scrollingDown) this.setState({ scrollingDown: false });
    }
  }

  handleProductSwipe = direction => {
    switch (direction) {
      case 'top': this.handleProductWheel({ deltaY: 1 }); break;
      case 'bottom': this.handleProductWheel({ deltaY: -1 }); break;
      default: break;
    }
  }

  renderEmptyProduct() {
    const { loading } = this.state;

    return (
      <div className='search-result-product--empty'>
        {loading ? 'loading...' : 'Tidak ada hasil pencarian'}
      </div>
    )
  }

  renderResult() {
    let { result, activeTabIndex, scrollingDown } = this.state;
    // result = mockProducts;

    let tabItems = [];
    let allProductData = [];

    for (let key in result) {
      tabItems.push({
        key: `search-tab-${key}`,
        text: key,
        count: result[key].length || undefined,
      });
      allProductData = [...allProductData, ...result[key]];
    }

    tabItems = [
      {
        key: 'search-tab-All',
        text: 'All',
        count: allProductData.length || undefined,
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
            <div className='search-result-product--container'>
              <ImageElement
                width={120}
                height={120}
                className='search-result-product--image' 
                src={product.image} 
                alt={`${product.name} | ${product.source}`} />
              <div className='search-result-product--info'>
                <div className='search-result-product--info--price'>{product.price}</div>
                {product.source !== 'Blibli' && <div className='search-result-product--info--shop'>Penjual: {product.shopName}</div>}
              </div>
            </div>
            <div className='search-result-product--link'>
              <a href={product.url} target='_blank' rel='noopener noreferrer'>Lihat di {product.source} ></a>
            </div>
          </Card>
        )
      })
    }

    const chipContainerStyle = {
      overflowX: 'scroll',
      whiteSpace: 'nowrap',
      fontSize: '12px',
      margin: '12px 8px 0 8px',
    }

    const searchResultContainerClassnames = cx('search-result-container--products--b',{
      'search-result-container--products--b--scrolled-down': scrollingDown,
    });

    return (
      <div>
        <Tab secondary
          items={tabItems}
          indexActive={this.state.activeTabIndex}
          onItemClick={this.handleChangeResultTab}
        />
        <div className={searchResultContainerClassnames} onWheel={this.handleProductWheel}>
          {/* <div style={chipContainerStyle}>
            <Chip active>Dari termurah</Chip>
            <Chip>Dari termahal</Chip>
            <Chip>Dari termahal</Chip>
            <Chip>Dari termahal</Chip>
            <Chip>Dari termahal</Chip>
          </div> */}
          <ReactTouchEvents onSwipe={this.handleProductSwipe}>
            <div style={{ height: '100%' }}>
              {products || this.renderEmptyProduct()}
            </div>
          </ReactTouchEvents>
        </div>
      </div>
    )
  }

  render() {
    const { scrollingDown } = this.state;
    const containerClassnames = cx('search-view-container', {
      'search-view-container--scrolled-down': scrollingDown,
    });
    
    return (
      <div className={containerClassnames}>
        <div>
          <Card container>
            <TextField
              type="text"
              className='search-input'
              placeholder="Cari produk di sini..." 
              onChange={this.handleSearchChange}
              onKeyDown={this.handleSearchKeyDown} 
              hasButton
              buttonIcon={searchIcon}
              buttonAction={this.handleSearchSubmit}
            />
          </Card>
        </div>
        {this.renderResult()}
      </div>
    );
  }
}

export default Search;
