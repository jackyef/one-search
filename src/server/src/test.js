var request = require('request');
var payload = require('./payload.json');

// request({
//   method: 'POST',
//   url: `https://shopee.co.id/api/v1/items/`,
//   headers: {
//     'accept':'application/json',
//     'accept-encoding':'gzip, deflate, br',
//     'accept-language':'en-US,en;q=0.9',
//     'content-length': JSON.stringify(payload).length,
//     'content-type':'application/json',
//     'cookie':'SPC_F=GY9kiTYnLb7l2Cr7XyEq1AXhyx4tOQ34; REC_T_ID=9712d9ee-0350-11e8-9f47-d0946603d5c9; cto_lwid=b478c6cc-e010-423f-bf11-62b17c8a92bb; __BWfp=c1517050578783x42dacbd5e; csrftoken=GXkIGmRcmE8iagMLteNX731j9n306IVb; SPC_IA=-1; SPC_EC=-; SPC_T_ID="PM5745qBiscM41hPGEawYzfWEQC+QsebJmlNzntvmqlK+zX+GuT6nfSqC6APMXe+pSUnuCspPkAhaj41D5TiKHpFdsDoBIFCK2zTmX+hmw0="; SPC_U=-; SPC_T_IV="amfPuRJ45xQsBJGeV/vlig=="; bannerShown=true; SPC_SC_TK=; UYOMAPJWEMDGJ=; SPC_SC_UD=; _ga=GA1.3.1460046940.1517050530; _gid=GA1.3.1773016707.1518245803; _gac_UA-61904553-8=1.1517060420.CjwKCAiA47DTBRAUEiwA4luU2bu7p4NeXA9fzfGKKKT8Ge5ASW9M4JtS6TmTVd95sGkTDiBOe7ivLBoCD8MQAvD_BwE; _gat=1; SPC_SI=rdf9h8sqqjedg5qfjbsmt4iqedse99y0',
//     'dnt':1,
//     'if-none-match-':'55b03-0920ff6099f854b52361426a590e3e71',
//     'origin':'https://shopee.co.id',
//     'referer':'https://shopee.co.id/search/?keyword=sepeda',
//     'user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36',
//     'x-api-source':'pc',
//     'x-csrftoken':'GXkIGmRcmE8iagMLteNX731j9n306IVb',
//     'x-requested-with':'XMLHttpRequest',
//   },
//   body: JSON.stringify(payload),
//   // json: true,
// }, (err, response, body) => {
//   if(err) {
//     console.log("ERROR", err);
//     return;
//   }
//   // res.setHeader('Content-Type', 'text/html');
//   // res.send(body);
//   console.log("BODY", body);
// })

request({
  method: 'GET',
  url: 'https://www.blibli.com/jual/macbook',
  headers: {
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36',
  }
}, (err, response, body) => {
  if(err) {
    console.log("ERROR:", err.message);
    return;
  }

  console.log("BODY", body);
});