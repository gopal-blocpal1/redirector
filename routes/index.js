var express = require('express');
var router = express.Router();
const axios = require('axios');

const getRedirectionUrlAxios = async (url) => {
  try {
    const response = await axios.get(url, {
      maxRedirects: 5 // Follow up to 5 redirects
    });

    return response.request.res.responseUrl;
  } catch (error) {
    return null;
  }
}

function getDomainName(fullUrl) {
  try {
    const url = new URL(fullUrl); // Create a new URL object
    return url.origin; // Extract the domain (origin includes protocol + domain)
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
}


/* scrap themenifest data */
router.get('/get_url/:url', async function (req, res, next) {
  // Example usage with an array of URLs
  const encodedUrl = req.params.url;
  const decodedUrl = decodeURIComponent(encodedUrl);

  let finalUrl = await getRedirectionUrlAxios(decodedUrl) || 'no_link';
  finallink = getDomainName(finalUrl);
  const data = {
    finallink
  };

  res.json(data);
});


/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { title: 'Home' });
});


module.exports = router;
