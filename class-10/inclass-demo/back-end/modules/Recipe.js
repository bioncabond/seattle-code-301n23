'use strict'

const axios = require('axios');
let cache = require('./Cache.js');
async function getRecipies(req, res) {
  let { q } = req.query;
  let URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${q}&app_id=${process.env.EDAMAM_ID}&app_key=${process.env.EDAMAM_KEY}`;

  //If the query exists then we have a hit

  if (cache[q] &&
    Date.now() - cache[q].timestamp < 1000 * 60 * 2) {
    //1sec  1 minute 2 minutes 

    //ERROR: 
    //res.status(200).send(cache[q].recipe);
    //should have been sent out:
    res.status(200).send(cache[q].recipe);
    console.log(cache, 'Cache HIT!');
  }


  //set the cache and make the axios call
  else {
    try {
      let info = await axios.get(URL);
      let sendRecipies = info.data.hits.map(item => {
        return new Recipies(item.recipe);
      })
      //Cache is set.
      cache[q] = {
        recipe: sendRecipies,
        timestamp: Date.now()
      };
      console.log('cache miss');
      res.status(200).send(sendRecipies);
    }
    catch (err) {
      res.status(500).send('Cannot find recipe:', err.message);
    }
  }
}

class Recipies {
  constructor(recipe) {
    this.title = recipe.label;
    this.image_url = recipe.image;
    this.calories = recipe.calories;
    this.ingredients = recipe.ingredients;
  }
}

module.exports = getRecipies;