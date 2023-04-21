const { SlashCommandBuilder } = require('discord.js');
const { Hangman } = require('discord-gamecord');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('hangman')
    .setDescription('Play a game of hangman'),

    async execute(interaction){
        const Game = new Hangman({
            message: interaction,
            embed: {
                title: 'Hangman',
                color: '#5865f2'
            },
            hangman: { hat: "🎩", head: "😊", shirt: "👕", pants: "👖", boots: "👟👟" },
            timeoutTime: 60000,
            timeWords: "all",
            winMessage: "Congrats <3, the word was **{word}**",
            loseMessage: "You lost :( , the word was **{word}**",
            playerOnlyMessage: "Only {player} can use the buttons",
        })
        Game.startGame();
        Game.on('gameOver', result => {
            return;
        })
    }
}