import request from 'request-promise';
import url from 'url';

const lazadaDomain = 'www.lazada.co.id';

const Lazada = {
  getProducts: keyword => {
    return request({
      url: `https://${lazadaDomain}/catalog/?`,
      qs: {
        q: keyword,
      },
      method: 'GET',
    }).then(body => {
      const toFind = 'window.pageData=';
      const startIndex = body.indexOf(toFind) + toFind.length;
      const endIndex = body.indexOf('</script>', startIndex);
      const data = JSON.parse(body.substring(startIndex, endIndex));
  
      return data;
    })
    .catch(err => {
      console.log('[Lazada Error] Error when getting token');
      console.log('Message', err.message);

      return err;
    })
  },
};

export default Lazada;