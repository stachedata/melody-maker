const scale = [0,'-',196,220,249.94,261.63,293,329.63,349.23,392,440,493.88,523.25,587.33,659.25]
const noteValues = [...document.getElementsByTagName('input')]

const melodyNotes = (noteValues) => {
    const chosenNotes = []
    noteValues.forEach(note => {
        if(note.value == 1) chosenNotes.push('-')
        else chosenNotes.push(note.value)
    })
    return chosenNotes
}

const playMelody = (melodyNotes, scale) => {  

    const holdNote = (melodyNotes,i) => {
        let hold = 1
        i++
        if(melodyNotes[i] == '-'){
            let holdNote = 0
            const currentIndex = i
            while(melodyNotes[i] == '-'){
                holdNote++
                i++
            }
            melodyNotes.splice(currentIndex,holdNote)
            hold+=holdNote
        }
        return hold
    }

    let i = 0
    const tempo = 400

    const melody = setInterval(() => { 
        createOscillator(scale[melodyNotes[i]],holdNote(melodyNotes,i))
        i++
    }, tempo)
    setTimeout(() => clearInterval(melody), tempo*16)
}

const createOscillator = (frequency, hold) => {
    const audio = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audio.createOscillator();
    const noteLength = 200

    oscillator.type = 'square';
    oscillator.frequency.value = frequency;
    oscillator.connect(audio.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(0), noteLength*hold)
}

document.getElementById('play').onclick = () => playMelody(melodyNotes(noteValues),scale)