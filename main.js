const sliders = [...document.getElementsByTagName('input')]
const scale = [0,'-',196,220,249.94,261.63,293,329.63,349.23,392,440,493.88,523.25,587.33,659.25]

const bpm = 220
const setBPM = (b) => 60000/b 

const melodyNotes = (sliders) => {
    const chosenNotes = []
    sliders.forEach(note => {
        chosenNotes.push(note.value)
    })
    return chosenNotes
}

const playMelody = (melodyNotes, scale) => {  
    
    const holdNote = (melodyNotes,i) => {
        let hold = 1
        i++
        if(melodyNotes[i] == '1'){
            let holdNote = 0
            const currentIndex = i
            while(melodyNotes[i] == '1'){
                holdNote++
                i++
            }
            melodyNotes.splice(currentIndex,holdNote)
            hold+=holdNote
        }
        return hold
    }
    
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
    
    async function asyncForEach(array, callback) {
        for (let i = 0; i < array.length; i++) {
            await callback(array[i], i, array)
        }
    }
    
    asyncForEach(melodyNotes, async (note,i) => {
        createOscillator(scale[note],holdNote(melodyNotes,i))
        await waitFor(setBPM(bpm))
    })
}

const createOscillator = (frequency, hold) => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioCtx.createOscillator()
    const noteLength = 120
    
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime)
    oscillator.connect(audioCtx.destination)
    oscillator.start()
    setTimeout(() => oscillator.stop(audioCtx.currentTime), noteLength*hold)
}

let alreadyClicked = false
const btn = document.getElementById('play')
document.getElementById('play').onclick = () => {
    if(alreadyClicked == false){
        playMelody(melodyNotes(sliders),scale)
		alreadyClicked = true
		setTimeout(() => {
            btn.innerHTML = '&#9658;'
            alreadyClicked = false
        }, setBPM(bpm)*16)
	}else{
        btn.innerHTML = '&#215;'
	}
}

const displayNote = (note,color,i) => {
    let svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' transform='rotate(90)'><text transform='translate(12.5 37.5)'>" + note + "</text></svg>\")"
    let border = '2px solid ' + color
    let styleElement = document.head.appendChild(document.createElement("style"))
    styleElement.innerHTML = "#slider" + i + "::-webkit-slider-thumb {background-image: " + svg + ";border: " + border + "} #slider" + i + "::-moz-range-thumb {background-image: " + svg + ";border: " + border + "} #slider" + i + "::-ms-thumb {background-image: " + svg + ";border: " + border + "}"
}

const updateSliderThumb = (note,i) => {
    switch(note){
        case '0':
            displayNote('Zz','GREY',i)
            break
        case '1':
            displayNote('-','PALETURQUOISE',i)
            break
        case '2':
            displayNote('G','STEELBLUE',i)
            break
        case '3':
            displayNote('A','ROYALBLUE',i)
            break
        case '4':
            displayNote('B','MEDIUMSLATEBLUE',i)
            break
        case '5':
            displayNote('C','MEDIUMORCHID',i)  
            break
        case '6':
            displayNote('D','ORCHID',i)
            break
        case '7':
            displayNote('E','VIOLET',i)
            break
        case '8':
            displayNote('F','LIGHTCORAL',i)
            break
        case '9':
            displayNote('G','SALMON',i)
            break
        case '10':
            displayNote('A','CORAL',i)
            break
        case '11':
            displayNote('B','DARKORANGE',i)
            break
        case '12':
            displayNote('C','ORANGE',i)  
            break            
        case '13':
            displayNote('D','GOLD',i)
            break
        case '14':
            displayNote('E','KHAKI',i)
            break            
    }   
}

const updateUrl = () => window.history.pushState({notes:melodyNotes(sliders)},"","#" + melodyNotes(sliders))

const slidersController = (sliders,urlNotes) => {
    sliders.forEach((note,i) => { 
        if(urlNotes) {
            updateSliderThumb(urlNotes[i],i)
        }else{
            updateSliderThumb(note.value,i)
        }
        
        note.oninput = () => {
            updateUrl()
            updateSliderThumb(note.value,i)
        }
    })
} 

if(window.location.hash){
    let urlNotes = window.location.hash.slice("1").split(",")
    sliders.forEach((slider,i) => slider.value = urlNotes[i])
    slidersController(melodyNotes(sliders),urlNotes)
}
slidersController(sliders)