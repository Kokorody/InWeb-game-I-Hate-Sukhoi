const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

document.body.appendChild(canvas);

let player;
let enemies = [];
let enemyBullets = [];
let bullets = [];
let boss = null; 
let nextBossScore = 100; //first boss at 100 points
let score = 0;
let currentTime = 30;
let timerLastUpdated = Date.now();
let isGameOver = false;
let isPaused = false;
let animationFrameId = null;
let isGameStarted = false;

function init() {
    player = new Player(
        canvas.width / 2 - 25,
        canvas.height - 60,
        50,
        50,
        3
    );
    spawnEnemies();
    // Start the game loop/
    gameLoop();
}

function spawnEnemies() {
    setInterval(() => {
        const enemy = new Enemy(Math.random() * (canvas.width - 50), 0);
        enemies.push(enemy);
    }, 1000);
}

function update() {
    player.update();
    bullets.forEach(bullet => bullet.update());
    enemyBullets.forEach(bullet => bullet.update());

    // Update enemies and handle their shooting
    enemies.forEach(enemy => {
        enemy.update();
        const newBullet = enemy.update();
        if (newBullet) {
            // Create enemy bullet with red color
            enemyBullets.push(new Bullet(
                enemy.x + enemy.width / 2,
                enemy.y + enemy.height,
                -4,
                'red'  // Add red color for enemy bullets
            ));
        }
    });

    // Remove off-screen bullets
    enemyBullets = enemyBullets.filter(bullet => !bullet.isOffScreen(canvas.height));
    bullets = bullets.filter(bullet => !bullet.isOffScreen(canvas.height));
    
    // Remove off-screen enemies
    enemies = enemies.filter(enemy => !enemy.isOffScreen(canvas.height));

    checkCollisions();
    updateTimer();

    if (!boss && score >= nextBossScore) {
        boss = new Boss(canvas.width / 2 - 50, 50);
    }

    // Update boss if exists
    if (boss) {
        const bossBullets = boss.update();
        if (Array.isArray(bossBullets)) {
            enemyBullets.push(...bossBullets);
        } else if (bossBullets) {
            enemyBullets.push(bossBullets);
        }
    }
}

function checkCollisions() {
    // Check player bullet-enemy collisions
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = enemies.length - 1; j >= 0; j--) {
            if (bullets[i] && enemies[j] && bullets[i].collidesWith(enemies[j])) {
                bullets.splice(i, 1);
                enemies.splice(j, 1);
                score += 10;
                currentTime += 2; // Add 2 seconds for each kill
                break;
            }
        }
    }

    // Check enemy bullet-player collisions
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
        if (!player.isInvincible && enemyBullets[i].collidesWith(player)) {
            gameOver();
            return;
        }
    }

    // Check player-enemy collisions
    for (let i = enemies.length - 1; i >= 0; i--) {
        if (!player.isInvincible && checkPlayerEnemyCollision(player, enemies[i])) {
            gameOver();
            return;
        }
    }

    if (boss) {
        for (let i = bullets.length - 1; i >= 0; i--) {
            if (bullets[i] && bullets[i].collidesWith(boss)) {
                bullets.splice(i, 1);
                if (boss.takeDamage(10)) { // Returns true if boss dies
                    score += 50;
                    boss = null;
                    nextBossScore = Math.ceil(score / 200) * 200; // Next multiple of 200
                }
                break;
            }
        }
    }
}

function checkPlayerEnemyCollision(player, enemy) {
    return (
        player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
    );
}

function gameOver() {
    if (isGameOver) return; // Prevent multiple calls
    isGameOver = true;
    
    const gameOverElement = document.getElementById('gameOver');
    const finalScoreElement = document.getElementById('finalScore');
    const restartButton = document.getElementById('restartButton');
    
    // Update the final score
    finalScoreElement.textContent = score;
    
    // Show the game over panel
    gameOverElement.classList.remove('hidden');
    
    // Remove any existing listeners first
    restartButton.removeEventListener('click', resetGame);
    // Add new listener
    restartButton.addEventListener('click', resetGame);
}

function resetGame() {
    const gameOverElement = document.getElementById('gameOver');
    gameOverElement.classList.add('hidden');
    
    // Cancel the previous animation frame
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    
    // Reset game variables
    enemies = [];
    enemyBullets = [];
    bullets = [];
    boss = null;
    nextBossScore = 100;
    score = 0;
    currentTime = 30;
    timerLastUpdated = Date.now();
    isGameOver = false;
    
    // Clear any existing intervals
    clearAllIntervals();
    
    isGameStarted = true; // Make sure the game stays started after reset
    init();
}

// Add this new function to clear intervals
function clearAllIntervals() {
    // Clear all existing intervals
    const highestId = window.setInterval(() => {}, Number.MAX_SAFE_INTEGER);
    for (let i = 1; i <= highestId; i++) {
        window.clearInterval(i);
    }
}

// Update the updateTimer function
function updateTimer() {
    const now = Date.now();
    if (now - timerLastUpdated >= 1000) {
        currentTime -= 1;
        timerLastUpdated = now;
    }
    if (currentTime <= 0) {
        gameOver();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    bullets.forEach(bullet => bullet.draw(ctx));
    enemyBullets.forEach(bullet => bullet.draw(ctx));  // Remove the red fillStyle override
    enemies.forEach(enemy => enemy.draw(ctx));
    drawScore();
    drawTimer();
    if (boss) {
        boss.draw(ctx);
    }
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function drawTimer() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Time: ' + currentTime, canvas.width - 100, 20);
}

function gameLoop() {
    if (!isGameStarted) {
        return;
    }
    
    if (!isGameOver && !isPaused) {
        update();
        draw();
    } else if (isPaused) {
        drawPauseScreen();
    }
    animationFrameId = requestAnimationFrame(gameLoop);
}

function drawPauseScreen() {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
    ctx.font = '24px Arial';
    ctx.fillText('Press ESC to resume', canvas.width / 2, canvas.height / 2 + 40);
    ctx.restore();
}

window.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
        isPaused = !isPaused;
        return;
    }
    
    if (isPaused) return; // Ignore other inputs while paused
    
    switch(event.code) {
        case 'KeyA': 
            player.movementKeys.left = true;
            break;
        case 'KeyD': 
            player.movementKeys.right = true;
            break;
        case 'KeyW': 
            player.movementKeys.up = true;
            break;
        case 'KeyS':  
            player.movementKeys.down = true;
            break;
        case 'Space': {
            const bullet = new Bullet(
                player.x + player.width / 2 - 2.5,
                player.y,
                10,
                '#FFE034FF' 
            );
            bullets.push(bullet);
            break;
        }
         case 'KeyI':  // Press 'I' to toggle invincibility
            player.toggleInvincibility();
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch(event.code) {
        case 'KeyA':  
            player.movementKeys.left = false;
            break;
        case 'KeyD': 
            player.movementKeys.right = false;
            break;
        case 'KeyW':  
            player.movementKeys.up = false;
            break;
        case 'KeyS':  
            player.movementKeys.down = false;
            break;
    }
});

document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('startScreen').style.display = 'none';
    isGameStarted = true;
    init();
});