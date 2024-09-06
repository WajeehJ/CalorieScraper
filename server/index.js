const PORT = 8000; 
const axios = require('axios') 
const cheerio = require('cheerio')
const express = require('express')
const puppeteer = require('puppeteer')
const http = require('http') 
const fs = require('fs')

const cors = require('cors')
const app = express()

const url = "https://pinchofyum.com/recipes/all"

app.use(cors());
app.use(express.json())


app.post("/api", (req, res) => {

  const recipes = []; 

  const calories = req.body.data;

axios(url).then(response => {
    const html = response.data; 
    let $ = cheerio.load(html); 

    const recipePromises = []; 
    const recipeLinks = []; 

    const gridOfRecipes = $('.grid') 
    const listItems = $(gridOfRecipes).find('article');
    $(listItems).each(function (i, elem) {
      let newRecipe = $(this).find('a').attr('href'); 
      recipeLinks.push(newRecipe); 
      recipePromises.push(axios(newRecipe));
    });  

    Promise.all(recipePromises).then(async(values) => {
      for(let i = 0; i < values.length; i++) {
        $ = cheerio.load(values[i].data); 
        const title = $('.entry-title ').text(); 
        const jsonLdScript = $('script[type="application/ld+json"].yoast-schema-graph').html();
        const jsonData = JSON.parse(jsonLdScript);

        const recipeData = jsonData['@graph'].find(item => item['@type'] === 'Recipe');

        const caloriesString = recipeData?.nutrition?.calories;

        const caloriesNumber = caloriesString ? caloriesString.match(/\d+/)[0] : null;

        const imageLink = $('.tasty-pins-banner-image-link').find('img').attr('src');


        if(caloriesNumber <= calories) {
          recipes.push( { title : title , caloriesNumber : parseInt(caloriesNumber, 10), recipeLink: recipeLinks[i], imageLink: imageLink} )
        }


        



      }

      res.json( {recipes : recipes});

    })






}).catch(err => console.log(err))

  


})

async function downloadImage(url, filename) {
  try {
      const { data } = await axios({
          url,
          responseType: 'stream',
      });

      const writer = fs.createWriteStream(path.resolve(__dirname, filename));

      data.pipe(writer);

      return new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
      });

  } catch (error) {
      console.error('Error downloading the image:', error);
  }
}





app.listen(PORT, () => console.log('server running on PORT 8000'))