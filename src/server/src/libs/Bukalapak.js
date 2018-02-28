import request from 'request-promise';
import url from 'url';

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
          limit: 20,
          offset: 0,
          keywords: keyword,
          access_token: token
        };
  
        return request({
          url: `https://${blDomain}/products?`,
          qs: payload
        }).then(body => {
          let data = JSON.parse(body);
          
          return data;
        })
      })
      .catch(err => {
        return err;
      })
  },

};

export default Bukalapak;