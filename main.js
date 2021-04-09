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
let superman = new Image()
superman.src = './Images/superman.png'
let batman = new Image()
batman.src = './Images/Batmobile_(circa_2018).png'
let wonderwoman = new Image()
wonderwoman.src = './Images/wonderwoman.png'
let joker = new Image()
joker.src = './Images/Joker.png'


//variables
let gameOver = false
let intervalId = 0
let intervalId2 = 0
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
    {x: 475, y: 200},
    {x: 850, y: 270}
]
let multipleBlackPetals = [
    {x: 1000, y:250},
    {x: 800, y: 400},
    {x: 600, y: 550}
]
let pause = false
let supermanX = 1000
let supermanY = 500
let batmanX = 2500
let batmanY = 200
let wonderwomanX = 0
let wonderwomanY = 550
let jokerX = 4000
let jokerY = 450

// Timer
function timer () {
    let counter = 0
    let id1 = setInterval (() => {
        counter++
        if (counter == 600) {
            gameOver = true
        }
    }, 1000 )
}

//KeyEvents
document.addEventListener('keydown', (event) => {
    //Arrow keys
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
        //Space bar pause
        if (isSpaceBar && pause) {
            requestAnimationFrame(draw)
            pause = false
            isSpaceBar = false
            console.log('bye')
        }
    }
})
document.addEventListener('keyup', () => {
    isArrowRight = false
    isArrowUp = false
    isArrowLeft = false
    isArrowDown = false
    isSpaceBar = false
})

//Functions
function clouds() {
    //drawing the clouds and loop
    let gap = cloud.height + 160
    for (let i = 0; i < treeCloud.length; i++) {
        ctx.drawImage(cloud, treeCloud[i].x , treeCloud[i].y)
        ctx.drawImage(cherryTree, treeCloud[i].x, treeCloud[i].y + gap)
        treeCloud[i].x =  treeCloud[i].x - 1

        if (treeCloud[i].x + cloud.width< 0) {
            treeCloud[i] = { x: 900 , y:  Math.floor(Math.random() * cherryTree.height)}
        }
        //collision with clouds
        if (floristX + florist.width >= treeCloud[i].x && floristX <= treeCloud[i].x + cloud.width && 
            ((floristY + florist.width <= treeCloud[i].y + cloud.height && floristY + florist.width >= treeCloud[i].y ) || 
            (floristY + florist.height + florist.width >= treeCloud[i].y + gap + 50 &&  floristY + florist.height + florist.width <= treeCloud[i].y + gap + cloud.height + 50))) {
            gameOver = true
        }
        //difficulty increasing
        if (score >= 2 && score < 10) {
            treeCloud[i].x =  treeCloud[i].x - 1.5
        }
        if (score >= 10 && score < 15) {
            treeCloud[i].x =  treeCloud[i].x - 2.5
        }
    }
}

function pinkPetals() {
    //drawing the petals and loop
    if (multiplePinkPetals.length == 0) {
        multiplePinkPetals[0] = { x: 400 , y:  Math.floor(Math.random() * canvas.height - pinkPetal.height)}
    }
    for (let i = 0; i < multiplePinkPetals.length; i++ ) {
        if (multiplePinkPetals[i].x < 0 ) {
            multiplePinkPetals[i] = { x: 600 , y:  Math.floor(Math.random() * canvas.height - pinkPetal.height)}
        }
        ctx.drawImage(pinkPetal, multiplePinkPetals[i].x, multiplePinkPetals[i].y)
        multiplePinkPetals[i].x = multiplePinkPetals[i].x- 1
        //collision with pink petals + sound management
        if ((floristX  + florist.width >= multiplePinkPetals[i].x && floristX <= multiplePinkPetals[i].x + pinkPetal.width) &&
            (floristY + florist.width>= multiplePinkPetals[i].y && floristY <= multiplePinkPetals[i].y + pinkPetal.height) && 
            (floristX + florist.width + florist.height >= multiplePinkPetals[i].x && floristX + florist.width + florist.height >= multiplePinkPetals[i].x + pinkPetal.height)) {
            multiplePinkPetals.splice(i, 1)
            if (btnSound.innerText == 'Sound On' && canvas.style.display == 'block') {
                audioPetal.pause()
            } else if (btnSound.innerText == 'Sound Off' && canvas.style.display == 'block') {
                audioPetal.play()
            }
            score++
        }
    }
}

