import {
  AdditiveBlending,
  Scene,
  Sprite,
  SpriteMaterial,
  Texture,
  TextureLoader,
} from "three";
const fire_02 = "/assets/effects/Texture/transparent/fire_02.png";
const flame_04 = "/assets/effects/Texture/transparent/flame_04.png";

export class FireSkill {
  private textureLoader: TextureLoader = new TextureLoader();
  private texture_01: Texture;
  private texture_02: Texture;
  private material_01: SpriteMaterial;
  private material_02: SpriteMaterial;
  private itens: any[] = [];

  constructor(private params: { scene: Scene }) {
    this.texture_01 = this.textureLoader.load(fire_02);
    this.texture_02 = this.textureLoader.load(flame_04);

    this.material_01 = new SpriteMaterial({
      map: this.texture_01,
      color: 0xff6600,
      blending: AdditiveBlending,
    });

    this.material_02 = new SpriteMaterial({
      map: this.texture_02,
      color: 0xff2200,
      blending: AdditiveBlending,
    });

    const sprite_01 = new Sprite(this.material_01);
    const sprite_02 = new Sprite(this.material_02);

    sprite_01.scale.set(0.5, 0.5, 0.5);
    sprite_02.scale.set(0.5, 0.5, 0.5);

    this.params.scene.add(sprite_01);
    this.params.scene.add(sprite_02);
  }

  update(delta: number): void {
    this.itens.forEach((item, i) => {});
  }
}
