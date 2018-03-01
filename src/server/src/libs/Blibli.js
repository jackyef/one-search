import request from 'request-promise';
import url from 'url';

const blibliDomain = 'www.blibli.com';

const Blibli = {
  getProducts: keyword => {
    return request({
      url: `https://${blibliDomain}/jual/${keyword}`,
      method: 'GET',
      headers: {
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36',
      },
    }).then(body => {
      let toFind = '"itemListElement":[';
      let startIndex = body.indexOf(toFind) + toFind.length - 1;
      let endIndex = body.indexOf('</script>', startIndex);
      let temp1 = body.substring(startIndex, endIndex);
      temp1 = temp1.substring(0, temp1.lastIndexOf('}'));

      let data = [];
      let temp = temp1.replace(/(\:.*)(\".*)(\")(.*\")/gi, '$1$2\\$3$4'); //fix blibli json data 
      data = JSON.parse(temp);
   
      toFind = "var staticAbsoluteProductUrl = '";
      startIndex = body.indexOf(toFind) + toFind.length;
      endIndex = body.indexOf("';", startIndex);
      let temp2 = body.substring(startIndex, endIndex);

      // return data;
      return data.map(product => {
        return {
          id: 'N/A for blibli',
          name: product.name,
          url: product.url,
          image: temp2 + product.image.substring(product.image.indexOf('/images/catalog') + 1),
          price: +product.offers.price,
          shopName: 'Blibli',
        }
      });
    }).catch(err => {
      console.log('[Blibli Error] Error when getting products');
      console.log('Message', err.message);

      return err;
    })
  },
};

export default Blibli;