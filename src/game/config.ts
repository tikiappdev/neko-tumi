export const LOGICAL_WIDTH = 360;
export const INITIAL_CAT_WIDTH = 168;
export const SPEED_TIERS = [72, 84, 96, 108, 120, 132] as const;
export const NARROW_CAT_SPEED_CAP = 108;
export const NARROW_CAT_THRESHOLD = 72;
export const BASE_SCORE = 100;
export const PERFECT_BONUS = 100;
export const COMBO_STEP_BONUS = 50;
export const MAX_COMBO_BONUS = 250;

export function speedForFloor(floor: number, width: number): number {
  const tier = Math.min(Math.max(0, Math.floor(floor / 4)), SPEED_TIERS.length - 1);
  const speed = SPEED_TIERS[tier];
  return width < NARROW_CAT_THRESHOLD ? Math.min(speed, NARROW_CAT_SPEED_CAP) : speed;
}

export function perfectTolerance(width: number, floor: number): number {
  return floor <= 3 ? Math.max(10, width * 0.06) : Math.max(6, width * 0.05);
}