function blackPetals() {
    //drawing the petals and loop
    if (multipleBlackPetals.length == 0) {
        multipleBlackPetals[0] = { x: 700 , y:  Math.floor(Math.random() * canvas.height - blackPetal.height)}
    }
    for (let i = 0; i < multipleBlackPetals.length; i++ ) {
        if (multipleBlackPetals[i].x < 0 ) {
            multipleBlackPetals[i] = { x: 1000 , y:  Math.floor(Math.random() * canvas.height - blackPetal.height)}
        }
        if (score >= 2 && score < 10) {
            multipleBlackPetals[i].x = multipleBlackPetals[i].x- 2
        }
        if (score >= 10 && score < 15) {
            multipleBlackPetals[i].x = multipleBlackPetals[i].x- 3
        }
        ctx.drawImage(blackPetal, multipleBlackPetals[i].x, multipleBlackPetals[i].y)
        multipleBlackPetals[i].x = multipleBlackPetals[i].x- 1.5
        // collision with the petals + sound management
        if ((floristX  + florist.width >= multipleBlackPetals[i].x && floristX <= multipleBlackPetals[i].x + blackPetal.width) &&
        (floristY + florist.width>= multipleBlackPetals[i].y && floristY <= multipleBlackPetals[i].y + blackPetal.height) && 
        (floristX + florist.width + florist.height >=multipleBlackPetals[i].x && floristX + florist.width + florist.height >= multipleBlackPetals[i].x + blackPetal.height)) {
            audioBlackPetal.play()
            multipleBlackPetals.splice(i, 1) 
            if (btnSound.innerText == 'Sound On' && canvas.style.display == 'block') {
                audioBlackPetal.pause()
            } else if (btnSound.innerText == 'Sound Off' && canvas.style.display == 'block') {
                audioBlackPetal.play()
            }
            score--
        }
    }
}

function start() {
    mainScreen.style.display = 'none'
    canvas.style.display = 'block'
    //sound management
    audioMainScreen.pause()
    audioMainScreen.currentTime = 0
    if (btnSound.innerText == 'Sound On' && canvas.style.display == 'block') {
        audioCanva.pause()
    } else if (btnSound.innerText == 'Sound Off' && canvas.style.display == 'block') {
        audioCanva.play()
    }
    draw()
}

function reStart () {
    //reset
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
    multiplePinkPetals = [
        {x: 100, y: 30},
        {x: 475, y: 200},
        {x: 850, y: 270}
    ]
    multipleBlackPetals = [
        {x: 1000, y:250},
        {x: 800, y: 400},
        {x: 600, y: 550}
    ]
    //block and sound management
    gameOverScreen.style.display = 'none'
    winningScreen.style.display = 'none'
    canvas.style.display = 'block'
    audioWinningScreen.pause()
    audioWinningScreen.currentTime = 0
    if (btnSound.innerText == 'Sound On' && canvas.style.display == 'block') {
        audioCanva.pause()
    } else if (btnSound.innerText == 'Sound Off' && canvas.style.display == 'block') {
        audioCanva.play()
    }
    audioGameOver.pause()
    audioGameOver.currentTime = 0
    btnSound.id ='sound'
    draw()
}

function direction () {
    //part2 of pause
    if (isSpaceBar && pause == false) {
        cancelAnimationFrame(intervalId)
        pause = true
        console.log('hello')
    }  
    //florist speed
    if (isArrowRight) {
        floristX = floristX + 2.5
    }

    if (isArrowLeft) {
        floristX = floristX - 2.5
    }

    if (isArrowUp) {
        floristY = floristY - 2.5
    }

    if (isArrowDown) {
        floristY = floristY + 2.5
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
            mainScreen.style.display = 'none'
            canvas.style.display = 'none'
            gameOverScreen.style.display='block'
            winningScreen.style.display='none'
            btnSound.id = 'redButton'
            //sound management
            audioCanva.pause()
            audioCanva.currentTime = 0
            if (btnSound.innerText == 'Sound On' && gameOverScreen.style.display == 'block') {
                audioGameOver.pause()
            } else if (btnSound.innerText == 'Sound Off' && gameOverScreen.style.display == 'block') {
                audioGameOver.play()
            }
    } else {
        intervalId = requestAnimationFrame(draw)
    }
}

