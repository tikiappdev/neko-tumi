import type { CatId } from '../game/types';
import { unlockedCats, type UnlockStats } from '../game/unlocks';

export const PLAYER_DATA_KEY = 'neko-tsumi-tower:player-data';

export interface PlayerDataV1 extends UnlockStats {
  version: 1;
  soundEnabled: boolean;
  unlockedCatIds: CatId[];
}

export const DEFAULT_PLAYER_DATA: PlayerDataV1 = {
  version: 1,
  bestScore: 0,
  highestFloor: 0,
  totalPlays: 0,
  maxPerfectCombo: 0,
  soundEnabled: true,
  unlockedCatIds: ['white'],
};

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;

function nonNegativeInteger(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}

export function parsePlayerData(raw: string | null): PlayerDataV1 {
  if (!raw) return { ...DEFAULT_PLAYER_DATA, unlockedCatIds: [...DEFAULT_PLAYER_DATA.unlockedCatIds] };
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object' || (value as { version?: unknown }).version !== 1) {
      return { ...DEFAULT_PLAYER_DATA, unlockedCatIds: [...DEFAULT_PLAYER_DATA.unlockedCatIds] };
    }
    const candidate = value as Partial<PlayerDataV1>;
    const stats: UnlockStats = {
      bestScore: nonNegativeInteger(candidate.bestScore),
      highestFloor: nonNegativeInteger(candidate.highestFloor),
      totalPlays: nonNegativeInteger(candidate.totalPlays),
      maxPerfectCombo: nonNegativeInteger(candidate.maxPerfectCombo),
    };
    return {
      version: 1,
      ...stats,
      soundEnabled: typeof candidate.soundEnabled === 'boolean' ? candidate.soundEnabled : true,
      unlockedCatIds: unlockedCats(stats),
    };
  } catch {
    return { ...DEFAULT_PLAYER_DATA, unlockedCatIds: [...DEFAULT_PLAYER_DATA.unlockedCatIds] };
  }
}

function defaultStorage(): StorageLike | undefined {
  try {
    return typeof localStorage === 'undefined' ? undefined : localStorage;
  } catch {
    return undefined;
  }
}

export function loadPlayerData(storage: StorageLike | undefined = defaultStorage()): PlayerDataV1 {
  if (!storage) return parsePlayerData(null);
  try {
    return parsePlayerData(storage.getItem(PLAYER_DATA_KEY));
  } catch {
    return parsePlayerData(null);
  }
}

export function savePlayerData(data: PlayerDataV1, storage: StorageLike | undefined = defaultStorage()): boolean {
  if (!storage) return false;
  try {
    storage.setItem(PLAYER_DATA_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export interface GameRecord { score: number; floor: number; maxPerfectCombo: number }

export function recordGame(previous: PlayerDataV1, game: GameRecord): PlayerDataV1 {
  const stats: UnlockStats = {
    bestScore: Math.max(previous.bestScore, nonNegativeInteger(game.score)),
    highestFloor: Math.max(previous.highestFloor, nonNegativeInteger(game.floor)),
    totalPlays: previous.totalPlays + 1,
    maxPerfectCombo: Math.max(previous.maxPerfectCombo, nonNegativeInteger(game.maxPerfectCombo)),
  };
  return { version: 1, ...stats, soundEnabled: previous.soundEnabled, unlockedCatIds: unlockedCats(stats) };
}

export function setSoundEnabled(previous: PlayerDataV1, soundEnabled: boolean): PlayerDataV1 {
  return { ...previous, soundEnabled };
}
