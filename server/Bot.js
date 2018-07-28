//Factory method
module.exports = class Bot {
    create(message) {
        console.log(message);
        let answerMessage;
        if (isQuotes(message)) {
            answerMessage = new Quotes();
            console.log('Im quote');
        }
        else if (isNote(message)) {
            answerMessage = new Note();

        }
        else if (isMoneyExchange(message)) {
            answerMessage = new MoneyExchange(message);

        } else if (isWeather(message)) {
            answerMessage = new Weather();

        } else if (isAdvise(message)) {
            answerMessage = new Advise();
            console.log('Im advise')
        }else{
                console.log('Im note creator')
        };
        console.log(answerMessage);
        return answerMessage;

    }
    };

// curry function formMessage
function formMessage(quote) {
    return (autor) => {
            return quote+" "+autor;
    };
}

class Quotes {
    constructor() {
        const quotesDB =require('./quotesStore');
        const randomNum =getRandomInt(0,quotesDB.length);
        this.message =formMessage(quotesDB[randomNum].quote)(quotesDB[randomNum].author);
    }
}

class Advise {
    constructor() {
        const adviseDB =require('./adviseStore');
        const randomNum =getRandomInt(0,adviseDB.length);
        this.message = adviseDB[randomNum].advise;
    }
}

class MoneyExchange {
    constructor(message) {
        const MoneyExchangerStore = require('./MoneyExchangerStore');

        console.log('MoneyExchange');
        [keyword, value, from, word, to] = message.split(" ");
        this.value =value;
        this.basicValute=from;
        this.defeninionValute = to;
        this.message='';

        const index = MoneyExchangerStore.findIndex(i => i.sell === this.basicValute && i.buy===this.defeninionValute);
        const newValue = this.calculateExchangedMoney(MoneyExchangerStore[index].value);
        this.formMessage(newValue);
        console.log(this.message);

    }

    calculateExchangedMoney(exchangeCourse){
         return this.value * exchangeCourse
    }

    formMessage(newValue){
        this.message=`${this.value} ${this.basicValute} = ${newValue} ${this.defeninionValute}`;
    }

}



class Weather {
    constructor() {
        console.log('Weather');
    }
}

class Note {
    constructor() {
        console.log('Note');
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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}