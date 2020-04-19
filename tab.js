const template = [
	'e ',
	'B ',
	'G ',
	'D ',
	'A ',
	'E ',
]

/**
 *	Still in WIP, dead code for now
 */
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
	tab.reverse()
	return template.map((string, stringNumber) => {
		return string + tab[stringNumber]
	}).join('\n')
}

module.exports = {
	makeChordDiagram,
	makeChordTab,
}