const prompt = require('prompt')
const { makeToneChords, NOTES, DEGREES } = require('./config')
const { makeChordDiagram, majorDiagrams, minorDiagrams } = require('./chordDiagrams')
console.log(NOTES)

// console.log(minorDiagrams)

// majorDiagrams.map(d => makeChordDiagram(d))
// minorDiagrams.map(d => makeChordDiagram(d))

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
  chords.map((chordInfo, index) => {
    const [chord, chordType, chordNotes] = chordInfo
    console.log(`${DEGREES[index]} ${chord + chordType} :`, ...chordNotes)
  })
})

function onErr(err) {
    console.log(err)
    return 1
}