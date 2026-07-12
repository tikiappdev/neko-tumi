import { describe, expect, it } from 'vitest'
import {
  ARIA_COPY,
  BACKGROUND_COPY,
  CAT_COPY,
  COPY,
  GAME_TITLE,
  HOW_TO_PLAY_COPY,
  UNLOCK_COPY,
} from './copy'

describe('画面文言', () => {
  it('タイトルと遊び方を完成した日本語で提供する', () => {
    expect(GAME_TITLE).toBe('ねこ積みタワー')
    expect(HOW_TO_PLAY_COPY.steps).toHaveLength(3)
    expect(HOW_TO_PLAY_COPY.steps.map((step) => step.title)).toEqual([
      'タップ！',
      'ぴったり！',
      'スコアアップ！',
    ])
    expect(COPY.result.playAgain).toBe('もういっかい')
    expect(COPY.returnConfirm.cancel).toBe('ゲームをつづける')
  })

  it('9種類の重ならない猫IDと解放表示を持つ', () => {
    expect(CAT_COPY).toHaveLength(9)
    expect(new Set(CAT_COPY.map((cat) => cat.id)).size).toBe(9)
    for (const cat of CAT_COPY) {
      expect(cat.name).not.toBe('')
      expect(cat.description).not.toBe('')
      expect(cat.unlockText).not.toBe('')
    }
    expect(UNLOCK_COPY.message('みけねこ')).toBe('みけねこと遊べるようになったよ！')
  })

  it('6つの背景名を持つ', () => {
    expect(Object.keys(BACKGROUND_COPY)).toHaveLength(6)
    expect(BACKGROUND_COPY.space).toBe('わくわく宇宙')
  })

  it('現在の遊びの状態を読み上げ用に整える', () => {
    expect(ARIA_COPY.scoreStatus(120, 8)).toBe('スコア120点、8段')
    expect(ARIA_COPY.comboStatus(3)).toBe('ぴったり3回れんぞく')
    expect(ARIA_COPY.catStatus('金のねこ', false)).toBe('金のねこ、未解放')
  })
})
