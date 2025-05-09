const createPokemonCard = (pokemon)=>{
    //setup card
    const card = document.createElement('div');
    card.setAttribute('id','pokemon-card')
    card.classList.add('card','col-4','col-lg-3')

    const cardSpriteHolder = document.createElement('img')
    cardSpriteHolder.setAttribute('id','pokemon-sprite')
    cardSpriteHolder.classList.add('img-thumbnail')

    const cardBody = document.createElement('div')
    cardBody.setAttribute('id','pokemon-card-body')
    cardBody.classList.add('card-body','text-center')

    const cardTitle = document.createElement('h2')
    cardTitle.setAttribute('id','pokemon-name')
    cardTitle.classList.add('card-title','text-capitalize')

    const cardTypes = document.createElement('p')
    cardTypes.setAttribute('id','pokemon-types')
    cardTypes.classList.add('card-text')

    card.appendChild(cardSpriteHolder)
    card.appendChild(cardBody)
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardTypes)
    pokemonCardContainer.appendChild(card)
    updatePokemonCard(pokemon,pokemonCardContainer.querySelectorAll('#pokemon-card').length-1)

}

const updatePokemonCard = async (pokemon,cardNum) =>{
    const cards = pokemonCardContainer.querySelectorAll('#pokemon-card')
    const card = cards[cardNum]

    if(card.classList.contains('shiny-card')){ //Remove shiny class if it exists //TODO maybe fix this to be more efficient
        card.classList.remove('shiny-card')
    }
 
    try{
        const cardSpriteHolder = card.querySelector('#pokemon-sprite')
        const cardTitle = card.querySelector('#pokemon-name')
        const cardTypes = card.querySelector('#pokemon-types')
        // Display Pokémon sprite
        isShiny = Math.random() < shiny_chance
        if(isShiny){
        cardSpriteHolder.src = pokemon.sprites.front_shiny
        card.classList.add('shiny-card') 
        }
        else{
        cardSpriteHolder.src= pokemon.sprites.front_default
        }
        //Display Pokémon name
        cardTitle.innerText = pokemon.name.replaceAll('-',' ').replace(/\b\w/g, l => l.toUpperCase())
       ;
        cardTypes.innerHTML = ""; // Clear previous types
        
        //Display Pokemon Types
        
        for (let data of pokemon.types){
            const typeCard = document.createElement('img');
            typeCard.classList.add('img-fluid','type-card')
            const url = data.type.url;
            const typeData = await getTypeData(url)
            const typeSprite = typeData.sprites['generation-viii']['brilliant-diamond-and-shining-pearl'].name_icon;
            typeCard.src = typeSprite;
            cardTypes.appendChild(typeCard);

        };
    }
    catch(error){
        console.log(`Error updating pokemon card ${error}`)
    }
};

const populateDropdown = async () => {
    const dropdown = document.querySelector('#search-box');
    const names = await getPokemonDropdownData();
    names.forEach(name=>{
        const option = document.createElement('option');
        option.classList.add()
        option.value = name;
        option.textContent =  name.replaceAll('-',' ').replace(/\b\w/g, l => l.toUpperCase());
        dropdown.appendChild(option);
    })

}

const showVersusText = () => {
    const versusText = document.createElement('h2')
    versusText.innerText = "VERSUS"
    versusText.setAttribute('id','versus-text')
    versusText.classList.add('col-4','text-center','align-content-center','md-4')
    pokemonCardContainer.appendChild(versusText)
}

const showResultText = (result) => {
    const resultCard = document.querySelector('#result')
    const resultText = resultCard.querySelector('#result-text')
    if(resultCard.classList.contains('invisible')){
        resultCard.classList.remove('invisible')
    }
    if(result==-1){
        resultText.textContent = "Pokémon not in the pokédex!"
        resultText.style.color="darkorange"
    }
    

    else if(result>=2){
        const searchCard = document.querySelector('#search')
        searchCard.classList.add('invisible')
        const restart = document.querySelector('#restart')
        restart.classList.remove('invisible')
        resultText.style.color="green"
        resultText.innerText = `Super Effective! You Win!`
    }
    
    else if(result==0){
        resultText.style.color="red"
        resultText.innerText = `No Effect! Try again!`
    }
    else if(result==1){
        resultText.style.color="darksalmon"
        resultText.innerText = `Normal Effect! Try again!`
    }
    else{
        resultText.style.color="rgb(100,100,124)"
        resultText.innerText = `Not Very Effective! Try again!`
    }

}

const resetScreen = () => {
    pokemonCardContainer.innerHTML = ""
    const resultCard = document.querySelector('#result')
    if(!resultCard.classList.contains('invisible')){
        resultCard.classList.add('invisible')
    }
    const searchCard = document.querySelector('#search')
    if(searchCard.classList.contains('invisible')){
        searchCard.classList.remove('invisible')
    }
    const restart = document.querySelector('#restart')
    if(!restart.classList.contains('invisible')){
        restart.classList.add('invisible')
    }
}

