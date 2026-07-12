import { SoundToggle } from './SoundToggle';
export interface ScoreHudProps { score: number; floors: number; bestScore: number; combo?: number; modeLabel?: string; soundEnabled: boolean; onToggleSound: () => void; onExit: () => void }
export function ScoreHud({ score, floors, bestScore, combo = 0, modeLabel, soundEnabled, onToggleSound, onExit }: ScoreHudProps) {
  return <header className="score-hud">
    <div className="score-hud__stats" aria-label="ゲームの記録"><span><small>スコア</small><strong>{score}</strong></span><span><small>高さ</small><strong>{floors}<i>段</i></strong></span><span><small>ベスト</small><strong>{bestScore}</strong></span></div>
    <div className="score-hud__actions"><SoundToggle enabled={soundEnabled} onToggle={onToggleSound}/><button type="button" className="icon-button" onClick={onExit} aria-label="タイトルへ戻る"><span aria-hidden="true">⌂</span><span className="icon-button__text">もどる</span></button></div>
    {modeLabel && <div className="mode-badge">{modeLabel}</div>}<div className={`combo-pill ${combo > 1 ? 'combo-pill--show' : ''}`} aria-live="polite">⭐ ぴったり × {combo}</div>
  </header>;
}
