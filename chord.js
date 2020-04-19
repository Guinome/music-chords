const { NOTES, MAJOR_CHORD, MAJOR_SCALE, TONE_CHORDS } = require('./config')

const chords = {
  major: [...MAJOR_CHORD],
  minor: (chord = [...MAJOR_CHORD]) => !!(chord[1] = 3) && chord,
  fifthFlat: (chord = [...MAJOR_CHORD]) => !!(chord[2] = 6) && chord,
  seventh: (chord = [...MAJOR_CHORD]) => !!(chord[3] = 10) && chord,
  majorSeventh: (chord = [...MAJOR_CHORD]) => !!(chord[3] = 11) && chord,
  diminished: [0, 3, 6, 9],
}
const readableChords = {
  '7M': chords.majorSeventh(),
  'm7': chords.seventh(chords.minor()),
  '7': chords.seventh(),
  'm7b5': chords.fifthFlat(chords.seventh(chords.minor())),
  'dim': chords.diminished,
}

function makeChord(ref = 0, chord = []) {
  return chord.map(note => NOTES[(note + ref) % 12])
}

function makeToneChords(ref) {
  if (!NOTES.includes(ref)) {
    throw new Error('This is not a valid note, where are you from 🤔 ?')
  }
  const refIndex = NOTES.indexOf(ref)
  return MAJOR_SCALE.map((chordBase, degree) => {
    const chordIndex = (chordBase + refIndex) % 12
    const chord = NOTES[chordIndex]
    const chordType = TONE_CHORDS[degree]
    return [[chord], [chordType], makeChord(chordIndex, readableChords[chordType])]
  })
}

module.exports = {
  makeChord,
  makeToneChords,
}