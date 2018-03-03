import React, { Component } from 'react';
import { Card } from 'unify-react-mobile';
import 'unify-react-mobile/build/styles.css';

class Home extends Component {
  render() {
    return (
      <div>
        <Card container subheader={`Selamat datang di Jackyef's OneSearch`}> 
          <Card container>
            Ini adalah sebuah mobile web-app yang dapat anda gunakan untuk mencari produk dari 4 online marketplace yang ada di Indonesia sekaligus!
            Saat ini OneSearch mendukung pencarian produk di marketplace berikut:
            <ul>
              <li>Lazada</li>
              <li>Tokopedia</li>
              <li>Bukalapak</li>
              <li>Blibli</li>
            </ul>
            Kini anda bisa mencari produk yang anda inginkan pada 4 marketplace sekaligus! 
          </Card>
          <Card container>
            <p>Bagikan di:</p>
          </Card>
          <Card container>
            <em>Disclaimer</em>
            <p>Web-app ini dibuat untuk iseng-iseng dan belajar saja. Tidak ada hewan yang disakiti dalam proses pengembangannya.</p>
          </Card>
        </Card>
      </div>
    );
  }
}

export default Home;
