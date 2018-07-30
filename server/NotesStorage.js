let NoteStorage = [
    {
        title: 'Hi',
        text: 'Some blablabla'
    },
    {
        title: 'Test',
        text: 'Another blablablah'
    }
];

function saveNote(note) {
    NoteStorage.push(note)
}

function getNote(title){
     const [note] = NoteStorage.filter(item => item.title===title);
    return note;
}

function deleteNote(title){
    NoteStorage = NoteStorage.filter(item => item.title!==title);
    console.log(NoteStorage);
    return true;
}

module.exports.array = NoteStorage;
module.exports.saveNote = saveNote;
module.exports.getNote = getNote;
module.exports.deleteNote = deleteNote;