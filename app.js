
//
const getPokemonTotal = async () => {
    try{
       const total_response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1');
       const total = total_response.data.count;
       console.log(`Got total number of pokémon as ${total}`);
       return total;
    }        
    catch(error) {
            console.error(`Error fetching data: ${error} Defaulting to 151`);
            return 151; // default value number of first generation pokémon.
        }
    };

const getPokemonById = async (id) => {
    try{
        console.log(`Attempting to retrieve pokémon with id ${id}`)
        const pokemon_response =   await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = pokemon_response.data;
        console.log(`Got pokémon with id ${id} as ${pokemon.name}`);
        return pokemon;
    }
    catch (error)  {
        console.error(`Error fetching data: ${error}`);
        return null;
    };
}


const getRandomPokemon = async () => {
   const total = await getPokemonTotal();
   const randomPokemonId = Math.floor(Math.random() * total) + 1;
   const pokemon = await getPokemonById(randomPokemonId);
   return pokemon;
};

const getTypeData = async(url) =>{
    try{
        console.log(`Attempting to get type data from url ${url}`);
        const typeObj = await axios.get(url);
        const typeData = typeObj.data;
        console.log(`Type Data Recieved for ${typeData.name}`);
        return typeData;
    }
    catch(error){
        console.log(`Failed to get Type Sprite from url: ${error}`);
    }

};

const updatePokemonCard = async (pokemon) =>{
    try{
        const pokemonCard = document.querySelector('#pokemon-card');
        // Display Pokémon sprite
        let img = document.createElement('img');
        img.src = pokemon.sprites.front_default;
        pokemonCard.appendChild(img);

        //Display Pokémon name
        let name = document.createElement('h2');

        name.innerText = pokemon.name[0].toUpperCase()+pokemon.name.slice(1);
        pokemonCard.appendChild(name);

        //Display Pokemon Types
        for (let data of pokemon.types){
            const typeCard = document.createElement('img');
            const url = data.type.url;
            const typeData = await getTypeData(url)
            const sprite = typeData.sprites['generation-viii']['brilliant-diamond-and-shining-pearl'].name_icon;
            typeCard.src = sprite;
            pokemonCard.appendChild(typeCard);

        };
    }
    catch(error){
        console.log(`Error updating pokemon card ${error}`)
    }

    

};


const gameSetup = async()=> {
    const errorHandling = (error) =>{
        console.log(`Error in game setup ${error}`)
        const pokemonCard = document.querySelector('#pokemon-card');
        pokemonCard.innerText = `Sorry Ash, the pokémon is in another castle:( \nplease refresh!`
    };
    // Get Random Pokémon
    let pokemon;
    try{
        pokemon = await getRandomPokemon();
        if(pokemon===null){
            pokemonCard.innerText = `Sorry Ash, the pokémon is in another castle:( \nplease refresh!` //Must improve handling of this
        }
    }
    catch (error){
        errorHandling()
    }
    //Update pokemon card to show recieved pokémon
    try{
        await updatePokemonCard(pokemon)
    }
    catch(error){
        errorHandling(error)
    }
}

const guessHandling = async(guess)=>{
    console.log(`Submitted ${guess}`)
    try{
        const pokemon = await getPokemonById(guess)
        console.log(pokemon)
    }
    catch(error){
        console.log(`Pokémon not found`)
    }
}

// Variable Declarations
let typesToMatch;

//Form Handling

const form = document.querySelector('form')
form.addEventListener('submit',(event)=>{
    event.preventDefault()
    const answerBox = document.querySelector('#answer')
    guessHandling(answerBox.value.toLowerCase());
    answerBox.value=""
})

//Main
gameSetup()
