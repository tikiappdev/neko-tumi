export type Direction = -1 | 1;
export type GameMode = 'normal' | 'balance';

export type CatId =
  | 'white'
  | 'black'
  | 'calico'
  | 'tabby'
  | 'tuxedo'
  | 'gold'
  | 'rainbow'
  | 'sleepy'
  | 'happy';

export interface CatBlock {
  x: number;
  width: number;
}

export interface MovingCat extends CatBlock {
  direction: Direction;
}

export interface PlacementResult {
  success: boolean;
  perfect: boolean;
  block: CatBlock | null;
  overlap: number;
  trimmedLeft: number;
  trimmedRight: number;
}

export interface ScoreResult {
  gained: number;
  score: number;
  combo: number;
}

export type BackgroundStage = 'ground' | 'town' | 'clouds' | 'sunset' | 'night' | 'space';

export interface GameState {
  mode: GameMode;
  support: CatBlock;
  moving: MovingCat;
  floor: number;
  score: number;
  combo: number;
  maxCombo: number;
  gameOver: boolean;
}

export interface DropResult {
  state: GameState;
  placement: PlacementResult;
  gained: number;
}
