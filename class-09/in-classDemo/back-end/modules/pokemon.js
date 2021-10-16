'use strict'
const axios = require('axios');

function handlePokemon(request, response) {
  let { poke } = request.query;
  console.log('poke:', poke);
  let URL = `https://pokeapi.co/api/v2/pokemon/${poke}/`;
  console.log('1');
  axios
    .get(URL)
    .then(info => {
      console.log('2');
      let pokemonObj = new Pokemon(info.data);
      return pokemonObj;
    })
    .then(pokeObject => response.status(200).send(pokeObject))
    .catch(error => {
      console.log('error in getting pokemon:', error.message)
      response.status(404).send(`error: ${error.message}`)
    });
  console.log('3');
}

class Pokemon {
  constructor(pokemon) {
    this.name = pokemon.name;
    this.weight = pokemon.weight;
    this.height = pokemon.height;
    this.image_URL = pokemon.sprites.front_default;
  }
}

module.exports = handlePokemon;
