# i hate sukhoi

A browser-based shooting game built with vanilla JavaScript where players defend against waves of enemies and challenging boss battles.

![image](https://github.com/user-attachments/assets/b1b4cbf2-9fb9-4192-8038-1325b8a62882)


## 🎮 Game Features

- **Player Controls**:
  - Arrow keys for movement
  - Spacebar to shoot
  - 'I' key to toggle invincibility (debug mode, if u are skill issue and want to see the boss)

- **Gameplay Elements**:
  - Regular enemies with shooting capabilities
  - Boss battles every 200 points (first boss at 100 points)
  - Time-based scoring system
  - Kill enemies to extend play time (+2 seconds per kill)

- **Boss Mechanics**:
  - 50 HP health system
  - Multiple shooting patterns
  - Dynamic movement patterns
  - Rewards 50 points when defeated

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/Kokorody/InWeb-game.git
```

2. Navigate to the project directory:
```bash
cd InWeb-game
```

3. Start a local server (using VS Code Live Server or similar)
4. Open `src/index.html` in your browser

## 🎯 How to Play

- Move your ship using arrow keys
- Shoot enemies with spacebar
- Avoid enemy bullets and collisions
- Collect points by destroying enemies
- Face boss battles at score milestones
- Survive as long as possible!

## 🔧 Technical Details

### Project Structure
```
shooting-game/
├── src/
│   ├── index.html
│   ├── styles/
│   │   └── style.css
│   ├── scripts/
│   │   ├── game.js
│   │   ├── player.js
│   │   ├── enemy.js
│   │   ├── boss.js
│   │   └── bullet.js
│   └── assets/
│       ├── player.png
│       ├── enemy.png
│       ├── boss.png
│       └── background.jpg
└── README.md
```

### Technologies Used
- HTML5 Canvas
- Vanilla JavaScript
- CSS3

## 🛠️ Development

To modify or enhance the game:

1. Fork the repository
2. Make your changes
3. Test using a local server
4. Submit a pull request


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- Boss bullets may occasionally have irregular patterns
- Background image might take a moment to load
- the game is too hard XD, you can adjust it easily btw
