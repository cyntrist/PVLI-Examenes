const speed = 50;

export default class Sprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.play('enemyAnim');
        this.setScale(1);
        this.moves = true;

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setImmovable(true);

        scene.tweens.add({
            targets: this,
            x: '-=20',
            duration: 1000,
            repeat: -1,
            // hold: 500,
            // repeatDelay: 500,
            ease: 'sine.inout',
            yoyo: true
        });
    }

    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
        if (this.moves) {
            this.move();
        }
    }

    move() {
        this.setVelocityY(speed);
    }

    die() {
        this.moves = false;
        this.setVelocity(0);
    }
}