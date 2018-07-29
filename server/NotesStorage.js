const NoteStorage = [
    {
        title: 'Hi’',
        text: 'Some blablabla'
    },
    {
        title: 'Test’',
        text: 'Another blablablah'
    }
];

function saveNote(note) {
    NoteStorage.push(note)
}

module.exports.array = NoteStorage;
module.exports.saveNote = saveNote;