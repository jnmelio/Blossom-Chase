//DOM and canva
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';
let mainScreen = document.querySelector('.main')
let gameOverScreen = document.querySelector('.gameOver')
let winningScreen = document.querySelector('.winningScreen')
btnStart = document.querySelector('#start')
btnReStart = document.querySelector('#restart')


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
    {x: 550 , y: 150}
]
let floristX = 30
let floristY = 100
let isArrowRight = false
let isArrowUp = false
let isArrowLeft = false
let isArrowDown = false
let multiplePinkPetals = [
    {x: 100, y:30},
    // {x: 700, y: 200}
]
let multipleBlackPetals = [
    {x: 1000, y:250},
    {x: 800, y: 400}
]

//Function
document.addEventListener('keydown', (event) => {
    if (event.code == 'ArrowRight') {
        isArrowRight = true
        isArrowUp = false
        isArrowLeft = false
        isArrowDown = false
    } else if (event.code == 'ArrowLeft') {
        isArrowRight = false
        isArrowUp = false
        isArrowLeft = true
        isArrowDown = false
    } else if (event.code == 'ArrowUp') {
        isArrowRight = false
        isArrowUp = true
        isArrowLeft = false
        isArrowDown = false
    } else if (event.code == 'ArrowDown') {
        isArrowRight = false
        isArrowUp = false
        isArrowLeft = false
        isArrowDown = true
    }
})
document.addEventListener('keyup', () => {
    isArrowRight = false
    isArrowUp = false
    isArrowLeft = false
    isArrowDown = false
})

function clouds() {
    let gap = cloud.height + 160

    for (let i = 0; i < treeCloud.length; i++) {
        ctx.drawImage(cloud, treeCloud[i].x , treeCloud[i].y)
        ctx.drawImage(cherryTree, treeCloud[i].x, treeCloud[i].y + gap)
        treeCloud[i].x =  treeCloud[i].x - 1

        if (treeCloud[i].x < 0) {
            treeCloud[i] = { x: 750 , y:  Math.floor(Math.random() * cherryTree.height)}
        }

        if (floristX + florist.width >= treeCloud[i].x && floristX <= treeCloud[i].x + cloud.width && 
            ((floristY + florist.width <= treeCloud[i].y + cloud.height && floristY + florist.width >= treeCloud[i].y ) || 
            (floristY + florist.height + florist.width >= treeCloud[i].y + gap + 75 &&  floristY + florist.height + florist.width <= treeCloud[i].y + gap + cloud.height + 75))) {
            gameOver = true
        }
    }
}

function pinkPetals() {
    if (multiplePinkPetals.length == 0) {
        multiplePinkPetals[0] = { x: 400 , y:  Math.floor(Math.random() * canvas.height - pinkPetal.height)}
    }
    for (let i = 0; i < multiplePinkPetals.length; i++ ) {
        if (multiplePinkPetals[i].x < 0 ) {
            multiplePinkPetals[i] = { x: 400 , y:  Math.floor(Math.random() * canvas.height - pinkPetal.height)}
        }
        ctx.drawImage(pinkPetal, multiplePinkPetals[i].x, multiplePinkPetals[i].y)
        multiplePinkPetals[i].x = multiplePinkPetals[i].x- 1
        if ((floristX >= multiplePinkPetals[i].x && floristX <= multiplePinkPetals[i].x + pinkPetal.width) && (floristY >= multiplePinkPetals[i].y && floristY <= multiplePinkPetals[i].y + pinkPetal.height) ) {
            multiplePinkPetals.shift()     
            score++
        }
    }
}

function blackPetals() {
    if (multipleBlackPetals.length == 0) {
        multiplePinkPetals[0] = { x: 400 , y:  Math.floor(Math.random() * canvas.height - pinkPetal.height)}
    }
    for (let i = 0; i < multipleBlackPetals.length; i++ ) {
        if (multipleBlackPetals[i].x < 0 ) {
            multipleBlackPetals[i] = { x: 1000 , y:  Math.floor(Math.random() * canvas.height - blackPetal.height)}
        }
        ctx.drawImage(blackPetal, multipleBlackPetals[i].x, multipleBlackPetals[i].y)
        multipleBlackPetals[i].x = multipleBlackPetals[i].x- 1.5
        if ((floristX >= multipleBlackPetals[i].x && floristX <= multipleBlackPetals[i].x + blackPetal.width) && (floristY >= multipleBlackPetals[i].y && floristY <= multipleBlackPetals[i].y +blackPetal.height) ) {
            multipleBlackPetals.shift()     
            score--
        }
    }
}



function direction () {
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
}
function draw () {
    ctx.drawImage(bg, 0, 0)
    ctx.drawImage(florist, floristX, floristY)
    clouds()
    pinkPetals()
    blackPetals()

    ctx.font = '20px Verdana'
    ctx.fillText(`Score : ${score}`, 20, canvas.height - 35)


    direction()

    if (gameOver) {
        cancelAnimationFrame(intervalId)
        mainScreen.style.display = 'none'
        canvas.style.display = 'none'
        gameOverScreen.style.display='block'
        winningScreen.style.display='none'
    } else {
        intervalId = requestAnimationFrame(draw)
    }

    if ( score == 2) {
        cancelAnimationFrame(intervalId)
        winningScreen.style.display='block'
        canvas.style.display = 'none'
    }
}


window.addEventListener('load', () => {
    mainScreen.style.display = 'block'
    canvas.style.display = 'none'
    gameOverScreen.style.display='none'
    btnStart.addEventListener('click', () => {
        mainScreen.style.display = 'none'
        canvas.style.display = 'block'
        draw()
    })
    btnReStart.addEventListener('click', () => {
        gameOver = false
        gameOverScreen.style.display = 'none'
        canvas.style.display = 'block'
        draw()
    })
    
})