class Boss extends Enemy {
    constructor(x, y) {
        super(x, y, 2);  // Slightly faster than normal enemies
        this.width = 100;
        this.height = 100;
        this.health = 50;
        this.moveTimer = 0;
        this.moveInterval = 60; // Change direction every 60 frames
        this.directionX = 1;
        this.directionY = 1;
        this.shootPattern = 0; // Track current shooting pattern
        this.image = new Image();
        this.image.src = './assets/boss.png';
    }

    update() {
        // Random movement
        this.moveTimer++;
        if (this.moveTimer >= this.moveInterval) {
            this.directionX = Math.random() * 2 - 1; // Random between -1 and 1
            this.directionY = Math.random() * 2 - 1;
            this.moveTimer = 0;
        }

        // Update position with bounds checking
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;

        // Keep boss in bounds
        if (this.x < 0) this.x = 0;
        if (this.x > canvas.width - this.width) this.x = canvas.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y > canvas.height / 4) this.y = canvas.height / 4; // Keep boss in top 

        // Shooting patterns
        return this.shoot();
    }

    shoot() {
        if (Math.random() < 0.02) { // 5% chance to shoot
            this.shootPattern = (this.shootPattern + 1) % 3; // Rotate through 3 patterns
            
            switch(this.shootPattern) {
                case 0: // Spread shot
                    return [
                        new Bullet(this.x + this.width/2, this.y + this.height, -5, -1), // Center
                        new Bullet(this.x + this.width/2, this.y + this.height, -5, -0.5), // Right
                        new Bullet(this.x + this.width/2, this.y + this.height, -5, -1.5)  // Left
                    ];
                case 1: // Rapid fire
                    return [new Bullet(this.x + this.width/2, this.y + this.height, -8)];
                case 2: // Cross pattern
                    return [
                        new Bullet(this.x + this.width/2, this.y + this.height, -6, -1),
                        new Bullet(this.x + this.width/2, this.y + this.height, -6, 1)
                    ];
            }
        }
        return null;
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.die();
            return true;
        }
        return false;
    }

    die() {
        console.log("Boss defeated!");
    }
}