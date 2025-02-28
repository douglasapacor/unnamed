import { Event } from "./lib/Event";
import { GameState } from "./lib/GameState";

const gameState = new GameState();
const cameraEvents = new Event();

export { cameraEvents, gameState };