function winningTheGame () {
    if ( score == 3) {
        cancelAnimationFrame(intervalId)
        audioCanva.pause()
        audioCanva.currentTime = 0
        mainScreen.style.display = 'none'
        canvas.style.display = 'none'
        gameOverScreen.style.display='none'
        winningScreen.style.display='block'
        if (btnSound.innerText == 'Sound On' && winningScreen.style.display == 'block') {
            audioWinningScreen.pause()
        } else if (btnSound.innerText == 'Sound Off' && winningScreen.style.display == 'block') {
            audioWinningScreen.play()
        }
    }
}
function easterEggs () {
    ctx.drawImage(superman, supermanX, supermanY)
    supermanX = supermanX - 2
    ctx.drawImage(batman, batmanX, batmanY )
    batmanX = batmanX - 2
    ctx.drawImage(wonderwoman, wonderwomanX, wonderwomanY)
    let id1 = setTimeout (() => {
        wonderwomanX = wonderwomanX + 2
        wonderwomanY = wonderwomanY - 2
    }, 20000 )
    ctx.drawImage(joker, jokerX, jokerY)
    jokerX = jokerX - 2
}

function draw () {
    ctx.drawImage(bg, 0, 0)
    ctx.drawImage(florist, floristX, floristY)
    easterEggs()
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
let audioMainScreen = new Audio('./Audio/mainScreen.mp3')
audioMainScreen.volume = 0.03
let audioCanva = new Audio('./Audio/mainMusic.mp3')
audioCanva.volume = 0.03
let audioGameOver = new Audio('./Audio/gameOver2.mp3')
audioGameOver.volume = 0.03
let audioWinningScreen = new Audio('./Audio/winningScreen.mp3')
audioWinningScreen.volume = 0.03
let audioPetal = new Audio('./Audio/super-mario-bros-coin-sound-effect-free-ringtone-download.mp3')
audioPetal.volume = 0.03
let audioBlackPetal = new Audio('./Audio/mario-lose-a-life-sound-effect-free-ringtone-download (mp3cut.net).mp3')
audioBlackPetal.volume = 0.15

//Events and sound cut between screens
window.addEventListener('load', () => {
    mainScreen.style.display = 'block'
    canvas.style.display = 'none'
    gameOverScreen.style.display='none'
    winningScreen.style.display ='none'
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
        if(btnSound.innerText == 'Sound Off' && mainScreen.style.display == 'block') {
            audioMainScreen.pause()
            btnSound.innerText = 'Sound On'
        } else if (btnSound.innerText == 'Sound On' && mainScreen.style.display == 'block') {
            audioMainScreen.play()
            btnSound.innerText = 'Sound Off'
        } else if (btnSound.innerText == 'Sound Off' && canvas.style.display == 'block') {
            audioCanva.pause()
            btnSound.innerText = 'Sound On'
        } else if (btnSound.innerText == 'Sound On' && canvas.style.display == 'block') {
            audioCanva.play()
            btnSound.innerText = 'Sound Off'
        } else if (btnSound.innerText == 'Sound Off' && winningScreen.style.display == 'block') { 
            audioWinningScreen.pause()
            btnSound.innerText = 'Sound On'
        } else if (btnSound.innerText == 'Sound On' && winningScreen.style.display == 'block') {
            audioWinningScreen.play()
            btnSound.innerText = 'Sound Off'
        } else if (btnSound.innerText == 'Sound Off' && gameOverScreen.style.display == 'block') {
            audioGameOver.pause()
            btnSound.innerText = 'Sound On'
            btnSound.idList = 'redButton'
        } else if (btnSound.innerText == 'Sound On' && gameOverScreen.style.display == 'block'){
            audioGameOver.play()
            btnSound.innerText = 'Sound Off'
        }
    })
})