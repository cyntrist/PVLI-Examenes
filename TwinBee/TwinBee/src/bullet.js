const speed = 100;

export default class Sprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, image) {
        super(scene, x, y, image);
        this.setScale(1);
        this.moves = true;
        this.depth = 10;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setImmovable(true);
    }

    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
        if (this.moves) {
            this.move();
        }
    }

    move() {
        this.setVelocityY(-speed);
    }

    die() {
        this.moves = false;
        this.setVelocity(0);
    }
}