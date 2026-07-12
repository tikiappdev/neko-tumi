import { BASE_SCORE, COMBO_STEP_BONUS, MAX_COMBO_BONUS, PERFECT_BONUS } from './config';
import type { ScoreResult } from './types';

export function scorePlacement(score: number, combo: number, perfect: boolean): ScoreResult {
  if (!perfect) return { gained: BASE_SCORE, score: score + BASE_SCORE, combo: 0 };

  const nextCombo = combo + 1;
  const comboBonus = Math.min(MAX_COMBO_BONUS, Math.max(0, nextCombo - 1) * COMBO_STEP_BONUS);
  const gained = BASE_SCORE + PERFECT_BONUS + comboBonus;
  return { gained, score: score + gained, combo: nextCombo };
}
