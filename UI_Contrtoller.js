const createPokemonCard = (pokemon)=>{
    //setup card
    const card = document.createElement('div');
    card.setAttribute('id','pokemon-card')
    card.classList.add('card','col-4')

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
    cardContainer.appendChild(card)
    updatePokemonCard(pokemon,cardContainer.querySelectorAll('#pokemon-card').length-1)

}

const updatePokemonCard = async (pokemon,cardNum) =>{
    const cards = cardContainer.querySelectorAll('#pokemon-card')
    const card = cards[cardNum] 
    try{
        
        const cardSpriteHolder = card.querySelector('#pokemon-sprite')
        const cardTitle = card.querySelector('#pokemon-name')
        const cardTypes = card.querySelector('#pokemon-types')
        // Display Pokémon sprite
        cardSpriteHolder.src = pokemon.sprites.front_default;
        //Display Pokémon name
        cardTitle.innerText = pokemon.name
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
    const dropdown = document.querySelector('#search-dropdown');
    const names = await getPokemonDropdownData();
    names.forEach(name=>{
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name[0].toUpperCase() + name.slice(1);
        dropdown.appendChild(option);
    })

}

const filterDropdown = () =>{
    const dropdown = document.querySelector('#search-dropdown');
    console.log('Filtering dropdown')
    const filter = searchBox.value.toLowerCase()
    console.log(`Filtering with ${filter}`)
    const options = dropdown.querySelectorAll('option')
    console.log(options)

    for(let option of options){
        console.log(`Checking ${option.value}`)
        const text = option.value
        if(text.includes(filter)){
            option.style.display = 'block'
        }
        else{
            console.log(`Hiding ${text}`)
            option.style.display = 'none'
        }
    }
}

const showVersusText = () => {
    const versusText = document.createElement('h2')
    versusText.innerText = "VERSUS"
    versusText.setAttribute('id','versus-text')
    versusText.classList.add('col-4', 'text-center','align-content-center','md-4')
    cardContainer.appendChild(versusText)
}

const showResultText = (result) => {
    const resultCard = document.querySelector('#result-card')
    const resultText = resultCard.querySelector('#result-text')
    if(resultCard.classList.contains('invisible')){
        resultCard.classList.remove('invisible')
    }
    if(result){
        const searchCard = document.querySelector('#search-card')
        searchCard.classList.add('invisible')
        const restart = document.querySelector('#restart')
        restart.classList.remove('invisible')
        resultText.style.color="green"
        resultText.innerText = "You Win!"
    }
    else{
        resultText.style.color="red"
        resultText.innerText = "Wrong Try Again!"
    }
}

const resetScreen = () => {
    cardContainer.innerHTML = ""
    const resultCard = document.querySelector('#result-card')
    if(!resultCard.classList.contains('invisible')){
        resultCard.classList.add('invisible')
    }
    const searchCard = document.querySelector('#search-card')
    if(searchCard.classList.contains('invisible')){
        searchCard.classList.remove('invisible')
    }
    const restart = document.querySelector('#restart')
    if(!restart.classList.contains('invisible')){
        restart.classList.add('invisible')
    }
}

const searchBox = document.querySelector('#search')
searchBox.addEventListener('input', filterDropdown);