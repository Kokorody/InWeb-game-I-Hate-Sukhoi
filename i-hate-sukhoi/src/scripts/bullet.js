class Bullet {
    constructor(x, y, speed = 10, color = '#FFE034FF') {  
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 5;
        this.height = 15;
        this.color = color;
    }

    update() {
        this.y -= this.speed;
    }

    draw(context) {
        context.fillStyle = this.color;
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