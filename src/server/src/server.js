require('dotenv').config();

import path from 'path';
import https from 'https';
import rj from 'request-json';
import querystring from 'querystring';
import express from 'express';
import bodyParser from 'body-parser';

import Tokopedia from './libs/Tokopedia';
import Bukalapak from './libs/Bukalapak';

let app = express();

app.use('/', express.static(path.join(__dirname, '../../client/build')));

app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log(`One-search server listening on port ${process.env.PORT}!`)
});

app.get('/tkpd', (req, res) => {
  const keyword = req.query.keyword;

  res.setHeader('Content-Type', 'application/json');

  Tokopedia.getGqlProducts(keyword)
    .then(data => res.send(data))
    .catch(err => res.send(err));
})

app.get('/tkpd-ace', (req, res) => {
  const keyword = req.query.keyword;
  
  res.setHeader('Content-Type', 'application/json');
  
  Tokopedia.getAceProducts(keyword)
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

app.get('/bl', (req, res) => {
  const keyword = req.query.keyword;

  res.setHeader('Content-Type', 'application/json');
    
  Bukalapak.getProducts(keyword)
    .then(data => res.send(data))
    .catch(err => res.send(err));
})

const lazadaDomain = 'www.lazada.co.id';
app.get('/lazada', (req, res) => {
  const keyword = req.query.keyword;
    
  request({
    url: `https://${lazadaDomain}/catalog/?`,
    qs: {
      q: keyword,
    },
    method: 'GET',
  }, (err, response, body) => {
    if(err) {
      console.log("== ERROR ==");
      console.log("Request", req);
      console.log("message:", err.message);
      res.status(500);
      res.send(err.message);
      return;
    }

    const toFind = 'window.pageData=';
    const startIndex = body.indexOf(toFind) + toFind.length;
    const endIndex = body.indexOf('</script>', startIndex);
    let data = {};

    try {
      data = JSON.parse(body.substring(startIndex, endIndex));
    } catch (err) {
      console.log("ERROR when parsing JSON")
      console.log(err.message);
      res.send(err.message);
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  })
})

const blibliDomain = 'www.blibli.com';
app.get('/blibli', (req, res) => {
  const keyword = req.query.keyword;
    
  request({
    url: `https://${blibliDomain}/jual/${keyword}`,
    method: 'GET',
    headers: {
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36',
    },
  }, (err, response, body) => {
    if(err) {
      console.log("== ERROR ==");
      console.log("Request", req);
      console.log("message:", err.message);
      res.status(500);
      res.send(err.message);
      return;
    }

    const toFind = '"itemListElement":[';
    const startIndex = body.indexOf(toFind) + toFind.length - 1;
    const endIndex = body.indexOf('</script>', startIndex);
    let temp1 = body.substring(startIndex, endIndex);
    temp1 = temp1.substring(0, temp1.lastIndexOf('}'));

    let data = [];
    let temp = temp1.replace(/(\:.*)(\".*)(\")(.*\")/gi, '$1$2\\$3$4'); //fix blibli json data 
    try {
      data = JSON.parse(temp);
    } catch (err) {
      console.log("ERROR when parsing JSON")
      console.log(err.message);
      console.log("BODY LENGTH", temp.length);
      res.send(err.message);
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  })
})

const shopeeDomain = 'shopee.co.id';
app.get('/shopee', (req, res) => {
  const keyword = req.query.keyword;
    
  const payload1 = {
    by: 'pop',
    order: 'desc',
    newest: 0,
    limit: 20,
    keyword: keyword
  }

  request({
    headers: {
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36',
    },
    method: 'GET',
    url: `https://${shopeeDomain}/api/v1/search_items/?`,
    qs: payload1,
  }, (err, response, body) => {
    // console.log("first body", body);
    let itemsPayload;
    let cookies;
    try { 
      itemsPayload = JSON.parse(body).items;
      cookies = response.headers['set-cookie'];
    } catch (err) {
      console.log('first error', err);
      res.send(err);
      return;
    }
    const payload = {
      item_shop_ids: itemsPayload 
    };

    let cookieString = cookies.reduce((acc, v) => acc + v);
    cookieString += '; csrftoken=GXkIGmRcmE8iagMLteNX731j9n306IVb';
    // console.log("cookie", cookieString);
    // cookieString += '; SPC=GXkIGmRcmE8iagMLteNX731j9n306IVb';
    request({
      method: 'POST',
      url: `https://${shopeeDomain}/api/v1/items/`,
      headers: {
        'accept': 'application/json',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'user-agent': 'Mozilla/5.0/ (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36',
        'dnt': 1,
        'if-none-match-': '55b03-11f5830fd3d639dde11608814c04c920',
        'origin': 'https://shopee.co.id',
        'referer': `https://shopee.co.id/search/?keyword=${keyword}`,
        'cookie': cookieString,
        'x-csrftoken': 'GXkIGmRcmE8iagMLteNX731j9n306IVb',
        'x-requested-with': 'XMLHttpRequest',
        'x-api-source': 'pc',
      },
      body: JSON.stringify(payload),
      // json: true,
    }, (err, response, body) => {
      if(err) {
        res.status(500),
        res.send(err.message);
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      // res.setHeader('Content-Type', 'text/html');
      // res.send(body);
      res.send(response);
    })
  })
})

app.get('/shopeetest', (req, res) => {
  request({
    method: 'POST',
    url: `https://${shopeeDomain}/api/v1/items/`,
    headers: {
      // 'accept': 'application/json',
      'accept-encoding': 'gzip, deflate, br',
      // 'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36',
      'dnt': 1,
      'if-none-match-': '55b03-11f5830fd3d639dde11608814c04c920',
      'origin': 'https://shopee.co.id',
      'referer': `https://shopee.co.id/search/?keyword=sepeda`,
      'cookie': 'SPC_F=GY9kiTYnLb7l2Cr7XyEq1AXhyx4tOQ34; REC_T_ID=9712d9ee-0350-11e8-9f47-d0946603d5c9; cto_lwid=b478c6cc-e010-423f-bf11-62b17c8a92bb; __BWfp=c1517050578783x42dacbd5e; csrftoken=GXkIGmRcmE8iagMLteNX731j9n306IVb; SPC_IA=-1; SPC_EC=-; SPC_T_ID="PM5745qBiscM41hPGEawYzfWEQC+QsebJmlNzntvmqlK+zX+GuT6nfSqC6APMXe+pSUnuCspPkAhaj41D5TiKHpFdsDoBIFCK2zTmX+hmw0="; SPC_U=-; SPC_T_IV="amfPuRJ45xQsBJGeV/vlig=="; bannerShown=true; _ga=GA1.3.1460046940.1517050530; _gid=GA1.3.1984642348.1517997019; _gac_UA-61904553-8=1.1517060420.CjwKCAiA47DTBRAUEiwA4luU2bu7p4NeXA9fzfGKKKT8Ge5ASW9M4JtS6TmTVd95sGkTDiBOe7ivLBoCD8MQAvD_BwE; SPC_SC_TK=; UYOMAPJWEMDGJ=; SPC_SC_UD=; _gat=1; SPC_SI=w5twtzyexxtlb1rwo4gvsroakuo6ya1g',
      'x-csrftoken': 'GXkIGmRcmE8iagMLteNX731j9n306IVb',
      'x-requested-with': 'XMLHttpRequest',
      'x-api-source': 'pc',
    },
    body: JSON.stringify(require('./payload.json')),
    // json: true,
  }, (err, response, body) => {
    if(err) {
      res.status(500),
      res.send(err.message);
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Content-Type', 'text/html');
    // res.send(body);
    res.send(response);
  })
})