const gameSetup = async()=> {
    await setupNewCard()
    populateDropdown()
}

const setupNewCard = async()=>{
   let pokemon;
    try{
        pokemon = await getRandomPokemon();
        createPokemonCard(pokemon)
        typesToMatch = []
        for (let data of pokemon.types){
            typesToMatch.push(data.type.name)
            }
    }
    catch (error){
        console.log(`Error in game setup ${error}`)
        pokemonCardContainer.innerText = `Sorry Ash, the pokémon is in another castle :( \nplease refresh!`
    }
}

const guessHandling = async(guess)=>{
   console.log(`Submitted ${guess}`)
   try{``
       const pokemon = await getPokemonById(guess)
       if(pokemon === null){
           console.log(`Pokémon not found`)
           return false
       }
       //Update card with guessed Pokémon or create new card if it doesn't exist

       //Create versus text
       if(pokemonCardContainer.querySelectorAll('#versus-text').length === 0){
           showVersusText()
       }
       
       if(pokemonCardContainer.querySelectorAll('#pokemon-card').length >1){
           updatePokemonCard(pokemon,1)
       }
       else{
           createPokemonCard(pokemon)
       }
       let effectiveness = 0;
       for(let data of pokemon.types){
           const url = data.type.url;
           typeData = await getTypeData(url)
           effectiveness = Math.max(effectiveness,checkEffectiveness(typeData.damage_relations,typesToMatch))
       }   
       resultHandling(effectiveness)
   }
   catch(error){
       console.log(`Pokémon not found ${error}`)
       resultHandling(-1)
   }
}

const checkEffectiveness = (guessedTypeRelations,typeToBeat) =>{
    let multiplier = 1; // Initialize multiplier to 1
    filt = (t) => typeToBeat.includes(t.name)
    let ne = guessedTypeRelations.no_damage_to.filter(filt).length;
    let he = guessedTypeRelations.half_damage_to.filter(filt).length;
    let se = guessedTypeRelations.double_damage_to.filter(filt).length;
    if(ne > 0){
        multiplier *= 0; // No damage
    }
    else if(he > 0){
        multiplier *= 0.5*he; // Half damage
    }
    else if(se > 0){
        multiplier *= 2*se; // Double damage
    }

   console.log(`Multiplier: ${multiplier}`)
   return multiplier;
}

const resultHandling = (result) =>{
    if(result>=2){
        shiny_chance += 0.03
    }
    else{
        shiny_chance =0.03
    }
   showResultText(result)
}

//Form Handling

const form = document.querySelector('form')
form.addEventListener('submit',async(event)=>{
   event.preventDefault()
   const searchBox = document.querySelector('#search-box')
   console.log(searchBox.value.length)
   if(searchBox.value.length >0){
    const result = await guessHandling(searchBox.value.toLowerCase());
    searchBox.value=""
    
    }
})

//Restart button handling
const restartButton = document.querySelector('#restart')
restartButton.addEventListener('click',(event)=>{
   typesToMatch = null
   resetScreen()
   setupNewCard()

})

let shiny_chance = 0.03