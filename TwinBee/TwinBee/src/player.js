import Bullet from "./bullet.js";

const speed = 200;
const cooldown = 100;

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, number) {
        super(scene, x, y, { key: 'player' });
        this.input = true;
        this.setScale(1);
        this.depth = 1;
        this.dead = false;
        this.number = number;
        this.level = 1;

        this.shootSound = scene.sound.add('shootSfx');
        this.deadSound = scene.sound.add('deadSfx');

        if (this.number === 1) {
            this.idleAnim = 'twinIdle';
            this.leftAnim = 'twinLeft';
            this.rightAnim = 'twinRight';
            this.shootAnim = 'twinShoot';
            this.cursors = scene.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                right: Phaser.Input.Keyboard.KeyCodes.D,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                shoot: Phaser.Input.Keyboard.KeyCodes.SPACE,
                escape: Phaser.Input.Keyboard.KeyCodes.ESC
            });
        }
        else {
            this.idleAnim = 'winIdle';
            this.leftAnim = 'winLeft';
            this.rightAnim = 'winRight';
            this.shootAnim = 'winShoot';
            this.cursors = scene.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.UP,
                right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                shoot: Phaser.Input.Keyboard.KeyCodes.ENTER,
                escape: Phaser.Input.Keyboard.KeyCodes.ESC
            });
        }
        this.play(this.idleAnim);


        scene.add.existing(this);
        scene.physics.world.enable(this);
    }

    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
        this.move();
    }

    move() {
        if (this.input) {
            this.setVelocity(0);

            if (this.cursors.left.isDown && (this.x - this.width / 2) > 0) {
                this.setVelocityX(-speed);
                this.animate(this.leftAnim);
            }
            if (this.cursors.right.isDown && (this.x + this.width / 2) < this.scene.width) {
                this.setVelocityX(speed);
                this.animate(this.rightAnim);
            }
            if (this.cursors.up.isDown && (this.y - this.height / 2) > 0) {
                this.setVelocityY(-speed);
            }
            if (this.cursors.down.isDown && (this.y + this.height / 2) < this.scene.height) {
                this.setVelocityY(speed);
            }

            if (this.body.velocity.x === 0) {
                this.animate(this.idleAnim);
            }

            if (this.cursors.shoot.isDown) {
                this.shoot();
            }
        }
        else {
            this.setVelocity(0);
            this.body.setImmovable(true);
        }
    }

    animate(anim) {
        if (this.anims.currentAnim.key !== anim) {
            this.anims.play(anim);
        }
    }

    shoot() {
        this.shootSound.play();
        switch (this.level) {
            case 1:
                this.spawnBullet();
                break;
            case 2:
                this.spawnBullet();
                this.spawnBullet();

                break;
            case 3:
                this.spawnBullet();
                this.spawnBullet();
                this.spawnBullet();
                this.spawnBullet();

                break;
            default:
                break;
        }

        this.animate(this.shootAnim);
    }

    spawnBullet() {
        const bullet = new Bullet();
        scene.bulletPool.push(bullet);
    }

    die() {
        this.dead = true;
        this.deadSound.play();
        this.scene.eventEmitter.emit('lose');
        this.destroy();
    }
}