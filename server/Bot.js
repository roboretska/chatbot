class NoteStorageClass {
    constructor() {
        this.NoteStorage = []
    }

    getAll() {
        return this.NoteStorage;
    }

    saveNote(note) {
        this.NoteStorage.push(note)
    }

    getNote(title) {
        const [note] = this.NoteStorage.filter(item => item.title === title);
        return note;
    }

    deleteNote(title) {
        this.NoteStorage = this.NoteStorage.filter(item => item.title !== title);
        console.log(NoteStorage);
        return true;
    }
}

const NoteStorage = new NoteStorageClass;


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
            answerMessage = new Weather(message);

        } else if (isAdvise(message)) {
            answerMessage = new Advise();
            console.log('Im advise')
        } else {
            answerMessage = new UnknownCommand();
        }
        return answerMessage;

    }
};

// curry function formMessage
function formMessage(quote) {
    return (autor) => {
        return quote + " " + autor;
    };
}

class Quotes {
    constructor() {
        const quotesDB = require('./quotesStore');
        const randomNum = getRandomInt(0, quotesDB.length);
        this.message = formMessage(quotesDB[randomNum].quote)(quotesDB[randomNum].author);
    }
}

class Advise {
    constructor() {
        const adviseDB = require('./storages/adviseStore');
        const randomNum = getRandomInt(0, adviseDB.length);
        this.message = adviseDB[randomNum].advise;
    }
}

class MoneyExchange {
    constructor(message) {
        const MoneyExchangerStore = require('./storages/MoneyExchangerStore');

        console.log('MoneyExchange');
        [keyword, value, from, word, to] = message.split(" ");
        this.value = value;
        this.basicValute = from;
        this.defeninionValute = to;
        this.message = '';

        const index = MoneyExchangerStore.findIndex(i => i.sell === this.basicValute && i.buy === this.defeninionValute);
        const newValue = this.calculateExchangedMoney(MoneyExchangerStore[index].value);
        this.formMessage(newValue);
        console.log(this.message);

    }

    calculateExchangedMoney(exchangeCourse) {
        return this.value * exchangeCourse
    }

    formMessage(newValue) {
        this.message = `${this.value} ${this.basicValute} = ${newValue} ${this.defeninionValute}`;
    }

}


class Weather {
    constructor(message) {

        const city = this.getCity(message);
        if (city === "err") {
            this.errorMessage();
            return
        }
        const day = this.getDay(message);
        if (day === "err") {
            this.errorMessage();
            return
        }
        const cityForecast = this.findCityForecast(city);
        const temperature = this.findDayForecast(cityForecast, day);
        this.formMessage(city, day, temperature);
    }


    findDayForecast(cityForecast, day) {
        return cityForecast.forecast[day];

    }

    findCityForecast(city) {
        const WeatherStore = require('./storages/WeatherStore');
        const [result] = WeatherStore.filter(item => item.city === city);
        return result;
    }

    getCity(message) {
        if (message.search(/Lviv/i) + 1) {
            return "Lviv";
        } else if (message.search(/Kyiv/i) + 1) {
            return "Kyiv";
        } else if (message.search(/Kharkiv/i) + 1) {
            return "Kharkiv";
        } else if (message.search(/Odessa/i) + 1) {
            return "Odessa";
        } else if (message.search(/Dnipro/i) + 1) {
            return "Dnipro";
        } else return "err"
    }

    getDay(message) {

        if (message.search(/today/i) + 1) {
            return "Today";
        } else if (message.search(/tomorrow/i) + 1) {
            return "Tomorrow";
        } else if (message.search(/on Monday/i) + 1) {
            return "Monday";
        } else if (message.search(/on Tuesday/i) + 1) {
            return "Tuesday";
        } else if (message.search(/on Wednesday/i) + 1) {
            return "Wednesday";
        } else if (message.search(/on Thursday/i) + 1) {
            return "Thursday";
        } else if (message.search(/on Friday/i) + 1) {
            return "Friday";
        } else if (message.search(/on Saturday/i) + 1) {
            return "Saturday";
        } else if (message.search(/on Sunday/i) + 1) {
            return "Sunday";
        } else return "err"

    }

    formMessage(city, day, temperature) {
        let dayText;

        if (day === "Monday") {
            dayText = "On monday";
        } else if (day === "Tuesday") {
            dayText = "On tuesday";
        } else if (day === "Wednesday") {
            dayText = "On wednesday";
        } else if (day === "Thursday") {
            dayText = "On thursday";
        } else if (day === "Friday") {
            dayText = "Friday";
        } else if (day === "Saturday") {
            dayText = "Saturday";
        } else if (day === "Sunday") {
            dayText = "Sunday";
        } else dayText = day;

        this.message = `${dayText} in ${city} expext ${temperature}&#176C`;
    }

    errorMessage() {
        this.message = "Unexpected value. Please, enter correct data."
    }
}

class Note {
    constructor(message) {
        const [command, note, list] = message.split(" ");
        if (command === 'Show' && list === 'list') {
            const notes = this.showNotes();
            if (notes.length > 0) {
                this.formListMessage(notes);
            } else {
                this.message = "Seems like you haven't notes yet"
            }
        } else if (command === 'Show') {
            const title = this.noteParser(message);
            this.showNote(title);
        } else if (command === 'Save') {
            const note = this.saveNoteParser(message);
            if (note.title) {
                this.saveNote(note);
                this.formSaveMessage(note);
            } else {
                this.message = this.errorMessage();
            }
        } else if (command === 'Delete') {
            const title = this.noteParser(message);
            if (title) {
                this.deleteNote(title);
            }
        }
        console.log("End off class");
        console.log(this.message);
    }

    saveNoteParser(message) {
        // const note={};
        const [comant, title, text, body] = message.split('\"');
        const note = {
            "title": title,
            "text": body
        };
        console.log(note);
        return note;

    }

    saveNote(note) {
        const noteStorage = NoteStorage.saveNote(note);
    }

    formSaveMessage(note) {
        this.message = `Записту з заголовком "${note.title}" збережено`;
    }

    showNotes() {
        const noteStorage = NoteStorage.getAll();
        let stringArray;
        if (noteStorage.length === 0) {
            console.log('Im empty');
            stringArray = noteStorage;
        } else {
            stringArray = noteStorage.map(item =>
                `Title: "${item.title}",  Text: "${item.text}"`
            );
        }
        return stringArray;
    }

    formListMessage(list) {
        let message = list[0];
        for (let i = 1; i < list.length; i++) {
            message = message + "    |||    " + list[i];
        }
        console.log(message);
        this.message = message;
    }

    showNote(title) {
        const note = NoteStorage.getNote(title);
        if (!note) {
            this.message = "Note with this title doesn't exist"
        }else {
            this.message = `Title: "${note.title}",   Text: "${note.text}"`
        }
    }

    deleteNote(title) {
        const note = NoteStorage.deleteNote(title);
        this.message = `Note with title "${title}" has been deleted`
    }

    noteParser(message) {
        const [comant, title] = message.split('\"');
        return title;

    }

    errorMessage() {
        return "Помилка! Для позначення заголовку та тексту записки використовуйте такі лапки: \"\"";
    }


}


class UnknownCommand {
    constructor() {
        this.message = "Вибач, розробник не передбачив можливість розуміти" +
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
    if (message.search(/weather/i) === -1) {
        return false
    } else {
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