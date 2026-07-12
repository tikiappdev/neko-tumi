export const LOGICAL_WIDTH = 360;
export const INITIAL_CAT_WIDTH = 168;
export const SPEED_TIERS = [72, 84, 96, 108, 120, 132] as const;
export const NARROW_CAT_SPEED_CAP = 108;
export const NARROW_CAT_THRESHOLD = 72;
export const BASE_SCORE = 100;
export const PERFECT_BONUS = 100;
export const COMBO_STEP_BONUS = 50;
export const MAX_COMBO_BONUS = 250;
export const BALANCE_WIDTH_PATTERN = [168, 124, 196, 108, 178, 92, 148, 204, 116, 184] as const;
export const BALANCE_MEMORY = 0.72;
export const PERFECT_BALANCE_RECOVERY = 0.35;
export const BALANCE_TOPPLE_LIMIT = 0.72;
export const MAX_TOWER_TILT_DEGREES = 16;
export const SWAY_SPRING = 15;
export const SWAY_DAMPING = 4.8;

import type { GameMode } from './types';

export function speedForFloor(floor: number, width: number, mode: GameMode = 'normal'): number {
  const tier = Math.min(Math.max(0, Math.floor(floor / 4)), SPEED_TIERS.length - 1);
  const speed = SPEED_TIERS[tier];
  const adjusted = mode === 'balance' ? Math.round(speed * 1.12) : speed;
  return width < NARROW_CAT_THRESHOLD ? Math.min(adjusted, NARROW_CAT_SPEED_CAP) : adjusted;
}

export function catWidthForFloor(floor: number, mode: GameMode, normalWidth: number): number {
  return mode === 'balance' ? BALANCE_WIDTH_PATTERN[floor % BALANCE_WIDTH_PATTERN.length] : normalWidth;
}

export function perfectTolerance(width: number, floor: number): number {
  return floor <= 3 ? Math.max(10, width * 0.06) : Math.max(6, width * 0.05);
}
