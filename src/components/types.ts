export type CatKind =
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
  id: string | number;
  x: number;
  y: number;
  width: number;
  kind: CatKind;
  state?: 'settled' | 'landing' | 'perfect' | 'falling';
}

export interface BestRecord {
  score: number;
  floors: number;
}

export type BackgroundStage = 'ground' | 'town' | 'clouds' | 'sunset' | 'night' | 'space';

