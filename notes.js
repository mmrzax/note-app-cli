const fs = require('fs');
const chalk = require('chalk');

// This function for loading the notes from the notes.json file
const loadNotes = () => {
  try {
    // Try reading Buffer data from notes.json file and return parsed data (array)
    const dataBuffer = fs.readFileSync('./notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    // if notes.json doesn't exist, return an empty array
    return [];
  }
};

// This function takes an array (notes) then write's it to the notes.json
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes); // Convert the notes to json
  fs.writeFileSync('./notes.json', dataJSON); // Write the Converted data to notes.json
};

/* This function takes and title and body (from add command in app.js)
if title wasn't taken, save the new note that is title and body as ket-value
in an object and push it to notes array and finally save this array to
notes.json using saveNotes()*/
const addNote = (title, body) => {
  const notes = loadNotes(); // Loading the old notes in the notes.json using loadNotes()
  // Checking for duplicate title
  // if true, saves the title in duplicate array
  // const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({
      // push the new title and body(in the new object) to the notes array
      title: title,
      body: body,
    });
    saveNotes(notes); // Save the notes in the notes.json using saveNotes()
    console.log(chalk.bgGreen.black('New note added!')); // Log Success
  } else {
    console.log(chalk.bgRed.black('Note title taken!')); // Log Failure
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const rmIndex = notes.findIndex((note) => note.title === title);
  if (rmIndex !== -1) {
    notes.splice(rmIndex, 1);
    saveNotes(notes);
    console.log(chalk.bgGreen.black('Note removed!'));
  } else {
    console.log(chalk.bgRed.black('No note found!'));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.white.inverse.bold('Your Notes'));
  if (notes.length === 0) {
    console.log(chalk.red.inverse.bold('No note found!'));
  }
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const findNote = notes.find((note) => note.title === title);
  if (findNote) {
    console.log(chalk.yellow.inverse.bold(findNote.title), '=>>' , findNote.body);
  } else {
    console.log(chalk.red.inverse.bold('No note found'));
  }
};

// (OLD) module.exports = getNotes;
// For export more than one function :
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
