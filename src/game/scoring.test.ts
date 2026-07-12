import { describe, expect, it } from 'vitest';
import { scorePlacement } from './scoring';

describe('scorePlacement', () => {
  it('awards 100 and resets combo for a normal success', () => {
    expect(scorePlacement(500, 3, false)).toEqual({ gained: 100, score: 600, combo: 0 });
  });

  it('awards perfect and increasing capped combo bonuses', () => {
    expect(scorePlacement(0, 0, true)).toEqual({ gained: 200, score: 200, combo: 1 });
    expect(scorePlacement(0, 1, true).gained).toBe(250);
    expect(scorePlacement(0, 20, true).gained).toBe(450);
  });
});
