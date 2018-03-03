import React, { Component } from 'react';
import { BottomNav } from 'unify-react-mobile';

import Home from './routes/Home';
import Search from './routes/Search';
import About from './routes/About';
import Header from './components/Header';

import 'unify-react-mobile/build/styles.css';
import './utilities.css';

import homeIcon from './assets/ic_home_black_24px.svg';
import contactIcon from './assets/ic_contacts_black_24px.svg';
import searchIcon from './assets/ic_search_black_24px.svg';

class App extends Component {
  state = {
    activeContentIndex: 0,
    activeContentName: 'Home'
  }

  handleBottomNavHomeChange = () => {
    this.setState({ activeContentIndex: 0,activeContentName: 'Home'})
  }

  handleBottomNavSearchChange = () => {
    this.setState({ activeContentIndex: 1,activeContentName: 'Search'})
  }
  
  handleBottomNavContactChange = () => {
    this.setState({ activeContentIndex: 2,activeContentName: 'About'})
  }

  renderContent() {
    switch(this.state.activeContentName) {
      case 'Home': return <Home />;
      case 'Search': return <Search />;
      case 'About': return <About />;
      default: return <Home />;
    }
  }

  render() {
    const { activeContentIndex, activeContentName } = this.state;
    return (
      <div>
        <Header 
          title={`${activeContentName} | One Search`}
          onBack={false}
          fixed
        />
        {this.renderContent()}
        <BottomNav 
          items={[
            { key: 0, icon: homeIcon, iconActive: homeIcon, text: 'Home', onClick: this.handleBottomNavHomeChange },
            { key: 1, icon: searchIcon, iconActive: searchIcon, text: 'Search', onClick: this.handleBottomNavSearchChange },
            { key: 2, icon: contactIcon, iconActive: contactIcon, text: 'About', onClick: this.handleBottomNavContactChange },
          ]} indexActive={activeContentIndex}
        />
      </div>
    );
  }
}

export default App;
