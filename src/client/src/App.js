import React, { Component } from 'react';
import { BottomNav } from 'unify-react-mobile';

import Home from './routes/Home';
import { SearchA, SearchB } from './routes/Search';
import About from './routes/About';
import Header from './components/Header';

import 'unify-react-mobile/build/styles.css';
import './utilities.css';

import homeIcon from './assets/ic_home_black_24px.svg';
import contactIcon from './assets/ic_contacts_black_24px.svg';
import searchIcon from './assets/ic_search_black_24px.svg';

class App extends Component {
  constructor(props){
    super(props);

    this.Search = Math.random() > .5 ? SearchA : SearchB; // simple A/B testing
    window.onpopstate = () => {
      this.handleRouting();
    }
  }

  state = {
    activeContentIndex: 0,
    activeContentName: 'Home'
  }

  componentDidMount() {
    this.handleRouting();
  }
  
  handleRouting() {
    // TODO: use react-router for routing
    const path = window.location.pathname;
    if (path.includes('search')) {
      this.setState({ activeContentIndex: 1, activeContentName: 'Search' })
    } else if (path.includes('about')) {
      this.setState({ activeContentIndex: 2, activeContentName: 'About' })
    } else {
      this.setState({ activeContentIndex: 0, activeContentName: 'Home' })
    }
  }

  handleBottomNavHomeChange = () => {
    this.setState({ activeContentIndex: 0, activeContentName: 'Home' })
    window.history.pushState(null, 'Home', '/');
  }
  
  handleBottomNavSearchChange = () => {
    this.setState({ activeContentIndex: 1, activeContentName: 'Search' })
    window.history.pushState(null, 'Search', '/search');
  }
  
  handleBottomNavContactChange = () => {
    this.setState({ activeContentIndex: 2, activeContentName: 'About' })
    window.history.pushState(null, 'About', '/about');
  }

  renderContent() {
    // TODO: use react-router for routing
    switch(this.state.activeContentName) {
      case 'Home': return <Home />;
      // case 'Search': return <this.Search />;
      case 'Search': return <SearchB />;
      case 'About': return <About />;
      default: return <Home />;
    }
  }

  render() {
    const { activeContentIndex, activeContentName } = this.state;
    const spacerStyle = {
      height: '36px',
    }

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
        <div style={spacerStyle} />
      </div>
    );
  }
}

export default App;
