// document.getElementById("play").onclick = () => document.getElementById("tada").play()  
const sliders = [...document.getElementsByTagName('input')]

const printArray = (sliders) => {
    const slidersValues = []
    sliders.map(x => {
        slidersValues.push(x.value)
    })
    return slidersValues
}

document.getElementById('printArray').onclick = () => console.log(printArray(sliders))
