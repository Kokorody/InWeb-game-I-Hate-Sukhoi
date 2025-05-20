class Bullet {
    constructor(x, y, speed = 7) {  // Added default speed
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 5;
        this.height = 15;
    }

    update() {
        this.y -= this.speed;
    }

    draw(context) {
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    isOffScreen(height) {
        return this.y < 0;
    }

    collidesWith(target) {
        return (
            this.x < target.x + target.width &&
            this.x + this.width > target.x &&
            this.y < target.y + target.height &&
            this.y + this.height > target.y
        );
    }
}