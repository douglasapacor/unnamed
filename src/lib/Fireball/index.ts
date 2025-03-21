import { Body, Sphere, World } from "cannon-es";
import {
  MathUtils,
  Scene,
  Sprite,
  SpriteMaterial,
  Texture,
  TextureLoader,
  Vector3,
} from "three";

export class Fireball {
  private frameCount = 60;
  private currentFrame = 0;
  private frames: Texture[] = [];
  private textureLoader = new TextureLoader();
  private spriteMaterial = new SpriteMaterial();
  private sprite = new Sprite();
  private fireballBody = new Body();
  private _lastRotationY: number = 0;

  constructor(private params: { scene: Scene; world: World }) {
    for (let i = 1; i <= this.frameCount; i++) {
      const frameName = `/assets/images/skills/fireball/${i
        .toString()
        .padStart(4, "0")}.png`;
      this.frames.push(this.textureLoader.load(frameName));
    }

    this.spriteMaterial = new SpriteMaterial({
      map: this.frames[0],
      transparent: true,
    });
    this.sprite = new Sprite(this.spriteMaterial);
    this.sprite.scale.set(2, 2, 1);
    this.sprite.position.set(0, 1, 0);

    this.params.scene.add(this.sprite);

    this.fireballBody = new Body({
      mass: 1,
      shape: new Sphere(0.5),
    });
    this.fireballBody.position.set(0, 1, 0);
    this.fireballBody.velocity.set(0, 0, -10);
    this.params.world.addBody(this.fireballBody);
  }

  private rotation(): void {
    if (
      this.fireballBody.velocity.x !== 0 ||
      this.fireballBody.velocity.z !== 0
    ) {
      const targetRotation = Math.atan2(
        this.fireballBody.velocity.x,
        this.fireballBody.velocity.z
      );

      this.spriteMaterial.rotation = MathUtils.lerp(
        this.sprite.rotation.y,
        targetRotation,
        1
      );

      this._lastRotationY = this.spriteMaterial.rotation;
    } else {
      this.sprite.rotation.y = this._lastRotationY;
    }
  }

  chase(targetPosition: Vector3) {
    const direction = targetPosition
      .clone()
      .sub(this.fireballBody.position)
      .normalize();

    this.fireballBody.velocity.set(
      direction.x * 10,
      this.fireballBody.velocity.y,
      direction.z * 10
    );
  }

  update() {
    this.sprite.position.copy(this.fireballBody.position);
    this.sprite.quaternion.copy(this.fireballBody.quaternion);
    this.currentFrame = (this.currentFrame + 1) % this.frames.length;
    this.spriteMaterial.map = this.frames[this.currentFrame];

    this.rotation();
  }
}
