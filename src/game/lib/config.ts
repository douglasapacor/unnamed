import Start from "../scenes/Start";

const configs: Phaser.Types.Core.GameConfig = {
  title: "uknownProject",
  parent: "game",
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#212121",
  render: {
    antialias: false,
  },
  type: Phaser.AUTO,
  scene: [Start],
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.outerWidth,
    height: window.outerHeight,
  },
  pixelArt: true,
  roundPixels: true,
};

export default configs;
