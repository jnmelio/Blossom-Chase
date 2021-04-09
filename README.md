# Blossom-Chase


## Description
You are a florist who tries to get as many cherry blossom petals as he can so he can sell them in his store. The game has 4 levels and each level the player has to collect a specific amount of petals that are randomly placed on the screen. The screen is moving to the right so the player has to avoid cherry trees and clouds to collect his petals. Some black petals are cooming from the right of the screen and move to the left. If the player touches one black petal it decreases his score of petals by 1. Plus there is a timer. If the player does not get the amount required at the end of the timer it's game over. The player has 5 lives, if he touches clouds or trees 5 times, it's game over.

## MVP
- Player can move freely with the 4 arrow keys and the z,q,s,d keys
- Clouds at the top and cherry trees at the bottom are randomly placed
- Pink cherry blossom petals are randomly placed on the screen 
- Black cherry blossom petals are coming from the right 
- If the player touches 1 pink it increases his score by 1
- If the player touches 1 black it decreases the score by 1
- A timer is set and if the players does not have the required amount of petals by the end of the timer it's game over
- If the player gets the required amount he can go to the next level
- Each level will increase the speed of the screen moving and the speed of the black cherry blossoms petals


## Backlog
- Add some specific sounds when you get a petal or loose a petal
- Hokusai wave animation when game over
- shooting feature where you can destroy the black petals
- intermediate screen after each level to let the player select mainScreen or nextLevel


## Data structure

### screen.js
- build mainScreen() {}
- build gameScreen() {}
- build gameOverScreen() {}

### gameFeature.js
- startGame () {}
- loop (){}
- addCharacter () {}
- add blackPetals () {}
- add pinkPetals () {}
- add treesAndClouds () {}
- manageCollisions () {}
- timer () {}
- gameOver () {}

### character.js
- character () {
    this.x; 
    this.y; 
    this.size; 
}
- draw () {}
- move () {}
- screenCollision () {}

### blackpetals.js
- blackPetals () {
    this.x; 
    this.y; 
    this.size
}
- draw () {}
- move () {}

### treesandclouds.js
- treeCloud () {
    this.x; 
    this.y; 
    this.size
}
- draw () {}

### pinkpetals.js
- pinkPetals () {
    this.x; 
    this.y; 
    this.size
}
- draw () {}




## States y States Transitions
- mainScreen
- gameScreen
- gameOverScreen


## Task
- screen - buildDom
- screen - buildMainScreen
- screen - buildGameScreen
- screen - buildGameOverScreen 
- screen - addEventListener
- gameFeature - loop
- character - draw
- character - move
- character - screenCollision
- gameFeature - addCharacter
- blackPetals - draw
- blackPetals - move
- gameFeature - addBlackPetals
- treesAndClouds - draw
- gameFeature - addTreesAndClouds
- pinkPetals - draw
- gameFeature - addPinkPetals
- gameFeature - collision
- gameFeature - gameOver
- gameFeature - newLevel

## Additional Links

Planning
https://www.notion.so/Blossom-Chase-9a95971efe4b459093ceb25413c3bbfc

Slides
https://slides.com/jnmelio/blossom-chase

Link to the game 
https://jnmelio.github.io/Blossom-Chase/