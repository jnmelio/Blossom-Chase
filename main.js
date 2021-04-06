//DOM and canva
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';
let mainScreen = document.querySelector('.main')
let gameOverScreen = document.querySelector('.gameOver')
let winningScreen = document.querySelector('.winningScreen')
btnStart = document.querySelector('#start')
btnReStart = document.querySelector('#restart')
btnReStart2 = document.querySelector('#restart2')
btnSound = document.querySelector('#sound')


//Images
let bg = new Image(); 
bg.src = './Images/pixel-art-landscape-Idees-designs-photo.png'
let florist = new Image()
florist.src = './Images/florist.png'
let pinkPetal = new Image()
pinkPetal.src = './Images/cherry petal.png'
let cherryTree = new Image()
cherryTree.src = "./Images/cloud.png"
let cloud = new Image()
cloud.src = './Images/cloud.png'
let blackPetal = new Image()
blackPetal.src = './Images/black petal.png'

//variables
let gameOver = false
let intervalId = 0
let score = 0
let x = 200
let treeCloud = [
    {x: 200 , y:100},
    {x: 550 , y: 150},
    {x: 900, y: 50}
]
let floristX = 30
let floristY = 100
let isArrowRight = false
let isArrowUp = false
let isArrowLeft = false
let isArrowDown = false
let isSpaceBar = false
let multiplePinkPetals = [
    {x: 100, y: 30},
    {x: 475, y: 200}
]
let multipleBlackPetals = [
    {x: 1000, y:250},
    {x: 800, y: 400}
]
// Timer
function timer () {
    let counter = 0
    let id1 = setInterval (() => {
        counter++
        if (counter == 200) {
            gameOver = true
        }
    }, 1000 )
}

//Function
document.addEventListener('keydown', (event) => {
    if (event.code == 'ArrowRight') {
        isArrowRight = true
        isArrowUp = false
        isArrowLeft = false
        isArrowDown = false
        isSpaceBar = false
    } else if (event.code == 'ArrowLeft') {
        isArrowRight = false
        isArrowUp = false
        isArrowLeft = true
        isArrowDown = false
        isSpaceBar = false
    } else if (event.code == 'ArrowUp') {
        isArrowRight = false
        isArrowUp = true
        isArrowLeft = false
        isArrowDown = false
        isSpaceBar = false
    } else if (event.code == 'ArrowDown') {
        isArrowRight = false
        isArrowUp = false
        isArrowLeft = false
        isArrowDown = true
        isSpaceBar = false
    } else if (event.code == 'Space') {
        isArrowRight = false
        isArrowUp = false
        isArrowLeft = false
        isArrowDown = false
        isSpaceBar = true
    }
})
document.addEventListener('keyup', () => {
    isArrowRight = false
    isArrowUp = false
    isArrowLeft = false
    isArrowDown = false
    isSpaceBar = false
})

function clouds() {
    let gap = cloud.height + 160
    for (let i = 0; i < treeCloud.length; i++) {
        ctx.drawImage(cloud, treeCloud[i].x , treeCloud[i].y)
        ctx.drawImage(cherryTree, treeCloud[i].x, treeCloud[i].y + gap)
        treeCloud[i].x =  treeCloud[i].x - 1

        if (treeCloud[i].x + cloud.width< 0) {
            treeCloud[i] = { x: 900 , y:  Math.floor(Math.random() * cherryTree.height)}
        }

        if (floristX + florist.width >= treeCloud[i].x && floristX <= treeCloud[i].x + cloud.width && 
            ((floristY + florist.width <= treeCloud[i].y + cloud.height && floristY + florist.width >= treeCloud[i].y ) || 
            (floristY + florist.height + florist.width >= treeCloud[i].y + gap + 75 &&  floristY + florist.height + florist.width <= treeCloud[i].y + gap + cloud.height + 75))) {
            gameOver = true
        }
        
        if (score >= 5 && score < 10) {
            treeCloud[i].x =  treeCloud[i].x - 1.5
        }
        if (score >= 10 && score < 15) {
            treeCloud[i].x =  treeCloud[i].x - 2
        }
    }
}

function pinkPetals() {
    if (multiplePinkPetals.length == 0) {
        multiplePinkPetals[0] = { x: 400 , y:  Math.floor(Math.random() * canvas.height - pinkPetal.height)}
        console.log('hello')
    }
    for (let i = 0; i < multiplePinkPetals.length; i++ ) {
        if (multiplePinkPetals[i].x < 0 ) {
            multiplePinkPetals[i] = { x: 600 , y:  Math.floor(Math.random() * canvas.height - pinkPetal.height)}
        }
        ctx.drawImage(pinkPetal, multiplePinkPetals[i].x, multiplePinkPetals[i].y)
        multiplePinkPetals[i].x = multiplePinkPetals[i].x- 1
        if ((floristX  + florist.width >= multiplePinkPetals[i].x && floristX <= multiplePinkPetals[i].x + pinkPetal.width) &&
            (floristY + florist.width>= multiplePinkPetals[i].y && floristY <= multiplePinkPetals[i].y + pinkPetal.height) && 
            (floristX + florist.width + florist.height >= multiplePinkPetals[i].x && floristX + florist.width + florist.height >= multiplePinkPetals[i].x + pinkPetal.height)) {
            multiplePinkPetals.shift()
            audioPetal.play()
            score++
        }
    }
}

