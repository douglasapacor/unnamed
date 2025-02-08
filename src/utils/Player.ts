import * as CANNON from "cannon-es";
import * as THREE from "three";
import { events } from "../helpers/Events";
import { Attributes } from "./Attributes";
import Entity from "./Entity";

export default class Player extends Entity {
  private cube?: THREE.Mesh;
  private showBoxCollider?: boolean;
  public attributes: Attributes = new Attributes();

  private moving_left: boolean = false;
  private moving_right: boolean = false;
  private moving_up: boolean = false;
  private moving_down: boolean = false;

  constructor(params: {
    scene: THREE.Scene;
    world: CANNON.World;
    input: Phaser.Input.InputPlugin;
    path: string;
    name?: string;
    showBoxCollider?: boolean;
  }) {
    super(params.world, params.scene, params.path, params.name);
    this.boxcolliderSettings(params.showBoxCollider, params.scene);
    this.setupControls(params.input);
  }

  private boxcolliderSettings(show: boolean, scene: THREE.Scene) {
    this.showBoxCollider = show;

    if (this.showBoxCollider) {
      this.cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 2, 0.3),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        })
      );

      scene.add(this.cube);
    }
  }

  private setupControls(input: Phaser.Input.InputPlugin): void {
    input.keyboard.on("keydown-" + "W", () => {
      this.moving_up = true;
    });
    input.keyboard.on("keyup-" + "W", () => {
      this.moving_up = false;
    });

    input.keyboard.on("keydown-" + "S", () => {
      this.moving_down = true;
    });
    input.keyboard.on("keyup-" + "S", () => {
      this.moving_down = false;
    });

    input.keyboard.on("keydown-" + "A", () => {
      this.moving_left = true;
    });
    input.keyboard.on("keyup-" + "A", () => {
      this.moving_left = false;
    });

    input.keyboard.on("keydown-" + "D", () => {
      this.moving_right = true;
    });
    input.keyboard.on("keyup-" + "D", () => {
      this.moving_right = false;
    });
  }

  private moveSystem(): void {
    if (this.moving_up) this.body.velocity.z -= this.attributes.speed;
    if (this.moving_down) this.body.velocity.z += this.attributes.speed;
    if (this.moving_left) this.body.velocity.x -= this.attributes.speed;
    if (this.moving_right) this.body.velocity.x += this.attributes.speed;
  }

  private animationSystem(): void {
    if (
      this.moving_up ||
      this.moving_down ||
      this.moving_left ||
      this.moving_right
    ) {
      this.playAnimation("running_001");
    } else {
      this.playAnimation("idle_001");
    }
  }

  private boxcolliderSystem(): void {
    if (this.showBoxCollider) {
      this.cube.position.copy(
        new THREE.Vector3(
          this.body.position.x,
          this.body.position.y + 1,
          this.body.position.z
        )
      );

      this.cube.quaternion.copy(
        new THREE.Quaternion(
          this.body.quaternion.z,
          this.body.quaternion.y,
          this.body.quaternion.z,
          this.body.quaternion.w
        )
      );
    }
  }

  private positionSystem(): void {
    events.emit("player_position", {
      position: {
        x: this.body.position.x,
        y: this.body.position.y + 1,
        z: this.body.position.z,
      },
    });
  }

  private rotationSystem(): void {
    if (this.body.velocity.x !== 0 || this.body.velocity.z !== 0) {
      this.model.rotation.y = THREE.MathUtils.lerp(
        this.model.rotation.y,
        Math.atan2(this.body.velocity.x, this.body.velocity.z),
        1
      );
    }
  }

  public update(delta: number): void {
    super.update(delta);

    this.positionSystem();
    this.boxcolliderSystem();
    this.moveSystem();
    this.rotationSystem();
    this.animationSystem();
  }
}
