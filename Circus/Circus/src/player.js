export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, {key: 'player'});
        this.play('clownIdle');
        scene.add.existing(this);
        scene.physics.world.enable(this);  
        this.setScale(3);   
        this.dead = false;
        this.wins = false;
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
        if (!this.dead && !this.wins) {
            if (this.cursors.right.isDown) {
                this.setVelocityX(200);
            }
            else if (this.body.touching.down) {
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
        else {
            if (this.dead) 
                this.anims.play('clownDie');
            else 
                this.anims.play('clownWin');
            this.setVelocity(0);
            this.body.setAllowGravity(false);
            this.body.setImmovable(true);
        }
    }

    win() {
        this.wins = true;
    }

    die() {
        this.dead = true;
    }
}