import Player from "./player.js";
import Ring from "./ring.js";
import Fire from "./fire.js";
import Platform from "./platform.js";

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });
    }

    init(data) {
        this.meters = data.length;
        this.score = data.length * 100 || 0;
    }

    preload() {
        this.canvas = this.sys.game.canvas;
    }

    create() {
        const { width, height } = this.canvas; // la anchura y altura del canvas
        const scene = this;

        // audio
        this.sound.stopAll();
        this.sound.add('stageMusic', { loop: true }).play();
        this.failSound = this.sound.add('failureEffect');
        this.winSound = this.sound.add('finalEffect');

        // suelo
        const floor = this.add.sprite(width * 2, height - 30, 'none').setVisible(false);
        this.floor = floor;
        this.addObstacle(floor);
        floor.body.setSize(width * scene.meters / 10 + 200, 200);

        // player
        this.player = new Player(this, 100, floor.y - floor.height - 110);
        this.player.depth = 1;
        this.cameras.main.startFollow(this.player, 0, 1, 1, -width / 2 + 100, 200);
        this.physics.add.collider(this.player, floor);

        this.fires = [];
        this.rings = [];
        // bg y objetos
        let bg1 = this.add.image(0, 200, 'bg1').setScale(1).setOrigin(0, 0);
        for (let i = 0; i <= scene.meters / 10; i++) {
            this.add.image((i + 1) * bg1.width, 200, 'bg1').setScale(1).setOrigin(0, 0);

            // meters
            let container = scene.add.container(i * bg1.width + 120, height - 50);
            const rect = this.add.graphics();
            rect.fillStyle(0x000000); // negro
            rect.fillRect(-70, -25, 140, 50);  // fondo
            rect.lineStyle(5, 0xFF0000); // roja
            rect.strokeRect(-70, -25, 140, 50); // linea
            let text = this.add.text(0, 0, scene.meters - i * 10 + " M", {
                fontFamily: 'arcade_classic',
                fontSize: 24,
                color: 'red'
            }).setOrigin(0.5, 0.5)
            container.add(rect);
            container.add(text);

            // obstáculos
            // final
            if (i == scene.meters / 10) {
                let platform = new Platform(this, i * bg1.width + 120, floor.y - floor.height - 120);
                this.platform = platform;
                this.addObstacle(platform);
                this.physics.add.collider(this.player, platform, this.onWin, null, this);
            }
            // jarron y anillo
            else if (i > 2) {
                let fire = new Fire(this, i * bg1.width + 120, floor.y - floor.height - 120);
                this.addObstacle(fire);
                this.fires.push(fire);
                this.physics.add.collider(this.player, fire, this.onDie, null, this);

                let ring = new Ring(this, (i + 1) * bg1.width, height - 320);
                this.addObstacle(ring);
                this.rings.push(ring);
                this.physics.add.collider(this.player, ring, this.onDie, null, this);
            }
            // solo anillos
            else {
                let ring = new Ring(this, (i + 1) * bg1.width, height - 320);
                this.addObstacle(ring);
                this.rings.push(ring);
                this.physics.add.collider(this.player, ring, this.onDie, null, this);
            }
        }

        // puntuacion y intervalo de bajada de puntuación
        scene.scoreText = scene.add.text(width / 2, 50, "SCORE: " + scene.score, {
            fontFamily: 'arcade_classic',
            fontSize: 24,
        }).setOrigin(0.5, 0.5).setScrollFactor(0);
        this.scoreInterval = setInterval(() => {
            scene.score -= 50;
            if (this.score <= 0) {
                clearInterval(this.scoreInterval);
            }
        }, 1000); 
    }

    preUpdate(time, deltaTime) {

    }

    update() {
        const scene = this;
        scene.scoreText.setText("SCORE: " + scene.score);
    }

    addObstacle(obstacle) {
        this.physics.world.enable(obstacle);
        obstacle.body.setAllowGravity(false);
        obstacle.body.setImmovable(true);
        this.physics.add.collider(obstacle, this.floor);
    }

    onDie() {
        this.sound.stopAll();
        this.failSound.play();
        this.player.die();
        this.stopRings();
        this.endGame();
    }

    onWin() {
        this.sound.stopAll();
        this.winSound.play();
        this.player.win();
        this.stopRings();
        this.endGame();
    }

    stopRings() {
        this.rings.forEach(ring => {
            ring.die(); 
        });
    }

    endGame() {
        clearInterval(this.scoreInterval);
        setTimeout(() => {
            this.scene.start('Menu');
        }, 4000); 
    }
}