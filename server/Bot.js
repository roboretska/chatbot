//Factory method
module.exports = class Bot {
    create(message) {
        console.log(message);
        let answerMessage;
        if (isQuotes(message)) {
            answerMessage = new Quotes();
            console.log('Im quote');
        } else if (isAdvise(message)) {
            answerMessage = new Advise();
            console.log('Im advise')

        }
        else if (isMoneyExchange(message)) {
            console.log('Im money exchanger')

        } else if (isWeather(message)) {
            console.log('Im forecast')

        } else if (isNote(message)) {
            console.log('Im note creator')

        }
        return answerMessage;
    }
}


class Quotes {
    constructor() {
        console.log('Quotes');
    }
}

class Advise {
    constructor() {
        console.log('Advise');
    }
}

function isQuotes(message) {
    const [show, quote] = message.split(' ');
    return (show === "show" && quote === "quote")
}

function isAdvise(message) {
    return (message.slice(-9) === "? #@)₴?$0")
}

function isMoneyExchange(message) {
    [keyword, value, from, word, to] = message.split(" ");
    return keyword === "Convert" || keyword === "convert"
    // console.log(value)
    // console.log(from)
    // console.log(to)

}

function isWeather(message) {
    if(message.search(/weather/i)=== -1) {
        return false
    }else {
        return true
    }


}

function isNote(message) {
    [method, keyword, ...other] = message.split(" ");
    return keyword === "Note" || keyword === "note"

}