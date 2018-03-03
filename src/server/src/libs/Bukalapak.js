import request from 'request-promise';
import url from 'url';
import StringFormatter from './helpers/StringFormatter';

const blDomain = 'api.bukalapak.com';

const Bukalapak = {
  getToken: () => {
    return request({
      url: 'https://www.bukalapak.com/auth_proxies/request_token?scope=public%20user',
      method: 'POST',
    })
    .then(body => {
      const accessToken = JSON.parse(body).access_token;

      return accessToken;
    })
    .catch(err => {
      console.log('[Bukalapak Error] Error when getting token');
      console.log('Message', err.message);

      return false;
    })
  },

  getProducts: keyword => {
    return Bukalapak.getToken()
      .then(token => {
        if(!token) throw err;
  
        const payload = { 
          limit: 50,
          offset: 0,
          keywords: keyword,
          access_token: token
        };
  
        return request({
          url: `https://${blDomain}/products?`,
          qs: payload
        }).then(body => {
          let raw = JSON.parse(body);

          return raw.data.map(product => {
            return {
              id: product.id,
              name: product.name,
              url: product.url,
              image: product.images.large_urls[0],
              price: `Rp ${StringFormatter.thousandSeparator(String(product.price))}`,
              shopName: product.store.name,
              source: 'Bukalapak',
            }
          });
        })
      })
      .catch(err => {
        console.log('[Bukalapak Error] Error when getting products');
        console.log('Message', err.message);
  
        return err;
      })
  },

};

export default Bukalapak;