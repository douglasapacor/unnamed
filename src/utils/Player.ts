import * as CANNON from "cannon-es";
import * as THREE from "three";
import { cameraEvents } from "../helpers/events";
import Entity from "./Entity";
import { Features } from "./Features";
import Collider from "./Collider";

export default class Player extends Entity {
  public features: Features = new Features();
  private aggro: Collider;

  private textSprite: THREE.Sprite;
  private textCanvas: HTMLCanvasElement;
  private textTexture: THREE.CanvasTexture;

  constructor(params: {
    scene: THREE.Scene;
    world: CANNON.World;
    path: string;
    position?: CANNON.Vec3;
  }) {
    super({
      scene: params.scene,
      path: params.path,
      world: params.world,
      position: params.position,
      name: "player",
    });

    this.aggro = new Collider(
      { name: "aggro", radius: 5, debug: true, collisionResponse: false },
      params.scene,
      params.world
    );

    this.textCanvas = document.createElement("canvas");
    this.textCanvas.width = 356;
    this.textCanvas.height = 128;
    const ctx = this.textCanvas.getContext("2d")!;
    ctx.font = "Bold 24px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Jogador", 40, 64);

    this.textTexture = new THREE.CanvasTexture(this.textCanvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: this.textTexture });
    this.textSprite = new THREE.Sprite(spriteMaterial);
    this.textSprite.scale.set(2, 1, 1);
    params.scene.add(this.textSprite);
  }

  public update(delta: number): void {
    super.update(delta);

    if (this.movement.left) this.playAnimation("running_001");
    if (this.movement.right) this.playAnimation("running_001");
    if (this.movement.up) this.playAnimation("running_001");
    if (this.movement.down) this.playAnimation("running_001");
    if (this.movement.idle) this.playAnimation("idle_001");

    if (this.loaded) {
      cameraEvents.emit(
        "player_position",
        new THREE.Vector3(
          this.collisionBody.position.x,
          this.collisionBody.position.y,
          this.collisionBody.position.z
        )
      );

      this.textSprite.position.set(
        this.collisionBody.position.x,
        this.collisionBody.position.y + 2,
        this.collisionBody.position.z
      );

      this.aggro.attach(this.collisionBody.position);
    }
  }

  setText(newText: string) {
    const ctx = this.textCanvas.getContext("2d")!;

    ctx.clearRect(0, 0, this.textCanvas.width, this.textCanvas.height);

    ctx.font = "Bold 24px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(
      newText,
      this.textCanvas.width / 2,
      this.textCanvas.height / 2
    );

    this.textTexture.needsUpdate = true;
  }
}
