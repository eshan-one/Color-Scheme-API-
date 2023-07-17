const seedColor = document.getElementById("seed")
const colorSelect = document.getElementById("colors")

const dispArray = document.getElementsByClassName("color-disp")
const hexValArray = document.getElementsByClassName("color-hex")


/*generateRandomColor() function generates a random hexadecimal 
color code by generating a random decimal number within the range
of possible hexadecimal values, converting it to a hexadecimal string,
padding it with leading zeros, and returning it in the format #RRGGBB. */

function generateRandomColor() {
    const maxVal = 0xFFFFFF
    const randomNumber = Math.floor(Math.random() * maxVal) 
    const randColor = randomNumber.toString(16).padStart(6, '0')   
    return `#${randColor.toUpperCase()}`
}

seedColor.value = generateRandomColor()

function arrangeColors(object) {
    const {colors} = object //destructuring
    for (let i = 0; i < 5; i++) {
        const {hex: {value}} =  colors[i]  //destructuring
        dispArray[i].style.backgroundColor = value //setting background color
        hexValArray[i].textContent = value //setting text content
        hexValArray[i].value = value //setting value
    }
}

function showColors() {
    const colorCode = seedColor.value.slice(1)
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorCode}&mode=${colorSelect.value}&count=5`)
        .then(res => res.json())
        .then(data => arrangeColors(data))
}


function copyText(index) {
    const copiedText = hexValArray[index].value
    if(copiedText) {
      navigator.clipboard.writeText(copiedText)
      .then(() => {
        alert("Copied the color: " + copiedText);
      })
      .catch((error) => {
        console.error("Copy failed:", error);
      });
    
    }
}