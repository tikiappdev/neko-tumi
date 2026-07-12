import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_PLAYER_DATA, PLAYER_DATA_KEY, loadPlayerData, parsePlayerData, recordGame, savePlayerData, setSoundEnabled } from './playerData';

describe('player data', () => {
  it('falls back safely for corrupt and unsupported data', () => {
    expect(parsePlayerData('{bad')).toEqual(DEFAULT_PLAYER_DATA);
    expect(parsePlayerData('{"version":2}')).toEqual(DEFAULT_PLAYER_DATA);
  });

  it('loads, normalizes and saves v1 data', () => {
    const storage = {
      getItem: vi.fn(() => JSON.stringify({ version: 1, bestScore: 1500, highestFloor: 3, totalPlays: 1, maxPerfectCombo: 0, soundEnabled: false })),
      setItem: vi.fn(),
    };
    const loaded = loadPlayerData(storage);
    expect(loaded.unlockedCatIds).toEqual(['white', 'black', 'calico', 'happy']);
    expect(loaded.soundEnabled).toBe(false);
    expect(savePlayerData(loaded, storage)).toBe(true);
    expect(storage.setItem).toHaveBeenCalledWith(PLAYER_DATA_KEY, JSON.stringify(loaded));
  });

  it('survives storage exceptions', () => {
    const storage = { getItem: () => { throw new Error('blocked'); }, setItem: () => { throw new Error('full'); } };
    expect(loadPlayerData(storage)).toEqual(DEFAULT_PLAYER_DATA);
    expect(savePlayerData(DEFAULT_PLAYER_DATA, storage)).toBe(false);
  });

  it('updates records and sound without mutating the previous value', () => {
    const muted = setSoundEnabled(DEFAULT_PLAYER_DATA, false);
    const next = recordGame(muted, { score: 200, floor: 3, maxPerfectCombo: 2 });
    expect(next).toMatchObject({ bestScore: 200, highestFloor: 3, totalPlays: 1, maxPerfectCombo: 2, soundEnabled: false });
    expect(DEFAULT_PLAYER_DATA.soundEnabled).toBe(true);
  });
});
