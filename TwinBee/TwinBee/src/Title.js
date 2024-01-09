export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Title' });
    }

    init(data) {

    }

    preload() {
        this.canvas = this.sys.game.canvas;
    }

    create() {
        const { width, height } = this.canvas; // la anchura y altura del canvas
        const scene = this;

        // musica
        this.sound.stopAll();
        //this.sound.add('menuMusic', { loop: true }).play();

        const color = Phaser.Display.Color.RandomRGB();

        // const color = new Phaser.Display.Color();
        // color.random(0, 255);
        // console.log(color);
        // titulo
        this.add.text(width / 2, 50, "TwinBee", {
            fontFamily: 'gummy',
            fontSize: 48,
        }).setOrigin(0.5, 0.5).setStroke(color.rgba, 12).setShadow(2, 2, "#333333", 2, true, true);

        // botones dificultad
        let oneplayer = this.add.text(width / 2, height - 60, "1-Player", {
            fontFamily: 'gummy',
            fontSize: 24,
            color: 'blue'
        }).setOrigin(0.5, 0.5).setInteractive().setStroke('magenta', 8);
        // botones dificultad
        let twoplayers = this.add.text(width / 2, height - 20, "2-Player", {
            fontFamily: 'gummy',
            fontSize: 24,
            color: 'magenta'
        }).setOrigin(0.5, 0.5).setInteractive().setStroke('blue', 8);

        oneplayer.on('pointerdown', () => {
            scene.scene.start('Level', { data: 1 });
        });

        twoplayers.on('pointerdown', () => {
            scene.scene.start('Level', { data: 2 });
        });
    }
}