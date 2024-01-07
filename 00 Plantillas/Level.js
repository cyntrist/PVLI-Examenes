import Player from "./player.js";
import Sprite from "./sprite.js";
import Container from "./container.js";

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });
    }

    init(data) {
        this.data = data;
    }

    preload() {
        this.canvas = this.sys.game.canvas;
    }

    create() {
        const { width, height } = this.canvas; // la anchura y altura del canvas
        const scene = this;

        // audio
        this.sound.stopAll();
        this.sound.add('key', { loop: true }).play();
        this.soundEffect = this.sound.add('key');

        // player
        this.player = new Player(this, 0, 0);
        this.physics.add.collider(this.player, object, callback, null, this);
        this.collisionFlag = false;

        // bg 
        let background = this.add.image(0, 200, 'background').setScale(1).setOrigin(0, 0);






        this.scoreInterval = setInterval(() => {
            
        }, 1000);      
        
        this.time.delayedCall(5000, metodo(), [], this);

        this.pool = [];
        const element = new Element(this, x, y);
        this.pool.push(element);
    }

    preUpdate(time, deltaTime) {

    }

    update() {
        
    }

    onDie() {
        if (!this.collisionFlag) {
            
        }
    }

    onWin() {
        if (!this.collisionFlag) {
            
        }
    }

    endGame() {
        setTimeout(() => {
            this.scene.start('Menu');
        }, 4000);
    }
}