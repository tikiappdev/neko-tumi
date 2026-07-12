import type { CSSProperties, KeyboardEvent } from 'react';
import { Cat } from './Cat';
import type { BackgroundStage, CatBlock } from './types';
export interface GameBoardProps { blocks: CatBlock[]; active?: CatBlock | null; background: BackgroundStage; onDrop: () => void; disabled?: boolean; announcement?: string; effect?: 'perfect' | 'combo' | 'best' | 'miss' | null; towerTilt?: number }
const pct = (value: number) => `${(value / 360) * 100}%`;
export function GameBoard({ blocks, active, background, onDrop, disabled = false, announcement = '', effect = null, towerTilt = 0 }: GameBoardProps) {
  const keyDown = (event: KeyboardEvent<HTMLDivElement>) => { if (!disabled && (event.key === ' ' || event.key === 'Enter')) { event.preventDefault(); onDrop(); } };
  return <div className={`game-board game-board--${background} ${effect ? `game-board--${effect}` : ''}`} role="button" tabIndex={disabled ? -1 : 0} aria-disabled={disabled} aria-label="ねこを落とす。タップ、スペース、またはエンター" onClick={() => !disabled && onDrop()} onKeyDown={keyDown}>
    <div className="game-board__scenery" aria-hidden="true"><span className="scenery__moon"/><span className="scenery__cloud scenery__cloud--one">☁</span><span className="scenery__cloud scenery__cloud--two">☁</span><span className="scenery__town">▥ ▥ ▥ ▥ ▥</span><span className="scenery__stars">✦ · ✧ · ✦</span></div>
    <div className="game-board__hint" aria-hidden="true">タップで おとす！</div>
    {blocks.map((block, index) => { const heightFactor = (index + 1) / Math.max(1, blocks.length); const style: CSSProperties = { left: pct(block.x), bottom: pct(block.y), width: pct(block.width), transform: `rotate(${towerTilt * heightFactor}deg)` }; return <div key={block.id} className={`cat-block cat-block--${block.state ?? 'settled'} ${Math.abs(towerTilt) > 7 ? 'cat-block--wobbly' : ''}`} style={style}><Cat kind={block.kind} decorative/></div> })}
    {active && <div className={`cat-block cat-block--active cat-block--${active.state ?? 'moving'}`} style={{ left: pct(active.x), bottom: pct(active.y), width: pct(active.width) }}><Cat kind={active.kind} decorative/></div>}
    {effect && <div className={`board-effect board-effect--${effect}`} aria-hidden="true">{effect === 'perfect' ? 'ぴったり！' : effect === 'combo' ? 'すごい！' : effect === 'best' ? 'ベスト更新！' : 'あ〜っ！'}</div>}
    <p className="sr-only" aria-live="assertive" aria-atomic="true">{announcement}</p>
  </div>;
}
