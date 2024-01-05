import Player from "./player.js";

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

        // background
        let bg1 = this.add.image(0, 200, 'bg1').setScale(1).setOrigin(0, 0);
        for (let i = 0; i <= scene.meters / 10; i++) {
            this.add.image(i * bg1.width, 200, 'bg1').setScale(1).setOrigin(0, 0);

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
        }

        // puntuacion y intervalo de bajada de puntuación
        scene.scoreText = scene.add.text(width / 2, 50, "SCORE: " + scene.score, {
            fontFamily: 'arcade_classic',
            fontSize: 24,
        }).setOrigin(0.5, 0.5).setScrollFactor(0);
        this.finish = false;
        this.scoreInterval = setInterval(() => {
            scene.score -= 50;
            if (this.score <= 0 || this.finish === true) {
                clearInterval(this.intervalo);
            }
        }, 1000); // 2000 milisegundos = 2 segundos

        // suelo
        this.colliders = []
        const floor = this.add.sprite(width * 2, height - 50, 'none').setVisible(false);
        this.colliders.push(floor);
        this.physics.world.enable(this.colliders);
        floor.body.setAllowGravity(false);
        floor.body.setImmovable(true);
        floor.body.setSize(width * scene.meters / 10 + 200, 200);

        // player
        let player = new Player(this, 100, height / 2);
        this.physics.add.collider(player, this.colliders);
        this.cameras.main.startFollow(player, 0, 1, 1, -width/2 + 100, 200);
    }

    preUpdate(time, deltaTime) {

    }

    update() {
        const scene = this;
        scene.scoreText.setText("SCORE: " + scene.score);
    }

}