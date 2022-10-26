const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', event =>{
    event.preventDefault()
    if(event.code.toLocaleLowerCase() === 'space'){
        setRandomColors()
    }
})

document.addEventListener('click', event =>{
    const type = event.target.dataset.type

    if(type.toLocaleLowerCase() === 'lock'){
        const node = event.target.tagName.toLocaleLowerCase() === 'i' ? event.target : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if(type === 'copy'){
        copyToClipboard(event.target.textContent)
    }
})

function generateRandomColor(){
    const hexCode = '0123456789ABCDEF'
    let color = '';
    for(let i = 0; i < 6; i++){
        color += hexCode[Math.floor(Math.random() * hexCode.length)]
    }

    return '#' + color;
}

function copyToClipboard(text){
    return navigator.clipboard.writeText(text)
}

function setRandomColors(isInit){
    const colors = isInit ? setColorFromHash() : []

    cols.forEach((col, index) =>{
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        if(isLocked){
            colors.push(text.textContent)
            return
        }

        const text = col.querySelector('h2')
        const button = col.querySelector('button')

        const color = isInit ? colors[index] ? colors[index] : generateRandomColor() : generateRandomColor()

        if(!isInit){
            colors.push(color)
        }

        text.textContent = color;
        col.style.background = color;

        setTextColor(text, color)
        setTextColor(button, color)
    })

    updColorHash(colors)
}

function setTextColor(text, color){
    const luminance = chroma(color).luminance()

    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updColorHash(color = []){
    document.location.hash = color.map(col => col.toString().substring(1)).join('-')
}

function setColorFromHash(){
    if(document.location.hash.length > 1){
        return document.location.hash.substring(1).split('-').map(color => '#' + color)
    }
    return []
}

setRandomColors(true)