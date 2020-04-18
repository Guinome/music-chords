const prompt = require('prompt')
const { makeToneChords, NOTES, DEGREES } = require('./config')
console.log(NOTES)

const properties = [
  {
    name: 'tone',
    type: 'string',
    description: 'Chords of which tonality do you want ?',
    before: (note) => note.toUpperCase(),
    conform: (note) => !!NOTES.includes(note.toUpperCase()),
  }
]

prompt.start()

prompt.get(properties, function (err, result) {
  if (err) { return onErr(err) }
  const chords = makeToneChords(result.tone)
  console.log(`Here is the ${result.tone} tone chords :`)
  chords.map((chord, index) => {
    const [[chordName, chordNotes]] = Object.entries(chord)
    console.log(`${DEGREES[index]} ${chordName} :`, ...chordNotes)
  })
})

function onErr(err) {
    console.log(err)
    return 1
}