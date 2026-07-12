import { catWidthForFloor, INITIAL_CAT_WIDTH, LOGICAL_WIDTH, perfectTolerance, speedForFloor } from './config';
import { scorePlacement } from './scoring';
import type { CatBlock, DropResult, GameMode, GameState, MovingCat, PlacementResult } from './types';

export function getOverlap(moving: CatBlock, support: CatBlock): number {
  return Math.max(0, Math.min(moving.x + moving.width, support.x + support.width) - Math.max(moving.x, support.x));
}

export function judgePlacement(moving: CatBlock, support: CatBlock, floor: number): PlacementResult {
  const overlap = getOverlap(moving, support);
  if (overlap <= 0) {
    return { success: false, perfect: false, block: null, overlap: 0, trimmedLeft: 0, trimmedRight: 0 };
  }

  const movingCenter = moving.x + moving.width / 2;
  const supportCenter = support.x + support.width / 2;
  const offset = Math.abs(movingCenter - supportCenter);
  const perfect = offset <= perfectTolerance(moving.width, floor);
  const perfectWidth = Math.min(moving.width, support.width);
  const block = perfect
    ? { x: supportCenter - perfectWidth / 2, width: perfectWidth }
    : { x: Math.max(moving.x, support.x), width: overlap };
  const trimmedLeft = Math.max(0, support.x - moving.x);
  const trimmedRight = Math.max(0, moving.x + moving.width - (support.x + support.width));
  return { success: true, perfect, block, overlap, trimmedLeft, trimmedRight };
}

export function advanceMovingCat(cat: MovingCat, elapsedSeconds: number, floor = 0, mode: GameMode = 'normal'): MovingCat {
  const maxX = LOGICAL_WIDTH - cat.width;
  if (maxX <= 0) return { ...cat, x: 0, direction: 1 };
  let position = cat.x + cat.direction * speedForFloor(floor, cat.width, mode) * Math.max(0, elapsedSeconds);
  let direction = cat.direction;
  while (position < 0 || position > maxX) {
    if (position > maxX) {
      position = maxX * 2 - position;
      direction = -1;
    } else {
      position = -position;
      direction = 1;
    }
  }
  return { ...cat, x: position, direction };
}

export function createInitialGameState(mode: GameMode = 'normal'): GameState {
  const x = (LOGICAL_WIDTH - INITIAL_CAT_WIDTH) / 2;
  return {
    mode,
    support: { x, width: INITIAL_CAT_WIDTH },
    moving: { x: 0, width: INITIAL_CAT_WIDTH, direction: 1 },
    floor: 0,
    score: 0,
    combo: 0,
    maxCombo: 0,
    gameOver: false,
  };
}

export function placeMovingCat(state: GameState): DropResult {
  if (state.gameOver) {
    const placement = judgePlacement(state.moving, state.support, state.floor + 1);
    return { state, placement, gained: 0 };
  }
  const placement = judgePlacement(state.moving, state.support, state.floor + 1);
  if (!placement.success || !placement.block) {
    return { state: { ...state, combo: 0, gameOver: true }, placement, gained: 0 };
  }
  const scored = scorePlacement(state.score, state.combo, placement.perfect);
  const nextFloor = state.floor + 1;
  const direction = state.moving.direction === 1 ? -1 : 1;
  const nextWidth = catWidthForFloor(nextFloor, state.mode, placement.block.width);
  const movingX = direction === 1 ? 0 : LOGICAL_WIDTH - nextWidth;
  const nextState: GameState = {
    mode: state.mode,
    support: placement.block,
    moving: { x: movingX, width: nextWidth, direction },
    floor: nextFloor,
    score: scored.score,
    combo: scored.combo,
    maxCombo: Math.max(state.maxCombo, scored.combo),
    gameOver: false,
  };
  return { state: nextState, placement, gained: scored.gained };
}
