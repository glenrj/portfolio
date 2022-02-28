$(document).ready(function () {
    pokemonGame.init();
});

const pokemonGame = {
    totalPokemonCount: 151,
    currentStreak: 0,
    currentPokemon: {
        name: "",
        guessed: false
    },

    init: () => {
        $('.pokemon-game button.start-game').on('click', function() {
            pokemonGame.getNewPokemon(pokemonGame.totalPokemonCount);
            $(this).addClass('hide');
            $('.pokemon-game button.submit').removeClass('hide');
            $('.pokemon-game button.reveal').removeClass('hide');
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
            $('.pokemon-game button.reveal').removeClass('hide');
            $('.pokemon-game button.submit').removeClass('hide');
        });

        $('.pokemon-game button#reveal').on('click', function () {
            pokemonGame.revealPokemon();
        });
    },

    setNewPokemon: (name, number, image) => {
        pokemonGame.currentPokemon.name = name;
        pokemonGame.currentPokemon.number = number;
        pokemonGame.currentPokemon.image = image;
        pokemonGame.updateImage(pokemonGame.currentPokemon.image);
    },

    updateImage: (newImage) => {
        let pokemonSprite = $("#pokemonSprite");
        if (!pokemonSprite.hasClass("hidden")) {
            pokemonSprite.addClass("hidden");
        }
        $(pokemonSprite).attr("src", newImage);
    },

    getNewPokemon: function (total) {
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
                newPokemon.formattedName = pokemonGame.checkName(newPokemon.name);
                pokemonGame.setNewPokemon(newPokemon.formattedName, newPokemon.number, newPokemon.image);
            },
            error: function (error) {
                console.log(error);
            }
        })
    },

    checkGuess: () => {
        let guess = $('.pokemon-game input#pokemon').val().toLowerCase();
        if (guess == pokemonGame.currentPokemon.name) {
            pokemonGame.currentStreak++
            $('.pokemon-game #pokemonSprite').removeClass('hidden');
            $('.pokemon-game button.submit').addClass('hide');
            $('.pokemon-game button.new-pokemon').removeClass('hide');
            $('.pokemon-game h3.name').text(pokemonGame.currentPokemon.name);
            $('.pokemon-game #streak').text(pokemonGame.currentStreak);
            $('.pokemon-game button.reveal').addClass('hide');
        } else {
            $('.pokemon-game h3.name').text('Try again');
            pokemonGame.currentStreak = 0;
            $('.pokemon-game #streak').text(pokemonGame.currentStreak);
        }
    },

    revealPokemon: () => {
        $('.pokemon-game button.reveal').addClass('hide');
        $("#pokemonSprite").removeClass("hidden");
        $('.pokemon-game h3.name').text(pokemonGame.currentPokemon.name);
        pokemonGame.currentStreak = 0;
        $('.pokemon-game #streak').text(pokemonGame.currentStreak);
    },

    checkName: (name) => {
        // fixes for specific pokemon names that aren't in the predicted formal in the API
        if (name == 'nidoran-f') {
            return 'Nidoran';
        } else if (name == 'nidoran-m') {
            return 'Nidoran';
        } else if (name == 'farfetchd') {
            return "Farfetch'd";
        } else if (name == 'mr-mime') {
            return 'Mr. Mime';
        } else if (name == 'mime-jr') {
            return 'Mr. Mime Jr';
        } else {
            return name;
        }
    }
}

