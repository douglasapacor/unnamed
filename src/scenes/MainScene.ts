import { Vec3 } from "cannon-es";
import { dummy } from "../directories";
import ActorManager from "../lib/ActorManager";
import GameScene from "../lib/GameScene";
import { InputController } from "../lib/InputController";
import Player from "../lib/Player";
import Terrain from "../lib/Terrain";
import { FireSkill } from "../lib/FIreSkill";

export default class MainScene extends GameScene {
  private terrain!: Terrain;
  private player!: Player;
  private actorManager!: ActorManager;
  private fire!: FireSkill;

  public override preload(): void {
    this.terrain = new Terrain({ scene: this.scene, world: this.world });
    this.actorManager = new ActorManager();
    this.player = new Player({
      name: "player",
      model: dummy,
      scene: this.scene,
      world: this.world,
      position: new Vec3(0, -3, 0),
    });
    this.player.preload();
  }

  public override create(): void {
    new InputController(this.player);
    this.fire = new FireSkill({ scene: this.scene });

    // const sphereGeometry = new SphereGeometry(1, 8, 8);

    // const sphereMaterial = new MeshStandardMaterial({
    //   color: 0xff6600,
    //   emissive: 0xff2200,
    //   emissiveIntensity: 1.5,
    //   roughness: 0.4,
    // });

    // const texture = new TextureLoader().load(
    //   "/assets/effects/Texture/Particle01.png"
    // );

    // sphereMaterial.map = texture;

    // const fireballCore = new Mesh(sphereGeometry, sphereMaterial);
    // this.scene.add(fireballCore);

    // const textureLoader = new TextureLoader();
    // const fireTexture = textureLoader.load(
    //   "/assets/effects/Texture/flame_03.png"
    // );

    // const fire2Texture = textureLoader.load(
    //   "/assets/effects/Texture/flame_04.png"
    // );

    // const fireMaterial = new SpriteMaterial({
    //   map: fireTexture,
    //   color: 0xff6600, // Laranja
    //   transparent: true,
    //   blending: AdditiveBlending, // Efeito de brilho
    // });

    // const fireMaterial2 = new SpriteMaterial({
    //   map: fire2Texture,
    //   color: 0xff2200, // Laranja
    //   transparent: true,
    //   blending: AdditiveBlending, // Efeito de brilho
    // });

    // for (let i = 0; i < 10; i++) {
    //   const flame = new Sprite(fireMaterial);
    //   flame.position.set(
    //     (Math.random() - 0.5) * 2,
    //     (Math.random() - 0.5) * 2,
    //     (Math.random() - 0.5) * 2
    //   );
    //   flame.scale.set(1.5, 1.5, 1);
    //   this.scene.add(flame);
    //   this.flames.push(flame);
    // }

    // for (let i = 0; i < 10; i++) {
    //   const flame2 = new Sprite(fireMaterial2);
    //   flame2.position.set(
    //     (Math.random() - 0.3) * 2,
    //     (Math.random() - 0.3) * 2,
    //     (Math.random() - 0.3) * 2
    //   );
    //   flame2.scale.set(1.5, 1.5, 1);
    //   this.scene.add(flame2);
    //   this.flames.push(flame2);
    // }
  }

  public override update(delta: number): void {
    this.terrain.update(delta);
    this.player.update(delta);
    this.actorManager.update(this.player, delta);
    this.fire.update(delta);
    // this.flames.forEach((flame, i) => {
    //   const time = Date.now() * 0.002 + i; // Variação por chama

    //   // Tremeluzir da escala (chamas crescendo e diminuindo)
    //   const scaleFactor = 1.5 + Math.sin(time * 3) * 0.5;
    //   flame.scale.set(scaleFactor, scaleFactor, 1);

    //   // Pequenas variações na posição (simulando chamas se movendo)
    //   flame.position.x += (Math.random() - 0.5) * 0.02;
    //   flame.position.y += (Math.random() - 0.5) * 0.02;
    //   flame.position.z += (Math.random() - 0.5) * 0.02;

    //   // Rotação suave
    //   flame.rotation.z = Math.sin(time) * 0.5;

    //   // Opacidade variável (opcional)
    //   flame.material.opacity = 0.5 + Math.sin(time * 2) * 0.5;
    // });
  }
}
