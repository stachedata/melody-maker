const scale = [196,220,249.94,261.63,293,329.63,349.23,392,440,493.88,523.25,587.33,659.25]
const noteValues = [...document.getElementsByTagName('input')]

const melodyNotes = (noteValues) => {
    const chosenNotes = []
    noteValues.map(note => {
        chosenNotes.push(note.value)
    })
    return chosenNotes
}

// currently broken
// const playMelody = (melodyNotes, scale) => {
// 	melodyNotes.map(chosenNote => {
//         let playing = setInterval(() => createOscillator(scale[chosenNote]), 1000)
//         setTimeout(() => clearInterval(playing), 17000)
// 	})
// }

const createOscillator = (frequency) => {
    const audio = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audio.createOscillator();

    oscillator.type = 'square';
    oscillator.frequency.value = frequency;
    oscillator.connect(audio.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(0), 200)
    console.log(frequency)
}

document.getElementById('play').onclick = () => playMelody(melodyNotes(noteValues),scale)