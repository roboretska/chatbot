const isAddressedBot = require('./BotValidation');
const GetMessage = require('./GetMessage');
const Bot = require('./Bot');



module.exports = class Facade{
    constructor(message){
        this.message = message;
    }

    getMessage(){
        if(new isAddressedBot( this.message).containKeyword()){
            const bot = new Bot();
            bot.create(new GetMessage(this.message).getMessage());

        }
    }


}