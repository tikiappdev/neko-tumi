import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal('requestAnimationFrame', () => 1)
  vi.stubGlobal('cancelAnimationFrame', () => undefined)
})

describe('App', () => {
  it('starts on the title and opens the game', async () => {
    const user = userEvent.setup(); render(<App />)
    expect(screen.getByRole('heading', { name: /ねこ積み/ })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /あそぶ/ }))
    expect(screen.getByRole('button', { name: /ねこを落とす/ })).toBeInTheDocument()
  })
  it('shows the short instructions and returns', async () => {
    const user = userEvent.setup(); render(<App />)
    await user.click(screen.getByRole('button', { name: /あそびかた/ }))
    expect(screen.getByRole('heading', { name: 'あそびかた' })).toBeInTheDocument()
    expect(screen.getByText(/タップで ストン/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /タイトルにもどる/ }))
    expect(screen.getByRole('button', { name: /あそぶ/ })).toBeInTheDocument()
  })
  it('persists the sound setting', async () => {
    const user = userEvent.setup(); render(<App />)
    await user.click(screen.getByRole('button', { name: /音をオフ/ }))
    expect(localStorage.getItem('neko-tsumi-tower:player-data')).toContain('"soundEnabled":false')
  })
  it('starts the harder balance mode', async () => {
    const user = userEvent.setup(); render(<App />)
    await user.click(screen.getByRole('button', { name: /バランス/ }))
    expect(screen.getByRole('button', { name: /バランスで あそぶ/ })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /バランスで あそぶ/ }))
    expect(screen.getByText('⚖️ バランス')).toBeInTheDocument()
  })
})
