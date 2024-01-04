export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });
    }

    init(data) {
        this.score = data || 0;
        console.log(this.score);
    }

    preload() {
        this.canvas = this.sys.game.canvas;
    }

    create() {
        const { width, height } = this.canvas; // la anchura y altura del canvas
        const scene = this;

        this.sound.stopAll();
        this.sound.add('stageMusic').play();
        this.jumpSound = this.sound.add('jumpEffect');
        this.failSound = this.sound.add('failureEffect');

        this.add.image(0,200,'bg1').setScale(1).setOrigin(0,0);
        scene.scoreText = scene.add.text(width/2, 50, "SCORE: " + scene.score.score, {
            fontFamily: 'arcade_classic',
            fontSize: 24,
        }).setOrigin(0.5, 0.5);

        this.scoreInterval = setInterval(() => {
            scene.score.score -= 50;
            if (this.score <= 0) {
              clearInterval(this.intervalo);
            }
          }, 1000); // 2000 milisegundos = 2 segundos
    }

    preupdate() {

    }

    update() {
        const scene = this;
        scene.scoreText.setText("SCORE: " + scene.score.score);
    }
}