const noteValues = [...document.getElementsByTagName('input')]
const scale = [0,'-',196,220,249.94,261.63,293,329.63,349.23,392,440,493.88,523.25,587.33,659.25]

const bpm = 220
const setBPM = (b) => 60000/b 

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
    
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

    async function asyncForEach(array, callback) {
        for (let i = 0; i < array.length; i++) {
          await callback(array[i], i, array);
        }
      }

    asyncForEach(melodyNotes, async (note,i) => {
        createOscillator(scale[note],holdNote(melodyNotes,i))
        await waitFor(setBPM(bpm));
    })
}

const createOscillator = (frequency, hold) => {
    const audio = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audio.createOscillator();
    const noteLength = 120

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(frequency, audio.currentTime)
    oscillator.connect(audio.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(0), noteLength*hold)
}

let alreadyClicked = false
document.getElementById('play').onclick = () => {
	if(alreadyClicked == false){
		playMelody(melodyNotes(noteValues),scale)
		alreadyClicked = true
		setTimeout(() => alreadyClicked = false, setBPM(bpm)*16)
	}else{
		//window.alert("Melody already playing")
		console.log("wait:", setBPM(bpm)*16)
	}
}

const displayNote = (note,i) => {
    let svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' transform='rotate(90)'><text transform='translate(12.5 37.5)'>" + note + "</text></svg>\")"
    let styleElement = document.head.appendChild(document.createElement("style"));
    styleElement.innerHTML = "#slider" + i + "::-webkit-slider-thumb {background-image: " + svg + ";} #slider" + i + "::-moz-range-thumb {background-image: " + svg + ";} #slider" + i + "::-ms-thumb {background-image: " + svg + ";}";
}

const displayNotes = (notes) => {
    notes.forEach( (note,i) => { 
        const updateNotes = () => {
            switch(note.value){
                case '0':
                    displayNote('Zz',i)
                    break
                case '1':
                    displayNote('-',i)
                    break
                case '2':
                case '9':
                    displayNote('G',i)
                    break
                case '3':
                case '10':
                    displayNote('A',i)
                    break
                case '4':
                case '11':
                    displayNote('B',i)
                    break
                case '5':
                case '12':
                    displayNote('C',i)  
                    break
                case '6':
                case '13':
                    displayNote('D',i)
                    break
                case '7':
                case '14':
                    displayNote('E',i)
                    break
                case '8':
                    displayNote('F',i)
                    break
                case '15':
                    displayNote('?',i)
                    break
            }

        }
        updateNotes()
        note.oninput = () => updateNotes()
    })
} 
displayNotes(noteValues)