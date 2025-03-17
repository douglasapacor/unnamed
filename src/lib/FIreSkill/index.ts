import {
  AdditiveBlending,
  Mesh,
  MeshStandardMaterial,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Texture,
  TextureLoader,
} from "three";

export class FireSkill {
  private geometry: SphereGeometry;
  private material_01: MeshStandardMaterial;
  private material_02: SpriteMaterial;
  private material_03: SpriteMaterial;
  private mesh: Mesh;
  private texture_01: Texture;
  private texture_02: Texture;
  private texture_03: Texture;
  private itens: any[] = [];

  constructor(private params: { scene: Scene }) {
    this.geometry = new SphereGeometry(0.05, 32, 32);

    this.texture_01 = new TextureLoader().load(
      "/assets/effects/Texture/twirl_03.png"
    );

    this.texture_02 = new TextureLoader().load(
      "/assets/effects/Texture/flame_03.png"
    );

    this.texture_03 = new TextureLoader().load(
      "/assets/effects/Texture/flame_04.png"
    );

    this.material_01 = new MeshStandardMaterial({
      map: this.texture_01,
      color: 0xff6600,
      emissive: 0xff2200,
      emissiveIntensity: 0.1,
      transparent: true,
      roughness: 0.4,
    });

    this.material_02 = new SpriteMaterial({
      map: this.texture_02,
      color: 0xff6600,
      transparent: true,
      blending: AdditiveBlending,
    });

    this.material_03 = new SpriteMaterial({
      map: this.texture_03,
      color: 0xff2200,
      transparent: true,
      blending: AdditiveBlending,
    });

    this.mesh = new Mesh(this.geometry, this.material_01);

    // for (let i = 0; i < 10; i++) {
    //   const f1 = new Sprite(this.material_02);

    //   f1.position.set(
    //     Math.random() - 0.5,
    //     Math.random() - 0.5,
    //     Math.random() - 0.5
    //   );

    //   f1.scale.set(1, 1, 1);

    //   this.itens.push(f1);
    //   this.params.scene.add(f1);
    // }

    // for (let i = 0; i < 10; i++) {
    //   const f2 = new Sprite(this.material_03);

    //   f2.position.set(
    //     Math.random() - 0.3,
    //     Math.random() - 0.3,
    //     Math.random() - 0.3
    //   );

    //   f2.scale.set(1, 1, 1);

    //   this.itens.push(f2);
    //   this.params.scene.add(f2);
    // }

    this.params.scene.add(this.mesh);
  }

  update(delta: number): void {
    this.itens.forEach((item, i) => {
      const time = Date.now() * 0.002 + i;
      // const scaleFactor = 1.5 + Math.sin(time * 3) * 0.5;
      // item.scale.set(scaleFactor, scaleFactor, 1);
      // item.position.x += (Math.random() - 0.5) * 0.02;
      // item.position.y += (Math.random() - 0.5) * 0.02;
      // item.position.z += (Math.random() - 0.5) * 0.02;
      // item.rotation.z = Math.sin(time) * 0.5;
      item.material.opacity = 0.5 + Math.sin(time * 2) * 0.5;
    });
  }
}
