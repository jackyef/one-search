import request from 'request-promise';
import url from 'url';

const tkpdAceDomain = 'ace.tokopedia.com';
const tkpdGqlDomain = 'gql.tokopedia.com';

const Tokopedia = {
  getAceProducts: keyword => {
    const payload = {
      device: 'android',
      source: 'apps',
      unique_id: 123,
      rows: 20,
      q: keyword,
    }
  
    return request({
      url: `https://${tkpdAceDomain}/search/v2.6/product?`,
      qs: payload
    }) 
    .then((body) => {
      let data = {};
      let products = [];
  
      try {
        data = JSON.parse(body);
        products = data && data.data && data.data.products || [];
      } catch (err) {
        console.log("[Tokopedia Ace Api] ERROR when parsing JSON")
        console.log(err.message);
  
        return Promise.reject(err.message);
      }
  
      return Promise.resolve(products);
    })
    .catch(err => Promise.reject(err));
  },
  
  getGqlProducts: keyword => {
    const payload = { 
      query: `
        {
          search_results_product(user_ID: 1 query: "${keyword}", page: 0, per_page: 20){
            items {
              id
              name
              url
              image_url
              image_url_700
              price
              count_review
              rating
              shop {
                id
                name
                reputation
                location
                city
              }
              wishlist
            }
            total_data
          }
        }`
      };
      
    return request({
      url: `https://${tkpdGqlDomain}/?`,
      qs: payload
    })
    .then(body => {
      let data = {};
  
      try {
        data = JSON.parse(body);
      } catch (err) {
        console.log("[Tokopedia Gql Api] Error when parsing JSON")
        console.log(err.message);
  
        return Promise.reject(err.message);
      }
  
      return Promise.resolve(data);
    })
    .catch(err => {
      console.log("[Tokopedia Gql Api] Unexpected error")
      return Promise.reject(err);
    });
  }
};

export default Tokopedia;