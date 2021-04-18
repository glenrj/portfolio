$(document).ready(function () {
    pokemonGame.init();
});

const pokemonGame = {
    totalPokemonCount: 898,
    prevPokemon: [
        { 
            name: "Sample Pokemon",
            number: 123,
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png"
        },
        {
            name: "Sample Pokemon",
            number: 123,
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png"
        }
    ],
    currentPokemon: {
        name: "Umbreon",
        number: 197,
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png",
        status: "hidden"
    }
}

pokemonGame.init = () => {
    pokemonGame.getNewPokemon(pokemonGame.totalPokemonCount);
}

pokemonGame.setNewPokemon = (name, number, image) => {
    pokemonGame.prevPokemon.push(pokemonGame.currentPokemon);
    if (pokemonGame.prevPokemon.length > 10) {
        delete pokemonGame.prevPokemon[10];
    }
    pokemonGame.currentPokemon.name = name;
    pokemonGame.currentPokemon.number = number;
    pokemonGame.currentPokemon.image = image;

    console.log(`new pokémon is: ${pokemonGame.currentPokemon.name}`);

    pokemonGame.updateImage(pokemonGame.currentPokemon.image);
}

pokemonGame.updateImage = (newImage) => {
    let pokemonSprite = $("#pokemonSprite");
    if (!pokemonSprite.hasClass("hidden")) {
        pokemonSprite.addClass("hidden");
    }
    $(pokemonSprite).attr("src", newImage);
}

pokemonGame.getNewPokemon = function (total) {
    let newPokemonNum = Math.floor(Math.random() * total) + 1;

    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${newPokemonNum}`,
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            let newPokemon = {
                name: result.name,
                number: result.id,
                image: result.sprites.other["official-artwork"].front_default
            }
            pokemonGame.setNewPokemon(newPokemon.name, newPokemon.number, newPokemon.image);
        },
        error: function (error) {
            console.log(error);
        }
    })
}
