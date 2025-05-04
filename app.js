
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
        const displayPokemonSprite = document.querySelector('#pokemon-sprite')
        const displayPokemonName = document.querySelector('#pokemon-name')
        const displayPokemonTypes = document.querySelector('#pokemon-types')
        // Display Pokémon sprite
        displayPokemonSprite.src = pokemon.sprites.front_default;
        //Display Pokémon name
        displayPokemonName.innerText = pokemon.name[0].toUpperCase()+pokemon.name.slice(1);
       ;

        
        //Display Pokemon Types
        
        for (let data of pokemon.types){
            const typeCard = document.createElement('img');
            const url = data.type.url;
            const typeData = await getTypeData(url)
            const sprite = typeData.sprites['generation-viii']['brilliant-diamond-and-shining-pearl'].name_icon;
            typeCard.src = sprite;
            displayPokemonTypes.appendChild(typeCard);

        };
    }
    catch(error){
        console.log(`Error updating pokemon card ${error}`)
    }

    

};

const checkEffectiveness = (guessedTypeRelations,targetTypes) =>{ //TODO check and rework logic
   return targetTypes.every(type =>
    guessedTypeRelations.double_damage_to.some(t=> t.name === type)
   )
}

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
        if(pokemon===null){// TODO Must improve handling of this
            pokemonCard.innerText = `Sorry Ash, the pokémon is in another castle 
            \n:( 
            \nplease refresh!` 
        }
        else{
            typesToMatch = []
            for (let data of pokemon.types){
                typesToMatch.push(data.type.name)
            }
        };
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
        for(let data of pokemon.types){ //TODO REPEATED CODE TO BE FIXED
            const url = data.type.url;
            typeData = await getTypeData(url)
        }   
    }
    catch(error){
        console.log(`Pokémon not found`)
        return false
    }
    if(typesToMatch ===null){
        console.log('Types to match not loaded yet')
        return false
    }
    return checkEffectiveness(typeData.damage_relations,typesToMatch)
}

const resultHandling = (result) =>{
    if(result){
        console.log('WINNER')
    }
    else{
        console.log('LOSER')
    }
}

// Variable Declarations
let typesToMatch = null;

//Form Handling

const form = document.querySelector('form')
form.addEventListener('submit',async(event)=>{
    event.preventDefault()
    const answerBox = document.querySelector('#answer')
    const result = await guessHandling(answerBox.value.toLowerCase());
    answerBox.value=""
    resultHandling(result)
})

//Main
gameSetup()
