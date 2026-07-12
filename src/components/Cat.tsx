import type { CatKind } from './types';

const CAT_NAMES: Record<CatKind, string> = {
  white: 'しろねこ', black: 'くろねこ', calico: 'みけねこ', tabby: 'とらねこ',
  tuxedo: 'はちわれ', gold: '金のねこ', rainbow: 'にじいろねこ', sleepy: 'ねむねこ', happy: 'ごきげんねこ',
};

export interface CatProps { kind: CatKind; className?: string; decorative?: boolean }

export function Cat({ kind, className = '', decorative = false }: CatProps) {
  const sleepy = kind === 'sleepy';
  const happy = kind === 'happy';
  return (
    <svg className={`cat cat--${kind} ${className}`} viewBox="0 0 180 82" role={decorative ? undefined : 'img'} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : CAT_NAMES[kind]}>
      <defs><linearGradient id={`rainbow-${kind}`} x1="0" x2="1"><stop stopColor="#ff8e9e"/><stop offset=".34" stopColor="#ffd56a"/><stop offset=".67" stopColor="#76d9c4"/><stop offset="1" stopColor="#9585e8"/></linearGradient></defs>
      <path className="cat__body" d="M12 31 25 12l16 15c25-8 73-8 98 0l16-15 13 19v31c0 10-8 17-18 17H30c-10 0-18-7-18-17Z" fill={kind === 'rainbow' ? `url(#rainbow-${kind})` : undefined}/>
      {kind === 'calico' && <><path className="cat__patch cat__patch--one" d="M28 25q20-14 37 1l-7 26-31-4Z"/><path className="cat__patch cat__patch--two" d="m116 25 27-4 15 23-34 11Z"/></>}
      {kind === 'tabby' && <><path className="cat__stripe" d="m55 23 8 16M78 21l4 18M105 21l-5 18M128 24l-8 15"/></>}
      {kind === 'tuxedo' && <path className="cat__mask" d="M60 22h60l-12 35-18-9-18 9Z"/>}
      {kind === 'gold' && <path className="cat__shine" d="m132 28 4 8 8 4-8 4-4 8-4-8-8-4 8-4Z"/>}
      <g className="cat__face">
        {sleepy ? <><path d="m54 50 8 4 8-4M110 50l8 4 8-4"/></> : happy ? <><path d="m54 51 8-6 8 6M110 51l8-6 8 6"/></> : <><circle cx="62" cy="50" r="4"/><circle cx="118" cy="50" r="4"/></>}
        <path d="m86 56 4 3 4-3M90 59q-7 8-14 1m14-1q7 8 14 1"/>
        <path className="cat__whiskers" d="M48 60 23 56m25 10-24 3m108-9 25-4m-25 10 24 3"/>
      </g>
    </svg>
  );
}

