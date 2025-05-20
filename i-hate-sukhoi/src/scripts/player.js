class Player {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.image = new Image();
        this.image.src = './assets/player.png';
        this.movementKeys = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        this.isInvincible = false;
        this.blinkInterval = null;
    }

    update() {
        // Handle diagonal movement
        if (this.movementKeys.up) this.y -= this.speed;
        if (this.movementKeys.down) this.y += this.speed;
        if (this.movementKeys.left) this.x -= this.speed;
        if (this.movementKeys.right) this.x += this.speed;

        // Keep player in bounds
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > canvas.height) this.y = canvas.height - this.height;
    }

    draw(ctx) {
        // Add transparency when invincible
        if (this.isInvincible) {
            ctx.globalAlpha = 0.5;
        }

        if (this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = this.isInvincible ? 'yellow' : 'white';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        // Reset transparency
        ctx.globalAlpha = 1.0;

        // Draw invincibility indicator
        if (this.isInvincible) {
            ctx.fillStyle = 'yellow';
            ctx.font = '14px Arial';
            ctx.fillText('INVINCIBLE', this.x, this.y - 10);
        }
    }

    toggleInvincibility() {
        this.isInvincible = !this.isInvincible;
    }
}