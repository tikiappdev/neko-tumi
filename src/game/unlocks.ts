import type { BackgroundStage, CatId } from './types';

export interface UnlockStats {
  bestScore: number;
  highestFloor: number;
  totalPlays: number;
  maxPerfectCombo: number;
}

export const CAT_UNLOCK_ORDER: readonly CatId[] = [
  'white', 'black', 'calico', 'tabby', 'tuxedo', 'sleepy', 'happy', 'gold', 'rainbow',
];

export function unlockedCats(stats: UnlockStats): CatId[] {
  const unlocked: CatId[] = ['white'];
  if (stats.totalPlays >= 1) unlocked.push('black');
  if (stats.highestFloor >= 3) unlocked.push('calico');
  if (stats.highestFloor >= 6) unlocked.push('tabby');
  if (stats.totalPlays >= 5) unlocked.push('tuxedo');
  if (stats.maxPerfectCombo >= 2) unlocked.push('sleepy');
  if (stats.bestScore >= 1500) unlocked.push('happy');
  if (stats.highestFloor >= 15) unlocked.push('gold');
  if (stats.bestScore >= 4000 && stats.maxPerfectCombo >= 4) unlocked.push('rainbow');
  return unlocked;
}

export function newlyUnlockedCats(before: UnlockStats, after: UnlockStats): CatId[] {
  const previous = new Set(unlockedCats(before));
  return unlockedCats(after).filter((cat) => !previous.has(cat));
}

export function backgroundForFloor(floor: number): BackgroundStage {
  if (floor >= 25) return 'space';
  if (floor >= 18) return 'night';
  if (floor >= 12) return 'sunset';
  if (floor >= 7) return 'clouds';
  if (floor >= 3) return 'town';
  return 'ground';
}
