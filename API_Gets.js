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
        throw new Error(`Pokémon with id ${id} not found`);
    };
}


const getRandomPokemon = async () => {
   const total = await getPokemonTotal();
   const retries = 3;
   for(let attempts = 0; attempts<retries;attempts++){
    try{
        const randomPokemonId = Math.floor(Math.random() * total) + 1;
        const pokemon = await getPokemonById(randomPokemonId);
        return pokemon;
    }
    catch (error) {
        console.error(`Error fetching data: ${error}`);
        if(attempts === retries - 1){
            throw new Error(`Failed to get random Pokémon after ${retries} attempts`);
        }
        console.log(`Retrying... (${attempts + 1}/${retries})`);
    }
   }
   
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
}