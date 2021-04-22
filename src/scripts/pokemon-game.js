// TODO: make guesses not case sensitive
// TODO: see if there is a better list of names in the API - Mr. Mime Jr is a good example as it comes up mime-jr

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
        $('.pokemon-game button.new-pokemon').removeClass('hide');
        $('.pokemon-game p.current-streak').removeClass('hide');
    });

    $('.pokemon-game form').on('submit', function(e) {
        e.preventDefault();
        pokemonGame.checkGuess();
        this.reset();
    });

    $('.pokemon-game button#newPokemon').on('click', function () {
        pokemonGame.getNewPokemon(pokemonGame.totalPokemonCount);
        $('.pokemon-game h3.name').text('');
        $('.pokemon-game button.submit').removeClass('hide');
    });
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
    let guess = $('.pokemon-game input#pokemon').val().toLowerCase();
    if (guess == pokemonGame.currentPokemon.name) {
        pokemonGame.currentStreak++
        $('.pokemon-game #pokemonSprite').removeClass('hidden');
        $('.pokemon-game button.submit').addClass('hide');
        $('.pokemon-game button.new-pokemon').removeClass('hide');
        $('.pokemon-game h3.name').text(pokemonGame.currentPokemon.name);
        $('.pokemon-game #streak').text(pokemonGame.currentStreak);
    } else {
        $('.pokemon-game h3.name').text('Try again');
        pokemonGame.currentStreak = 0;
        $('.pokemon-game #streak').text(pokemonGame.currentStreak);
    }
}
