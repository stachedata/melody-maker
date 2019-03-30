const scale = [0,0,196,220,249.94,261.63,293,329.63,349.23,392,440,493.88,523.25,587.33,659.25]
const noteValues = [...document.getElementsByTagName('input')]

const melodyNotes = (noteValues) => {
    const chosenNotes = []
    let previousNote
    noteValues.map(note => {
        if(note.value == 1){
            chosenNotes.push(previousNote)
        }
        else{
            chosenNotes.push(note.value)
            previousNote = note.value
        }
    })
    return chosenNotes
}

const playMelody = (melodyNotes, scale) => {
    let i = 0
    const tempo = 250

    const sequentialNotes = (melodyNotes,i) => {
        let j = i++
        let count = 1
        while(melodyNotes[i] == melodyNotes[j]){
            i++
            j++
            count++
        }
        return count
    }

    const melody = setInterval(() => {
        console.log(i)
        let hold = sequentialNotes(melodyNotes,i)
        if(hold > 1){
            console.log("sequential", hold)
            createOscillator(scale[melodyNotes[i]],hold)
            i+=hold
        }
        else{
            createOscillator(scale[melodyNotes[i]],1)
        }
        i++
    }, tempo)
    setTimeout(() => clearInterval(melody), tempo*16)
}

const createOscillator = (frequency, hold) => {
    const audio = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audio.createOscillator();
    const noteLength = 200

console.log("hold",noteLength*hold)
    oscillator.type = 'square';
    oscillator.frequency.value = frequency;
    oscillator.connect(audio.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(0), noteLength*hold)
}

document.getElementById('play').onclick = () => playMelody(melodyNotes(noteValues),scale)