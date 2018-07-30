module.exports = class isAddressedBot {
    constructor(message){
        this.message=message;
    }

    containKeyword(){
        return this.message.text.slice(0, 5)==="@bot "

    }
}