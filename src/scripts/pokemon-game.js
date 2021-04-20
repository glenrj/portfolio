$(document).ready(function () {
    pokemonGame.init();
});

const pokemonGame = {
    totalPokemonCount: 898,
    currentStreak: 0,
    currentPokemon: {
        name: "",
        guessed: false
    }
}

pokemonGame.init = () => {
    $('.pokemon-game button.start-game').on('click', function() {
        pokemonGame.getNewPokemon(pokemonGame.totalPokemonCount);
        $(this).addClass('hide');
        $('.pokemon-game button.submit').removeClass('hide');
    })

    $('.pokemon-game form').on('submit', function(e) {
        e.preventDefault();
        pokemonGame.checkGuess();
    })
}

pokemonGame.setNewPokemon = (name, number, image) => {
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

pokemonGame.checkGuess = () => {
    let guess = $('.pokemon-game input#pokemon').val();
    console.log(`guess: ${guess}`);
    if (guess == pokemonGame.currentPokemon.name) {
        console.log("win!");
        pokemonGame.currentStreak++
        $('.pokemon-game #pokemonSprite').removeClass('hidden');
        $('.pokemon-game h3.name').text(pokemonGame.currentPokemon.name);
        $('.pokemon-game #streak').text(pokemonGame.currentStreak);
        $('.pokemon-game .right-column').append('<button id="newPokemon">New Pokémon</button>');
        pokemonGame.newPokemonSubmitHandler();
    } else {
        console.log("fail!");
        //to do: fail state
    }
}

pokemonGame.newPokemonSubmitHandler = () => {
    $('.pokemon-game button#newPokemon').on('click', function() {
        $(this).remove();
        pokemonGame.getNewPokemon(pokemonGame.totalPokemonCount);
        //todo: form and button reset
    });
}
