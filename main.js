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
    const tempo = 300

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

const displayNotes = (notes) => {
    let noteDiv = document.getElementsByClassName("noteDiv")
    console.log(noteDiv)
    notes.forEach( (note,i) => { 
        const updateNotes = () => {
            switch(note.value){
                case '0':
                    noteDiv[i].innerText = "Zz"
                    break
                case '1':
                    noteDiv[i].innerText = "-"  
                    break
                case '2':
                case '9':
                    noteDiv[i].innerText = "G"
                    break
                case '3':
                case '10':
                    noteDiv[i].innerText = "A"
                    break
                case '4':
                case '11':
                    noteDiv[i].innerText = "B"
                    break
                case '5':
                case '12':
                    noteDiv[i].innerText = "C"  
                    break
                case '6':
                case '13':
                    noteDiv[i].innerText = "D"
                    break
                case '7':
                case '14':
                    noteDiv[i].innerText = "E"
                    break
                case '8':
                    noteDiv[i].innerText = "F"
                    break
                case '15':
                    noteDiv[i].innerText = "?"
                    break
            }

        }
        updateNotes()
        note.oninput = () => updateNotes()
    })
} 
displayNotes(noteValues)