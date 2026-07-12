import { useCallback, useEffect, useMemo, useState } from 'react'
import { GameScreen, HowToScreen, ResultScreen, TitleScreen } from '../components'
import type { CatKind } from '../components/types'
import { playSound } from '../audio/sound'
import { useGame, type CompletedGame } from '../game/useGame'
import { newlyUnlockedCats } from '../game/unlocks'
import type { GameMode } from '../game/types'
import { loadPlayerData, recordGame, savePlayerData, setSoundEnabled, type PlayerDataV1 } from '../storage/playerData'

type Screen = 'title' | 'howto' | 'game' | 'result'
interface Result { score: number; floors: number; isNewBest: boolean; unlocked: CatKind | null }

export function App() {
  const [screen, setScreen] = useState<Screen>('title')
  const [mode, setMode] = useState<GameMode>('normal')
  const [player, setPlayer] = useState<PlayerDataV1>(loadPlayerData)
  const [result, setResult] = useState<Result | null>(null)
  const completeGame = useCallback((completed: CompletedGame) => {
    const after = recordGame(player, completed)
    const unlocked = newlyUnlockedCats(player, after)[0] ?? null
    const isNewBest = completed.score > player.bestScore
    savePlayerData(after); setPlayer(after)
    playSound(isNewBest ? 'best' : unlocked ? 'unlock' : 'gameOver', player.soundEnabled)
    setResult({ score: completed.score, floors: completed.floor, isNewBest, unlocked })
    setScreen('result')
  }, [player])
  const game = useGame(mode, player.unlockedCatIds, player.bestScore, completeGame)
  const resetGame = game.reset
  const start = useCallback(() => { resetGame(); setResult(null); setScreen('game') }, [resetGame])
  const toggleSound = useCallback(() => setPlayer((current) => {
    const next = setSoundEnabled(current, !current.soundEnabled); savePlayerData(next)
    if (next.soundEnabled) playSound('land', true)
    return next
  }), [])
  const exitGame = useCallback(() => {
    if (!window.confirm('いまのゲームを おわって、タイトルにもどる？')) return
    resetGame(); setResult(null); setScreen('title')
  }, [resetGame])
  const best = useMemo(() => ({ score: player.bestScore, floors: player.highestFloor }), [player])
  useEffect(() => {
    if (screen !== 'game' || game.phase !== 'settling') return
    playSound(game.effect === 'combo' ? 'combo' : game.effect === 'perfect' ? 'perfect' : 'land', player.soundEnabled)
  }, [game.effect, game.phase, player.soundEnabled, screen])

  if (screen === 'howto') return <HowToScreen onBack={() => setScreen('title')} onStart={start} />
  if (screen === 'game') return <GameScreen score={game.game.score} floors={game.game.floor} bestScore={player.bestScore} combo={game.game.combo} modeLabel={mode === 'balance' ? '⚖️ バランス' : undefined} balance={mode === 'balance' ? game.game.balance : undefined} soundEnabled={player.soundEnabled} onToggleSound={toggleSound} onExit={exitGame} blocks={game.blocks} active={game.active} background={game.background} onDrop={() => { playSound('drop', player.soundEnabled); game.drop() }} disabled={game.phase !== 'moving'} announcement={game.announcement} effect={game.effect} />
  if (screen === 'result' && result) return <ResultScreen score={result.score} floors={result.floors} isNewBest={result.isNewBest} unlockedCat={result.unlocked} onRetry={start} onTitle={() => setScreen('title')} />
  return <TitleScreen best={best} mode={mode} soundEnabled={player.soundEnabled} onModeChange={setMode} onToggleSound={toggleSound} onStart={start} onHowTo={() => setScreen('howto')} featuredCat={(player.unlockedCatIds.at(-1) ?? 'white') as CatKind} />
}
