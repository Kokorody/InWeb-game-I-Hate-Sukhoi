class Enemy {
    constructor(x, y, speed = 1) {  // Added default speed
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = speed;
        this.image = new Image();
        this.image.src = 'assets/enemy.png';
    }

     update() {
        this.y += this.speed;
        
        // Random chance to shoot (2%)
        if (Math.random() < 0.01) {
            return new Bullet(
                this.x + this.width / 2,
                this.y + this.height,
                -4  // Negative speed means bullet goes down
            );
        }
        return null;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    isOffScreen(height) {
        return this.y > height;
    }

    resetPosition() {
        this.y = 0;
        this.x = Math.random() * (canvas.width - this.width);
    }
}