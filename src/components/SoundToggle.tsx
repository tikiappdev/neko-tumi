export interface SoundToggleProps { enabled: boolean; onToggle: () => void; className?: string }
export function SoundToggle({ enabled, onToggle, className = '' }: SoundToggleProps) {
  return <button type="button" className={`icon-button ${className}`} onClick={onToggle} aria-pressed={enabled} aria-label={`音を${enabled ? 'オフ' : 'オン'}にする`}><span aria-hidden="true">{enabled ? '🔊' : '🔇'}</span><span className="icon-button__text">音 {enabled ? 'ON' : 'OFF'}</span></button>;
}

