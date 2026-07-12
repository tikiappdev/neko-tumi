export type SoundName = 'drop' | 'land' | 'perfect' | 'combo' | 'gameOver' | 'best' | 'unlock'

const NOTES: Record<SoundName, readonly number[]> = {
  drop: [440], land: [240], perfect: [660, 880], combo: [660, 880, 1040],
  gameOver: [300, 220], best: [523, 659, 784, 1047], unlock: [587, 784, 988],
}

let sharedContext: AudioContext | undefined

function getAudioContext(): AudioContext | undefined {
  const AudioContextClass = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AudioContextClass) return undefined
  sharedContext ??= new AudioContextClass()
  return sharedContext
}

export function playSound(name: SoundName, enabled: boolean): void {
  if (!enabled || typeof window === 'undefined') return
  try {
    const context = getAudioContext()
    if (!context) return
    void context.resume()
    const now = context.currentTime
    NOTES[name].forEach((frequency, index) => {
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      oscillator.type = name === 'gameOver' ? 'triangle' : 'sine'
      oscillator.frequency.value = frequency
      gain.gain.setValueAtTime(0.0001, now + index * 0.08)
      gain.gain.exponentialRampToValueAtTime(0.11, now + index * 0.08 + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.13)
      oscillator.connect(gain).connect(context.destination)
      oscillator.start(now + index * 0.08)
      oscillator.stop(now + index * 0.08 + 0.14)
    })
  } catch { /* Sound must never interrupt play. */ }
}
