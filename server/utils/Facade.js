const isAddressedBot = require('../bot/BotValidation');
const GetMessage = require('./GetMessage');
const Bot = require('../bot/Bot');


module.exports = class Facade {
    constructor(message) {
        this.message = message;
    }

    getMessage() {
        let answer;
        if (new isAddressedBot(this.message).containKeyword()) {
            console.log('BOT WORKING');
            const bot = new Bot();
            answer = bot.create(new GetMessage(this.message).getMessage());
            console.log(this.formMessage(answer.message));
            return this.formMessage(answer.message);

        }
    }

    formMessage(answer) {
        return {
            name: 'bot',
            nick: 'bot',
            time: `${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getDay()}.${new Date().getMonth()}.${new Date().getFullYear()}`,
            text: answer
        }
    }


};