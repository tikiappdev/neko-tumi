import { describe, expect, it } from 'vitest';
import { backgroundForFloor, newlyUnlockedCats, unlockedCats } from './unlocks';

describe('unlocks', () => {
  it('unlocks all nine cats when every condition is met', () => {
    expect(unlockedCats({ bestScore: 4000, highestFloor: 25, totalPlays: 5, maxPerfectCombo: 4 })).toHaveLength(9);
  });

  it('reports only newly unlocked cats', () => {
    const before = { bestScore: 0, highestFloor: 2, totalPlays: 0, maxPerfectCombo: 0 };
    const after = { ...before, highestFloor: 3 };
    expect(newlyUnlockedCats(before, after)).toEqual(['calico']);
  });

  it('advances through visible background milestones', () => {
    expect(backgroundForFloor(0)).toBe('ground');
    expect(backgroundForFloor(12)).toBe('sunset');
    expect(backgroundForFloor(25)).toBe('space');
  });
});
