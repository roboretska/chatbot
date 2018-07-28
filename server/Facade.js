const isAddressedBot = require('./BotValidation');
const GetMessage = require('./GetMessage');
const Bot = require('./Bot');



module.exports = class Facade{
    constructor(message){
        this.message = message;
    }

    getMessage(){
        let answer;
        if(new isAddressedBot( this.message).containKeyword()){
            const bot = new Bot();
            answer = bot.create(new GetMessage(this.message).getMessage());
            return answer;
        }
    }


}