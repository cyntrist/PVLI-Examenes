export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, {key: 'player'});
        this.play('clownIdle');
        scene.add.existing(this);
        scene.physics.world.enable(this);  
        this.setScale(3);   
        this.dead = false;
        this.cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });
        this.jumpSound = scene.sound.add('jumpEffect');
    }

    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
        this.move();
    }

    move() {
        if (!this.dead) {
            if (this.cursors.right.isDown) {
                this.setVelocityX(200);
            }
            else {
                this.setVelocityX(0);
            }

            if (this.cursors.up.isDown && this.body.touching.down) {
                this.setVelocityY(-400);
                this.anims.play('clownJump');
                this.jumpSound.play();
            }
            else if (this.body.touching.down) {
                this.anims.play('clownIdle');
            }
        }
    }
}