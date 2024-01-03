export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
        this.canvas = this.sys.game.canvas;
    }

    create() {
        const { width, height } = this.canvas; // la anchura y altura del canvas

        // fondo estrellas
        this.add.image(width/2, height/2 - 100, 'stars').setScale(3).setOrigin(0.5, 0.5);
        // titulo
        this.add.text(width/2, height/2 - 100, "CIRCUS", {
            fontFamily: 'arcade_classic',
            fontSize: 48,
        }).setOrigin(0.5, 0.5);
        
        // botones dificultad
        let easy = this.add.text(width/2, height/2 + 50, "EASY", {
            fontFamily: 'arcade_classic',
            fontSize: 24,
        }).setOrigin(0.5, 0.5).setInteractive();
        let normal = this.add.text(width/2, height/2 + 100, "NORMAL", {
            fontFamily: 'arcade_classic',
            fontSize: 24,
        }).setOrigin(0.5, 0.5);
        let hard = this.add.text(width/2, height/2 + 150, "HARD", {
            fontFamily: 'arcade_classic',
            fontSize: 24,
        }).setOrigin(0.5, 0.5);

        easy.on('pointerdown', () => {
            this.scene.start('Level');
        });
        normal.on('pointerdown', () => {
            this.scene.start('Level');
        });
        hard.on('pointerdown', () => {
            this.scene.start('Level');
        });
    }
}