const majorDiagrams = [
	[0, 2, 2, 1, 0, 0],
	[null, 0, 2, 2, 2, 0],
	[3, 2, 0, 0, 3, 3],
	[null, 3, 2, 0, 1, 0],
	[null, null, 0, 2, 3, 2],
]
const minorDiagrams = [
	// Em
	 !(majorDiagrams[0][3] = 0) && majorDiagrams[0],
	// Am
	!!(majorDiagrams[1][4] = 1) && majorDiagrams[1],
	// Dm
	!!(majorDiagrams[4][5] = 1) && majorDiagrams[4],
]
const seventhDiagrams = [
	// E7
	 !(majorDiagrams[0][2] = 0) && majorDiagrams[0],
	 !(majorDiagrams[0][4] = 3) && majorDiagrams[0],
	 !(majorDiagrams[0][2] = 0) && !(majorDiagrams[0][4] = 3) && majorDiagrams[0],
	// A7
	 !(majorDiagrams[1][3] = 0) && majorDiagrams[1],
	 !(majorDiagrams[1][5] = 3) && majorDiagrams[1],
	 !(majorDiagrams[1][3] = 0) && !(majorDiagrams[1][5] = 3) && majorDiagrams[1],
	// G7
	 !(majorDiagrams[2][4] = 0) && !(majorDiagrams[2][5] = 1) && majorDiagrams[2],
	// C7
	 !(majorDiagrams[3][3] = 3) && majorDiagrams[3],
	// D7
	 !(majorDiagrams[4][4] = 1) && majorDiagrams[4],
]
const seventhMajorDiagrams = [
	// E7M
	 !(majorDiagrams[0][1] = null) && !(majorDiagrams[0][2] = 1) && !(majorDiagrams[0][5] = null) && majorDiagrams[0],
	// A7M
	 !(majorDiagrams[1][3] = 1) && majorDiagrams[1],
	 !(majorDiagrams[1][5] = 4) && majorDiagrams[1],
	// C7M
	 !(majorDiagrams[3][4] = 0) && majorDiagrams[3],
	// D7M
	 !(majorDiagrams[4][4] = 2) && majorDiagrams[4],
]
const minorSeventhDiagrams = [
	// Em7
	 !(minorDiagrams[0][2] = 0) && minorDiagrams[0],
	 !(minorDiagrams[0][4] = 3) && minorDiagrams[0],
	 !(minorDiagrams[0][2] = 0) && !(minorDiagrams[0][4] = 3) && minorDiagrams[0],
	// Am7
	 !(minorDiagrams[1][3] = 0) && minorDiagrams[1],
	 !(minorDiagrams[1][5] = 3) && minorDiagrams[1],
	 !(minorDiagrams[1][3] = 0) && !(minorDiagrams[1][5] = 3) && minorDiagrams[1],
	// Dm7
	 !(minorDiagrams[2][4] = 1) && minorDiagrams[2],
]
const minorSeventhFlatFifthDiagrams = [
	[null, 0, 1, 0, 1, null],
]
const diminishedDiagrams = [
	[null, 1, 2, 0, 2, null],
]

const diagrams = {
	major: majorDiagrams,
	minor: minorDiagrams,
	'7M': seventhMajorDiagrams,
	m7: minorSeventhDiagrams,
	'7': seventhDiagrams,
	m7b5: minorSeventhFlatFifthDiagrams,
	dim: diminishedDiagrams,
}

const template = [
	'e ',
	'B ',
	'G ',
	'D ',
	'A ',
	'E ',
	// '  ',
]

// const fretTemplate = ['|', '|', '|', '|', '|', '|']

// const caseTemplate = ['-', '-', '-', '-', '-', '-']

function makeChordDiagram(chord) {
	console.log('chord', chord)
	const maxFret = Math.max(...chord)
	let diagram = [...template]
	const nut = ']'
	const fretSeparator = '|'
	for (var i = 0; i <= maxFret; i++) {

		const fret = chord.map(c => {
			if (i === 0) {
				return (c === null && 'x')
					|| (i === c && 'o')
					|| '|'
			}
			return c === i ? '-O-' : '---'
		}).reverse()
		fret.push(i ? ` ${i} ` : ' ')
		const separator = i > 0 ? fretSeparator : nut
		// console.log(separator)
		diagram[0] += fret[0] + separator
		diagram[1] += fret[1] + separator
		diagram[2] += fret[2] + separator
		diagram[3] += fret[3] + separator
		diagram[4] += fret[4] + separator
		diagram[5] += fret[5] + separator
		// diagram[6] += fret[6] + separator
	}
	// diagram.map(item => )
	return diagram.join('\n') + '\n'

}

function makeChordTab(chord) {
	return template.map((string, stringNumber) => {
		return string + (chord[chord.length - stringNumber - 1] !== null
					? chord[chord.length - stringNumber - 1] : 'x')
	}).join('\n')
	// console.log(chordTab)
	// chordTab.push(' ')
	// console.log(chordTab.join('\n'))
}

module.exports = {
	makeChordDiagram,
	makeChordTab,
	diagrams,
}