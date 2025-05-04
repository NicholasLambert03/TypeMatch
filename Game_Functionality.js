const checkEffectiveness = (guessedTypeRelations,targetTypes) =>{ //TODO check and rework logic
    return targetTypes.every(type =>
     guessedTypeRelations.double_damage_to.some(t=> t.name === type)
    )
 }
 
 const gameSetup = async()=> {
     const errorHandling = (error) =>{
         
     };
     // Get Random Pokémon
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
         cardContainer.innerText = `Sorry Ash, the pokémon is in another castle :( \nplease refresh!`
     }
 
 }

 const guessHandling = async(guess)=>{
    console.log(`Submitted ${guess}`)
    try{
        const pokemon = await getPokemonById(guess)
        //Update card with guessed Pokémon or create new card if it doesn't exist

        //Create versus text
        if(cardContainer.querySelectorAll('#versus-text').length === 0){
            showVersusText()
        }
        
        if(cardContainer.querySelectorAll('#pokemon-card').length >1){
            updatePokemonCard(pokemon,1)
        }
        else{
            createPokemonCard(pokemon)
        }
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

const resultHandling = (result) =>{ //TODO hide answer box and show result
    showResultText(result)
    if(result){
        console.log("CORRECT!") //TODO add reset button
    }
    else{
        console.log("WRONG!")
    }
}

//Form Handling

const form = document.querySelector('form')
form.addEventListener('submit',async(event)=>{
    event.preventDefault()
    const answerBox = document.querySelector('#answer')
    const result = await guessHandling(answerBox.value.toLowerCase());
    answerBox.value=""
    resultHandling(result)
})

//Restart button handling
const restartButton = document.querySelector('#restart')
restartButton.addEventListener('click',(event)=>{
    typesToMatch = null
    resetScreen()
    gameSetup()

})

