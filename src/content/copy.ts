/** 子どもが声に出しても分かりやすい、画面表示用の日本語文言。 */
export const GAME_TITLE = 'ねこ積みタワー' as const
export const GAME_SUBTITLE = 'タップでどこまで積めるかな？' as const

export const TITLE_COPY = {
  start: 'あそぶ',
  howToPlay: 'あそびかた',
  collection: 'ねこずかん',
  bestScore: 'ベストスコア',
  bestHeight: 'さいこう記録',
} as const

export const HOW_TO_PLAY_COPY = {
  title: 'あそびかた',
  lead: '動くねこを、どんどん積もう！',
  steps: [
    {
      title: 'タップ！',
      body: 'ねこを落としたい場所で、画面をタップ。',
    },
    {
      title: 'ぴったり！',
      body: '下のねこにぴったり重なると、ボーナス！',
    },
    {
      title: 'スコアアップ！',
      body: '高く積むほど、スコアが上がるよ。',
    },
  ],
  miss: 'ねこが重ならなかったら、おしまい。',
  back: 'タイトルへもどる',
} as const

export const HUD_COPY = {
  score: 'スコア',
  height: '段',
  best: 'ベスト',
  combo: 'れんぞくぴったり',
  perfect: 'ぴったり！',
  pause: 'ちょっと休む',
} as const

export const PAUSE_COPY = {
  title: 'ちょっと休もう',
  resume: 'つづける',
  goToTitle: 'タイトルへもどる',
} as const

export const RETURN_CONFIRM_COPY = {
  title: 'タイトルへもどる？',
  body: 'いまのゲームは、ここでおしまいになるよ。',
  confirm: 'もどる',
  cancel: 'ゲームをつづける',
} as const

export const RESULT_COPY = {
  title: 'ゲームおしまい！',
  score: 'こんかいのスコア',
  height: '積んだ高さ',
  best: 'ベストスコア',
  playAgain: 'もういっかい',
  goToTitle: 'タイトルへもどる',
  encouragement: 'つぎはもっと高く積めるかも！',
} as const

export const BEST_COPY = {
  newScore: 'ベストスコア更新！',
  newHeight: 'さいこう記録更新！',
} as const

export const UNLOCK_COPY = {
  title: 'あたらしいねこ！',
  message: (name: string) => `${name}と遊べるようになったよ！`,
  locked: 'まだひみつ',
  unlocked: 'あそべるよ',
} as const

export const SOUND_COPY = {
  on: '音あり',
  off: '音なし',
} as const

export type CatId =
  | 'white'
  | 'black'
  | 'calico'
  | 'tabby'
  | 'tuxedo'
  | 'sleepy'
  | 'happy'
  | 'gold'
  | 'rainbow'

export type CatCopy = Readonly<{
  id: CatId
  name: string
  description: string
  unlockText: string
}>

export const CAT_COPY: readonly CatCopy[] = [
  { id: 'white', name: 'しろねこ', description: 'まっしろで、やさしいねこ。', unlockText: 'はじめから' },
  { id: 'black', name: 'くろねこ', description: '夜みたいに、つやつやなねこ。', unlockText: '3段積む' },
  { id: 'calico', name: 'みけねこ', description: '三つの色がおしゃれなねこ。', unlockText: '5段積む' },
  { id: 'tabby', name: 'とらねこ', description: 'しましまが元気なねこ。', unlockText: '8段積む' },
  { id: 'tuxedo', name: 'はちわれ', description: 'おでこのもようがすてきなねこ。', unlockText: '10段積む' },
  { id: 'sleepy', name: 'ねむねこ', description: 'いつでもうとうとなねこ。', unlockText: '3回あそぶ' },
  { id: 'happy', name: 'ごきげんねこ', description: 'にこにこ笑顔のねこ。', unlockText: 'ぴったりを3回つづける' },
  { id: 'gold', name: '金のねこ', description: 'きらきらかがやくねこ。', unlockText: 'スコア500点をとる' },
  { id: 'rainbow', name: 'にじいろねこ', description: '七つの色にかがやくねこ。', unlockText: '20段積む' },
] as const

export type BackgroundId = 'ground' | 'town' | 'clouds' | 'sunset' | 'night' | 'space'

export const BACKGROUND_COPY: Readonly<Record<BackgroundId, string>> = {
  ground: 'ぽかぽか草原',
  town: 'にぎやかな町',
  clouds: 'ふわふわ雲',
  sunset: 'ゆうやけ空',
  night: 'きらきら夜空',
  space: 'わくわく宇宙',
} as const

export const ARIA_COPY = {
  gameArea: 'ねこを積むゲーム画面',
  dropCat: 'ねこを落とす',
  pauseGame: 'ゲームを一時停止する',
  resumeGame: 'ゲームを再開する',
  soundOn: '音を出す',
  soundOff: '音を消す',
  openHowToPlay: 'あそびかたを開く',
  openCollection: 'ねこずかんを開く',
  closeDialog: '画面を閉じる',
  scoreStatus: (score: number, height: number) => `スコア${score}点、${height}段`,
  comboStatus: (combo: number) => `ぴったり${combo}回れんぞく`,
  catStatus: (name: string, unlocked: boolean) => `${name}、${unlocked ? '解放ずみ' : '未解放'}`,
} as const

export const COPY = {
  title: GAME_TITLE,
  subtitle: GAME_SUBTITLE,
  titleScreen: TITLE_COPY,
  howToPlay: HOW_TO_PLAY_COPY,
  hud: HUD_COPY,
  pause: PAUSE_COPY,
  returnConfirm: RETURN_CONFIRM_COPY,
  result: RESULT_COPY,
  best: BEST_COPY,
  unlock: UNLOCK_COPY,
  sound: SOUND_COPY,
  aria: ARIA_COPY,
} as const
