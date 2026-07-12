import type { CatId } from '../game/types';

export interface CatMetadata {
  id: CatId;
  name: string;
  description: string;
  unlockHint: string;
}

export const CATS: readonly CatMetadata[] = [
  { id: 'white', name: 'しろねこ', description: 'まっしろで やさしい ねこ', unlockHint: 'はじめから なかま' },
  { id: 'black', name: 'くろねこ', description: 'よるが だいすきな ねこ', unlockHint: '1かい あそぼう' },
  { id: 'calico', name: 'みけねこ', description: 'みっつの いろが すてき', unlockHint: '3だん つもう' },
  { id: 'tabby', name: 'とらねこ', description: 'しましま げんきな ねこ', unlockHint: '6だん つもう' },
  { id: 'tuxedo', name: 'はちわれ', description: 'おかおの もようが おしゃれ', unlockHint: '5かい あそぼう' },
  { id: 'sleepy', name: 'ねむねこ', description: 'いつでも うとうと', unlockHint: 'ぴったりを 2かい つづけよう' },
  { id: 'happy', name: 'ごきげんねこ', description: 'にこにこ えがおの ねこ', unlockHint: '1500てん とろう' },
  { id: 'gold', name: 'きんのねこ', description: 'きらきら まぶしい ねこ', unlockHint: '15だん つもう' },
  { id: 'rainbow', name: 'にじいろねこ', description: 'にじを まとった とくべつな ねこ', unlockHint: '4000てんと ぴったり4れんぞく' },
] as const;

export function getCatMetadata(id: CatId): CatMetadata {
  return CATS.find((cat) => cat.id === id) ?? CATS[0];
}
