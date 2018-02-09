require('dotenv').config();
import path from 'path';
import https from 'https';
import request from 'request';
import url from 'url';
import querystring from 'querystring';
import express from 'express';

let app = express();

app.use('/', express.static(path.join(__dirname, '../../client/build')));

app.listen(process.env.PORT, () => {
  console.log(`One-search server listening on port ${process.env.PORT}!`)
});

const tkpdDomain = 'gql.tokopedia.com';
app.get('/tkpd', (req, res) => {
  const keyword = req.query.keyword;
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
    
  request({
    url: `https://${tkpdDomain}/?`,
    qs: payload
  }, (err, response, body) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(body);
  })
})

const blDomain = 'api.bukalapak.com';
app.get('/bl', (req, res) => {
  const keyword = req.query.keyword;
    
  request({
    url: 'https://www.bukalapak.com/auth_proxies/request_token?scope=public%20user',
    method: 'POST',
  }, (err, response, body) => {
    const accessToken = JSON.parse(body).access_token;
    const payload = { 
      limit: 20,
      offset: 0,
      keywords: keyword,
      access_token: accessToken
    };

    request({
      url: `https://${blDomain}/products?`,
      qs: payload
    }, (err, response, body) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(body);
    })
  })
})