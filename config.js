const NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
const DEGREES = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii']
const MAJOR_CHORD = [0, 4, 7]
const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11]
const TONE_CHORDS = ['7M', 'm7', 'm7', '7M', '7', 'm7', 'm7b5']
const majorDiagrams = {
  E: [[0, 2, 2, 1, 0, 0]],
  A: [[null, 0, 2, 2, 2, 0]],
  G: [[3, 2, 0, 0, 3, 3]],
  C: [[null, 3, 2, 0, 1, 0]],
  D: [[null, null, 0, 2, 3, 2]],
}

const minorDiagrams = {
  // Em
  E: [[0, 2, 2, 0, 0, 0]],
  // Am
  A: [[null, 0, 2, 2, 1, 0]],
  // Dm
  D: [[null, null, 0, 2, 3, 1]],
}
const seventhDiagrams = {
  E: [
    [0, 2, 0, 1, 0, 0],
    // [0, 2, 2, 1, 3, 0],
    // [0, 2, 0, 1, 3, 0],
  ],
  A: [
    [null, 0, 2, 0, 2, 0],
    // [null, 0, 2, 2, 2, 3],
    // [null, 0, 2, 0, 2, 3],
  ],
  G: [[3, 2, 0, 0, 0, 1]],
  C: [[null, 3, 2, 3, 1, null]],
  D: [[null, null, 0, 2, 1, 2]],
}
const seventhMajorDiagrams = {
  // E7M
  E: [[0, null, 1, 1, 0, null]],
  // A7M
  A: [[null, 0, 2, 1, 2, 0]],
  // C7M
  C: [[null, 3, 2, 0, 0, 0]],
  // D7M
  D: [[null, null, 0, 2, 2, 2]],
}
const minorSeventhDiagrams = {
  // Em7
  E: [
    [0, 2, 0, 0, 0, 0],
    [0, 2, 2, 0, 3, 0],
    [0, 2, 0, 0, 3, 0],
  ],
  // Am7
  A: [
    [null, 0, 2, 0, 1, 0],
    [null, 0, 2, 2, 1, 3],
    [null, 0, 2, 0, 1, 3],
  ],
  // Dm7
  D: [[null, null, 0, 2, 1, 1]],
}
const minorSeventhFlatFifthDiagrams = {
  A: [[null, 0, 1, 0, 1, null]],
  F: [[1, null, 1, 1, 0, null]],
}
const diminishedDiagrams = {
  'A#': [[null, 1, 2, 0, 2, null]],
  F: [[1, null, 0, 1, 0, null]],
}

const DIAGRAMS = {
  major: majorDiagrams,
  minor: minorDiagrams,
  '7M': seventhMajorDiagrams,
  m7: minorSeventhDiagrams,
  '7': seventhDiagrams,
  m7b5: minorSeventhFlatFifthDiagrams,
  dim: diminishedDiagrams,
}


module.exports = {
  NOTES,
  DEGREES,
  MAJOR_CHORD,
  MAJOR_SCALE,
  TONE_CHORDS,
  DIAGRAMS,
}