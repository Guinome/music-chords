const prompt = require('prompt')
const { makeToneChords, readableChords, NOTES, DEGREES } = require('./config')
const { makeChordTab, diagrams } = require('./chordDiagrams')
console.log(NOTES)

const properties = [
  {
    name: 'toneOrTab',
    type: 'string',
    description: 'Tone chords or chords tab ? (tone/chord)',
    before: (choice) => choice.toLowerCase(),
    conform: (choice) => !!['tone', 'chord'].includes(choice.toLowerCase()),
  },
  {
    name: 'tone',
    type: 'string',
    description: 'Chords of which tonality do you want ?',
    before: (note) => note.toUpperCase(),
    conform: (note) => !!NOTES.includes(note.toUpperCase()),
    ask: () => prompt.history('toneOrTab').value === 'tone',
  },
  {
    name: 'chord',
    type: 'string',
    description: `Choose a chord : ${NOTES.join(', ')} ?`,
    before: (note) => note.toUpperCase(),
    conform: (note) => !!NOTES.includes(note.toUpperCase()),
    ask: () => prompt.history('toneOrTab').value === 'chord',
  },
  {
    name: 'type',
    type: 'string',
    description: `Choose a chord type : ${Object.keys(diagrams).join(', ')} ?`,
    // before: (type) => type.toUpperCase(),
    conform: (type) => !!Object.keys(diagrams).includes(type),
    ask: () => prompt.history('toneOrTab').value === 'chord',
  }
]

prompt.start()


prompt.get(properties, function (err, result) {
  if (err) { return onErr(err) }
  /**
   *  Display tone chords
   */
  if (result.toneOrTab === 'tone') {
    const chords = makeToneChords(result.tone)
    console.log(`Here is the ${result.tone} tone chords :`)
    chords.map((chordInfo, index) => {
      const [chord, chordType, chordNotes] = chordInfo
      const degreeString = 
           (DEGREES[index].length === 1 && DEGREES[index] + '  ')
        || (DEGREES[index].length === 2 && DEGREES[index] + ' ')
        || DEGREES[index]
      const finalChord = chord + chordType
      const finalChordString =
           (finalChord.length === 1 && finalChord + '     ')
        || (finalChord.length === 2 && finalChord + '    ')
        || (finalChord.length === 3 && finalChord + '   ')
        || (finalChord.length === 4 && finalChord + '  ')
        || (finalChord.length === 5 && finalChord + ' ')
        || finalChord
      console.log(`${degreeString} ${finalChordString} :`, ...chordNotes)
    })
  }
  /**
   *  Display chord tabs
   */
  if (result.toneOrTab === 'chord') {
    const tabs = diagrams[result.type] || diagrams[result.type.toString()]
    const keys = Object.keys(tabs)
    const chords = keys.map(key => {
      const differences = [
        NOTES.indexOf(result.chord) - NOTES.indexOf(key),
        12 - NOTES.indexOf(key) - NOTES.indexOf(result.chord),
      ]
      return tabs[key].map(chord => {
        const diff = (
          Math.min(...chord) + differences[0] >= 0
          && Math.max(...chord) + differences[0] <= 12
        ) ? differences[0] : differences[1]
        return chord.map(string => {
          if (string === null) return string
          return string + diff
        }).reduce((acc, val) => acc.concat(val), []) // Since .flat is not working -.-
      }).reduce((acc, val) => acc.concat(val), []) // Since .flat is not working -.-
    })
    console.log(`Here is ${result.type} tabs`)
    console.log(makeChordTab(chords))
  }
  
})

function onErr(err) {
    console.log(err)
    return 1
}