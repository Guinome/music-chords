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
	C: [[null, 3, 2, 3, 1, 0]],
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
]

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
		diagram[0] += fret[0] + separator
		diagram[1] += fret[1] + separator
		diagram[2] += fret[2] + separator
		diagram[3] += fret[3] + separator
		diagram[4] += fret[4] + separator
		diagram[5] += fret[5] + separator
	}
	return diagram.join('\n') + '\n'
}

function formatChord(chord) {
	return chord.map(string => {
		if (string === null) return '-x--'
		if (string < 10) return `-${string}--`
		return `-${string}-`
	})
}

function makeChordTab(chords) {
	const formatedChords = chords.map(chord => formatChord(chord))
	const tab = formatedChords.reduce((currentChords, nextChord) => {
		return currentChords.map((curr,i) => curr + nextChord[i])
	}, new Array(6).fill(''))
	return template.map((string, stringNumber) => {
		return string + (tab[tab.length - stringNumber - 1] !== null
					? tab[tab.length - stringNumber - 1] : 'x')
	}).join('\n')
}

module.exports = {
	makeChordDiagram,
	makeChordTab,
	diagrams,
}