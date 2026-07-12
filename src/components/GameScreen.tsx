import { GameBoard, type GameBoardProps } from './GameBoard'; import { ScoreHud, type ScoreHudProps } from './ScoreHud';
export interface GameScreenProps extends Omit<ScoreHudProps, 'score'|'floors'|'bestScore'>, GameBoardProps { score: number; floors: number; bestScore: number }
export function GameScreen(props: GameScreenProps) { const { score, floors, bestScore, combo, soundEnabled, onToggleSound, onExit, ...board } = props; return <main className="game-screen"><ScoreHud {...{ score, floors, bestScore, combo, soundEnabled, onToggleSound, onExit }}/><GameBoard {...board}/></main>; }

