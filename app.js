const chalk = require('chalk');
const yargs = require('yargs');
const { readNote } = require('./notes.js');
// (OLD) const getNotes = require('./notes.js');

// For import more than one Function :
const notes = require('./notes.js');

// Using yargs package for handling input arguments
// Customize version with yargs
yargs.version('1.2.1'); // 1.2.1 is an example

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a note', // Create a description for command
  builder: {
    // Options go here, like --title and --body
    title: {
      describe: 'Note title', // Create a description for title
      demandOption: true, // Make the title required
      type: 'string', // force the title to be a string
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    // Handler function for using inputed command and option (title and body)
    notes.addNote(argv.title, argv.body); // Calling addNote function (in notes.js)
  },
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// Create list command
yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler() {
    notes.listNotes();
  },
});

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

// Call the yargs.argv or yargs.parse(), it must be in the end of yargs.command s.
yargs.parse();
