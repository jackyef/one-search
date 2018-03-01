import React, { Component } from 'react';
import { BottomNav, Card, NavBar } from 'unify-react-mobile';
import 'unify-react-mobile/build/styles.css';

import Header from '../../components/Header';

import homeIcon from './assets/ic_home_black_24px.svg';
import contactIcon from './assets/ic_contacts_black_24px.svg';
import searchIcon from './assets/ic_search_black_24px.svg';

class Home extends Component {
  state = {
    activeBottom: 0,
  }

  handleBottomNavHomeChange = () => {
    this.setState({ activeBottom: 0})
  }
  handleBottomNavSearchChange = () => {
    this.setState({ activeBottom: 1})
  }
  handleBottomNavContactChange = () => {
    this.setState({ activeBottom: 2})
  }

  render() {
    return (
      <div>
        <Header 
          title="One Search"
          onBack={false}
          fixed
        />
        <Card> Kini anda bisa mencari produk yang anda inginkan pada 4 marketplace sekaligus! </Card>
        <Card> Kini anda bisa mencari produk yang anda inginkan pada 4 marketplace sekaligus! </Card>
        <Card> Kini anda bisa mencari produk yang anda inginkan pada 4 marketplace sekaligus! </Card>
        <Card> Kini anda bisa mencari produk yang anda inginkan pada 4 marketplace sekaligus! </Card>
        <Card> Kini anda bisa mencari produk yang anda inginkan pada 4 marketplace sekaligus! </Card>
        <Card> Kini anda bisa mencari produk yang anda inginkan pada 4 marketplace sekaligus! </Card>
        <Card> Kini anda bisa mencari produk yang anda inginkan pada 4 marketplace sekaligus! </Card>
        <Card> Kini anda bisa mencari produk yang anda inginkan pada 4 marketplace sekaligus! </Card>
        <Card> Kini anda bisa mencari produk yang anda inginkan pada 4 marketplace sekaligus! </Card>
        <Card> Kini anda bisa mencari produk yang anda inginkan pada 4 marketplace sekaligus! </Card>
        <BottomNav 
          items={[
            { key: 0, icon: homeIcon, iconActive: homeIcon, text: 'Home', onClick: this.handleBottomNavHomeChange },
            { key: 1, icon: searchIcon, iconActive: searchIcon, text: 'Search', onClick: this.handleBottomNavSearchChange },
            { key: 2, icon: contactIcon, iconActive: contactIcon, text: 'About', onClick: this.handleBottomNavContactChange },
          ]} indexActive={this.state.activeBottom}
        />
      </div>
    );
  }
}

export default Home;
