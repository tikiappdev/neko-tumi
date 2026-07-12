import { SoundToggle } from './SoundToggle';
export interface ScoreHudProps { score: number; floors: number; bestScore: number; combo?: number; modeLabel?: string; balance?: number; soundEnabled: boolean; onToggleSound: () => void; onExit: () => void }
export function ScoreHud({ score, floors, bestScore, combo = 0, modeLabel, balance, soundEnabled, onToggleSound, onExit }: ScoreHudProps) {
  return <header className="score-hud">
    <div className="score-hud__stats" aria-label="ゲームの記録"><span><small>スコア</small><strong>{score}</strong></span><span><small>高さ</small><strong>{floors}<i>段</i></strong></span><span><small>ベスト</small><strong>{bestScore}</strong></span></div>
    <div className="score-hud__actions"><SoundToggle enabled={soundEnabled} onToggle={onToggleSound}/><button type="button" className="icon-button" onClick={onExit} aria-label="タイトルへ戻る"><span aria-hidden="true">⌂</span><span className="icon-button__text">もどる</span></button></div>
    {modeLabel && <div className="mode-badge">{modeLabel}</div>}{balance !== undefined && <div className="balance-meter" aria-label={`塔のかたむき ${Math.round(balance * 100)}。${Math.abs(balance) < .2 ? 'あんてい' : balance > 0 ? 'みぎにかたむいています' : 'ひだりにかたむいています'}`}><span>左</span><i aria-hidden="true" style={{ left: `${50 + Math.max(-.72, Math.min(.72, balance)) / .72 * 44}%` }}>🐾</i><span>右</span></div>}<div className={`combo-pill ${combo > 1 ? 'combo-pill--show' : ''}`} aria-live="polite">⭐ ぴったり × {combo}</div>
  </header>;
}
