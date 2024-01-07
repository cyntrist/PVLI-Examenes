const speedX = 100;
const speedY = -100;

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, { key: 'player' });
        this.play('playerIdle');
        this.dead = false;
        this.wins = false;
        this.setScale(1);
        this.depth = 1;
        this.jumpSound = scene.sound.add('jumpEffect');
        this.cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            interact: Phaser.Input.Keyboard.KeyCodes.E,
            escape: Phaser.Input.Keyboard.KeyCodes.ESC
        });
        scene.add.existing(this);
        scene.physics.world.enable(this);
    }

    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
        this.move();
    }

    move() {
        if (!this.dead && !this.wins) {
            if (this.cursors.right.isDown) {
                this.setVelocityX(speedX);
            }
            else {
                this.setVelocityX(0);
            }

            if (this.cursors.up.isDown && this.body.touching.down) {
                this.setVelocityY(speedY);
                if (this.anims.currentAnim.key !== 'playerJump')
                    this.anims.play('playerJump');
                this.jumpSound.play();
            }
            else if (this.body.touching.down) {
                if (this.anims.currentAnim.key !== 'playerIdle')
                    this.anims.play('playerIdle');
            }
        }
        else {
            this.setVelocity(0);
            this.body.setAllowGravity(false);
            this.body.setImmovable(true);
        }
    }

    win() {
        if (this.anims.currentAnim.key !== 'playerWin')
            this.play('playerWin');
        this.wins = true;
        this.depth = 10;
    }

    die() {
        if (this.anims.currentAnim.key !== 'playerDie')
            this.play('playerDie');
        this.dead = true;
        this.depth = 10;
    }
}