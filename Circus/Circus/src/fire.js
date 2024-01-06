export default class Fire extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.play('fireAnim');
        this.setScale(3);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.body.setSize(20, 20);
        this.body.y -= 100;
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
    }
}