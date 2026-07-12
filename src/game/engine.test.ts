import { describe, expect, it } from 'vitest';
import { advanceMovingCat, createInitialGameState, getOverlap, judgePlacement, placeMovingCat } from './engine';

describe('game engine', () => {
  it('creates the expected easy initial state', () => {
    const state = createInitialGameState();
    expect(state.support).toEqual({ x: 96, width: 168 });
    expect(state.score).toBe(0);
    expect(state.gameOver).toBe(false);
  });

  it('moves and reflects without leaving the logical play area', () => {
    expect(advanceMovingCat({ x: 180, width: 168, direction: 1 }, 1, 0)).toEqual({
      x: 132, width: 168, direction: -1,
    });
  });

  it('computes overlap as a pure interval intersection', () => {
    expect(getOverlap({ x: 80, width: 100 }, { x: 120, width: 100 })).toBe(60);
    expect(getOverlap({ x: 0, width: 50 }, { x: 60, width: 50 })).toBe(0);
  });

  it('snaps a perfect placement and preserves its width', () => {
    const result = judgePlacement({ x: 102, width: 168 }, { x: 96, width: 168 }, 1);
    expect(result.perfect).toBe(true);
    expect(result.block).toEqual({ x: 96, width: 168 });
  });

  it('keeps only the overlap for a normal placement', () => {
    const result = judgePlacement({ x: 130, width: 100 }, { x: 100, width: 100 }, 5);
    expect(result.perfect).toBe(false);
    expect(result.block).toEqual({ x: 130, width: 70 });
  });

  it('ends the game on a total miss', () => {
    const state = createInitialGameState();
    const result = placeMovingCat({ ...state, moving: { ...state.moving, x: 300 } });
    expect(result.placement.success).toBe(false);
    expect(result.state.gameOver).toBe(true);
  });
});
