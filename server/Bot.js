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
            answerMessage = new Note(message);

        }
        else if (isMoneyExchange(message)) {
            answerMessage = new MoneyExchange(message);

        } else if (isWeather(message)) {
            answerMessage = new Weather();

        } else if (isAdvise(message)) {
            answerMessage = new Advise();
            console.log('Im advise')
        }else{
                answerMessage = new UnknownCommand();
        }
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
    constructor(message) {
        const [command, note, list] = message.split(" ");
        if(command==='Show'&& list==='list'){
            this.showNotes();
            this.message='Showing list';
        } else if(command==='Show'){
            this.message='Showing one note';
        }else if(command==='Save'){
            const note= this.saveNoteParser(message);
            if(note.title){
            this.saveNote(note);
            this.formSaveMessage(note);
            }else{
                this.message="Помилка! Для позначення заголовку та тексту записки використовуйте такі лапки: \"\"";
            }
        }else if(command==='Delete') {
            this.message = 'Deleting one note';
        }
        console.log(this.message);
    }

    saveNoteParser(message){
        // const note={};
        const [comant, title, text, body] = message.split('\"');
        const note= {
            "title": title,
            "text": body
        };
        console.log(note);
        return note;

    }
    saveNote(note){
        const noteStorage = require('./NotesStorage');
        noteStorage.saveNote(note);
        console.log(noteStorage);
    }
    formSaveMessage(note){
        this.message=`Записту з заголовком "${note.title}" збережено`;
    }
    showNotes(){
        const noteStorage = require('./NotesStorage').array;
        console.log(noteStorage);
    }
}

class UnknownCommand{
    constructor(){
        this.message="Вибач, розробник не передбачив можливість розуміти" +
            " вашу дивну мову, пиши, будь ласка, заздалегіть визначені команди";
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