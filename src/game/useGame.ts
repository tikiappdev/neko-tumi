import { useCallback, useEffect, useRef, useState } from 'react'
import { advanceMovingCat, createInitialGameState, placeMovingCat } from './engine'
import { backgroundForFloor } from './unlocks'
import type { CatId, GameMode, GameState } from './types'
import type { CatBlock as ViewBlock, CatKind } from '../components/types'

type Phase = 'moving' | 'dropping' | 'settling' | 'gameOver'
type Effect = 'perfect' | 'combo' | 'best' | 'miss' | null
export interface CompletedGame { score: number; floor: number; maxPerfectCombo: number }
const FLOOR_STEP = 23
const ACTIVE_Y = 230
const catAt = (ids: CatId[], index: number): CatId => ids[index % Math.max(1, ids.length)] ?? 'white'

export function useGame(mode: GameMode, unlockedCatIds: CatId[], bestScore: number, onComplete: (game: CompletedGame) => void) {
  const [game, setGame] = useState<GameState>(() => createInitialGameState(mode))
  const gameRef = useRef(game)
  const [phase, setPhase] = useState<Phase>('moving')
  const phaseRef = useRef<Phase>('moving')
  const [blocks, setBlocks] = useState<ViewBlock[]>([])
  const [activeY, setActiveY] = useState(ACTIVE_Y)
  const [effect, setEffect] = useState<Effect>(null)
  const [announcement, setAnnouncement] = useState('ねこが うごいています。タップで おとそう！')
  const timeoutIds = useRef<number[]>([])
  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])
  const updatePhase = (next: Phase) => { phaseRef.current = next; setPhase(next) }
  const updateGame = useCallback((next: GameState) => { gameRef.current = next; setGame(next) }, [])

  useEffect(() => {
    let frame = 0
    let previous = performance.now()
    const tick = (now: number) => {
      const elapsed = Math.min(0.05, Math.max(0, (now - previous) / 1000)); previous = now
      if (phaseRef.current === 'moving') {
        const current = gameRef.current
        updateGame({ ...current, moving: advanceMovingCat(current.moving, elapsed, current.floor, current.mode) })
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [updateGame])
  useEffect(() => () => timeoutIds.current.forEach(window.clearTimeout), [])
  const later = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(() => {
      timeoutIds.current = timeoutIds.current.filter((pending) => pending !== id)
      fn()
    }, delay)
    timeoutIds.current.push(id)
  }, [])

  const reset = useCallback(() => {
    timeoutIds.current.forEach(window.clearTimeout); timeoutIds.current = []
    updateGame(createInitialGameState(mode)); setBlocks([]); setActiveY(ACTIVE_Y); setEffect(null)
    setAnnouncement('ねこが うごいています。タップで おとそう！'); updatePhase('moving')
  }, [mode, updateGame])

  const drop = useCallback(() => {
    if (phaseRef.current !== 'moving') return
    const before = gameRef.current
    updatePhase('dropping'); setActiveY(Math.min(9, before.floor) * FLOOR_STEP + 4); setAnnouncement('ねこを おとしたよ')
    later(() => {
      const result = placeMovingCat(before)
      if (!result.placement.success || !result.placement.block) {
        updateGame(result.state); setEffect('miss'); setAnnouncement('おしい！ ねこが おちちゃった'); updatePhase('gameOver')
        later(() => onCompleteRef.current({ score: result.state.score, floor: result.state.floor, maxPerfectCombo: result.state.maxCombo }), 550)
        return
      }
      const placedFloor = result.state.floor - 1
      const kind = catAt(unlockedCatIds, placedFloor)
      const placed: ViewBlock = { id: `${placedFloor}-${kind}`, x: result.placement.block.x, y: 4, width: result.placement.block.width, kind: kind as CatKind, state: result.placement.perfect ? 'perfect' : 'landing' }
      setBlocks((current) => [...current, placed].slice(-10).map((block, i) => ({ ...block, y: i * FLOOR_STEP + 4 })))
      updateGame(result.state)
      if (result.toppled) {
        setEffect('miss'); setAnnouncement(`バランスが ${result.state.balance > 0 ? 'みぎ' : 'ひだり'}に くずれた！`); updatePhase('gameOver')
        later(() => onCompleteRef.current({ score: result.state.score, floor: result.state.floor, maxPerfectCombo: result.state.maxCombo }), 650)
        return
      }
      setEffect(result.placement.perfect ? (result.state.combo > 1 ? 'combo' : 'perfect') : (result.state.score > bestScore ? 'best' : null))
      const balanceHint = result.state.mode === 'balance' && Math.abs(result.state.balance) > 0.22 ? `。${result.state.balance > 0 ? 'みぎ' : 'ひだり'}に かたむいているよ` : ''
      setAnnouncement((result.placement.perfect ? `ぴったり！ ${result.state.combo}れんぞく、${result.gained}てん` : `${result.state.floor}だん、${result.gained}てん`) + balanceHint)
      updatePhase('settling'); later(() => { setActiveY(ACTIVE_Y); setEffect(null); updatePhase('moving') }, 300)
    }, 170)
  }, [bestScore, later, unlockedCatIds, updateGame])

  const activeKind = catAt(unlockedCatIds, game.floor)
  const active: ViewBlock | null = phase === 'gameOver' && game.balance !== 0 ? null : { id: `active-${game.floor}`, x: game.moving.x, y: activeY, width: game.moving.width, kind: activeKind as CatKind, state: phase === 'gameOver' ? 'falling' : phase === 'dropping' ? 'landing' : 'settled' }
  return { game, blocks, active, phase, effect, announcement, background: backgroundForFloor(game.floor), drop, reset }
}