function blackPetals() {
    if (multipleBlackPetals.length == 0) {
        multipleBlackPetals[0] = { x: 400 , y:  Math.floor(Math.random() * canvas.height - blackPetal.height)}
    }
    for (let i = 0; i < multipleBlackPetals.length; i++ ) {
        if (multipleBlackPetals[i].x < 0 ) {
            multipleBlackPetals[i] = { x: 1000 , y:  Math.floor(Math.random() * canvas.height - blackPetal.height)}
        }
        ctx.drawImage(blackPetal, multipleBlackPetals[i].x, multipleBlackPetals[i].y)
        multipleBlackPetals[i].x = multipleBlackPetals[i].x- 1.5
        if ((floristX  + florist.width >= multipleBlackPetals[i].x && floristX <= multipleBlackPetals[i].x + blackPetal.width) &&
        (floristY + florist.width>= multipleBlackPetals[i].y && floristY <= multipleBlackPetals[i].y + blackPetal.height) && 
        (floristX + florist.width + florist.height >=multipleBlackPetals[i].x && floristX + florist.width + florist.height >= multipleBlackPetals[i].x + blackPetal.height)) {
            audioBlackPetal.play()
            multipleBlackPetals.shift()     
            score--
        }
        if (score >= 5 && score < 10) {
            multipleBlackPetals[i].x = multipleBlackPetals[i].x- 2
        }
        if (score >= 10 && score < 15) {
            multipleBlackPetals[i].x = multipleBlackPetals[i].x- 2.5
        }
    }
}

function start() {
    mainScreen.style.display = 'none'
    canvas.style.display = 'block'
    audioMainScreen.pause()
    audioCanva.play()
    draw()
}

function reStart () {
    gameOver = false
    intervalId = 0
    treeCloud = [
        {x: 200 , y:100},
        {x: 550 , y: 150},
        {x: 900, y: 50}
    ]
    floristX = 30
    floristY = 100
    score = 0
    gameOverScreen.style.display = 'none'
    canvas.style.display = 'block'
    audioCanva.play()
    draw()
}

function direction () {
    if (isSpaceBar) {
        cancelAnimationFrame(intervalId)
        console.log('hello')
    }
    if (isArrowRight) {
        floristX = floristX + 2
    }

    if (isArrowLeft) {
        floristX = floristX - 2
    }

    if (isArrowUp) {
        floristY = floristY - 2
    }

    if (isArrowDown) {
        floristY = floristY + 2
    }
    if (isArrowRight && score >= 2) {
        floristX = floristX + 4
    }
    if (isArrowLeft && score >= 2) {
        floristX = floristX - 4
    }

    if (isArrowUp && score >= 2) {
        floristY = floristY - 4
    }

    if (isArrowDown && score >= 2) {
        floristY = floristY + 4
    }

}

function gameOverFunc () {
    if (gameOver) {
        cancelAnimationFrame(intervalId)
        audioCanva.pause()
        audioGameOver.play()
        mainScreen.style.display = 'none'
        canvas.style.display = 'none'
        gameOverScreen.style.display='block'
        winningScreen.style.display='none'
    } else {
        intervalId = requestAnimationFrame(draw)
    }
}

function winningTheGame () {
    if ( score == 15) {
        cancelAnimationFrame(intervalId)
        audioCanva.pause()
        audioWinningScreen.play()
        mainScreen.style.display = 'none'
        canvas.style.display = 'none'
        gameOverScreen.style.display='none'
        winningScreen.style.display='block'
    }
}

function draw () {
    ctx.drawImage(bg, 0, 0)
    ctx.drawImage(florist, floristX, floristY)
    clouds()
    pinkPetals()
    blackPetals()

    ctx.font = '20px Verdana'
    ctx.fillText(`Score : ${score}`, 20, canvas.height - 35)

    
    gameOverFunc()
    direction()
    winningTheGame()
    timer()
}

//audiosfiles
let audioMainScreen = new Audio('/Audio/mainScreen.mp3')
let audioCanva = new Audio('/Audio/mainMusic.mp3')
let audioGameOver = new Audio('/Audio/gameOver2.mp3')
let audioWinningScreen = new Audio('/Audio/winningScreen.mp3')
let audioPetal = new Audio('/Audio/super-mario-bros-coin-sound-effect-free-ringtone-download.mp3')
let audioBlackPetal = new Audio('/Audio/mario-lose-a-life-sound-effect-free-ringtone-download (mp3cut.net).mp3')

window.addEventListener('load', () => {
    audioMainScreen.play()
    mainScreen.style.display = 'block'
    canvas.style.display = 'none'
    gameOverScreen.style.display='none'
    winningScreen.style.display = 'none'
    btnStart.addEventListener('click', () => {
        start()
    })
    btnReStart.addEventListener('click', () => {
        reStart()
    })
    btnReStart2.addEventListener('click', () => {
        reStart()
    })
    btnSound.addEventListener('click', () => {
        if(btnSound.innerText == 'Sound On') {
            console.log(btnSound.innerText)
            audioMainScreen.pause()
            btnSound.innerText = 'Sound Off'
            console.log(btnSound.innerText)
        } else if (btnSound.innerText == 'Sound Off') {
            audioMainScreen.play()
            btnSound.innerText = 'Sound On'
        }
    })
})