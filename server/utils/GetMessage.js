module.exports = class GetMessage {
    constructor(message){
        console.log("Into class");
        console.log(message);
        this.message=message;
    }

    getMessage(){
       return this.message.text.slice(5, this.message.text.length);


    }
}