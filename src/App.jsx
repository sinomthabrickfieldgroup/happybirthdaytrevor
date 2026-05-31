import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import './index.css'

const TASKS = [
  {
    status: 'done',
    badge: 'Done',
    text: 'Implement AI-powered gate arm sentience',
    note: 'Gate is now self-aware. Monitoring situation.',
  },
  {
    status: 'done',
    badge: 'Done',
    text: 'Optimize cake-to-mouth latency (Δt < 0.2s)',
    note: 'Benchmarked. Results exceeded SLA.',
  },
  {
    status: 'done',
    badge: 'Done',
    text: "Refactor Trevor's age variable (incremented by 1, bypassed compiler warnings)",
    note: 'Deprecated legacy value. No rollback planned.',
  },
  {
    status: 'done',
    badge: 'Done',
    text: 'Leverage synergistic birthday paradigms to maximise stakeholder joy',
    note: 'Joy metrics up 40%. Methodology: vibes.',
  },
  {
    status: 'done',
    badge: 'Done',
    text: 'Deploy real-time confetti matrices to local browser storage',
    note: 'You are currently experiencing this feature.',
  },
  {
    status: 'done',
    badge: 'Done',
    text: 'Migrate parking system to blockchain',
    note: 'Reverted after 4 hours. Net productivity: neutral.',
  },
  {
    status: 'blocked',
    badge: 'Blocked',
    text: 'Achieve work-life balance',
    note: 'Blocked by: everything.',
  },
]

function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    dur: (Math.random() * 2 + 1.5).toFixed(1) + 's',
    delay: (Math.random() * 3).toFixed(1) + 's',
  }))
  return (
    <div className="stars">
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          top: s.top + '%', left: s.left + '%',
          width: s.size + 'px', height: s.size + 'px',
          '--dur': s.dur, animationDelay: s.delay,
        }} />
      ))}
    </div>
  )
}

function GiftSVG() {
  return (
    <svg className="gift-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Box body */}
      <rect x="12" y="48" width="76" height="46" rx="3" fill="#c0392b"/>
      <rect x="12" y="48" width="76" height="46" rx="3" stroke="#922b21" strokeWidth="1.5"/>
      {/* Lid */}
      <rect x="8" y="36" width="84" height="16" rx="3" fill="#e74c3c"/>
      <rect x="8" y="36" width="84" height="16" rx="3" stroke="#922b21" strokeWidth="1.5"/>
      {/* Ribbon vertical */}
      <rect x="44" y="36" width="12" height="58" fill="#F5C842"/>
      {/* Ribbon horizontal on lid */}
      <rect x="8" y="41" width="84" height="7" fill="#F5C842"/>
      {/* Bow left loop */}
      <ellipse cx="36" cy="26" rx="14" ry="10" fill="#F5C842" transform="rotate(-20 36 26)"/>
      <ellipse cx="36" cy="26" rx="8" ry="5" fill="#e74c3c" transform="rotate(-20 36 26)"/>
      {/* Bow right loop */}
      <ellipse cx="64" cy="26" rx="14" ry="10" fill="#F5C842" transform="rotate(20 64 26)"/>
      <ellipse cx="64" cy="26" rx="8" ry="5" fill="#e74c3c" transform="rotate(20 64 26)"/>
      {/* Bow center */}
      <ellipse cx="50" cy="30" rx="8" ry="7" fill="#F5C842"/>
      <ellipse cx="50" cy="30" rx="4" ry="3.5" fill="#D4A017"/>
    </svg>
  )
}

function PageStream({ onDone }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const pageCount = 7
    const sheets = []

    for (let i = 0; i < pageCount; i++) {
      const el = document.createElement('div')
      el.className = 'page-sheet'

      // Random line layout per page
      const lines = [
        { cls: 'dark', w: '70%' },
        { cls: 'accent', w: '55%' },
        ...Array.from({ length: 4 }, () => ({ cls: '', w: (40 + Math.random() * 45).toFixed(0) + '%' })),
      ]
      lines.forEach(l => {
        const d = document.createElement('div')
        d.className = 'page-line ' + l.cls
        d.style.width = l.w
        el.appendChild(d)
      })

      container.appendChild(el)
      sheets.push(el)
    }

    // Animate pages flying upward in sequence
    sheets.forEach((sheet, i) => {
      const delay = i * 120
      const angle = (Math.random() - 0.5) * 40
      const xOffset = (Math.random() - 0.5) * 160

      setTimeout(() => {
        // Start: at gift position (bottom center)
        sheet.style.transition = 'none'
        sheet.style.opacity = '0'
        sheet.style.transform = `translate(${xOffset * 0.1}px, 180px) rotate(0deg) scale(0.3)`

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            sheet.style.transition = `opacity 0.2s ease, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)`
            sheet.style.opacity = '1'
            sheet.style.transform = `translate(${xOffset}px, ${-120 - i * 30}px) rotate(${angle}deg) scale(1)`

            // Fade out
            setTimeout(() => {
              sheet.style.transition = 'opacity 0.4s ease, transform 0.4s ease'
              sheet.style.opacity = '0'
              sheet.style.transform = `translate(${xOffset * 1.2}px, ${-200 - i * 30}px) rotate(${angle * 1.5}deg) scale(0.8)`
            }, 500)
          })
        })
      }, delay)
    })

    const totalDuration = pageCount * 120 + 900 + 400
    const timer = setTimeout(() => {
      sheets.forEach(s => s.remove())
      onDone()
    }, totalDuration)

    return () => {
      clearTimeout(timer)
      sheets.forEach(s => s.remove())
    }
  }, [onDone])

  return <div className="pages-container" ref={containerRef} />
}

function Modal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="btn-close" onClick={onClose}>✕</button>
        <div className="modal-stamp">Confidential</div>

        <h2>Q2 Sprint Plan</h2>
        <div className="memo-meta">
          TO: <span>Trevor Jacobs</span> &nbsp;·&nbsp;
          DATE: <span>{new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}</span> &nbsp;·&nbsp;
          RE: <span>Upcoming Work (abridged)</span>
        </div>

        <ul className="task-list">
          {TASKS.map((t, i) => (
            <li key={i} className={`task-item ${t.status}`}>
              <span className="task-badge">{t.badge}</span>
              <div>
                <div className="task-text">{t.text}</div>
                <div className="task-note">{t.note}</div>
              </div>
            </li>
          ))}
        </ul>

        <div className="modal-footer">
          {/* <a
            className="btn-real"
            href="#"
            onClick={e => {
              e.preventDefault()
              alert("You'll need to drop in the real report URL/file here 👋")
            }}
          >
            📄 Download actual progress report
          </a> */}
          <div className="modal-from">
            <strong>From:</strong> Engineering Dept (1 person) &nbsp;·&nbsp; Happy birthday, Trevor 🎂
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [phase, setPhase] = useState('idle') // idle | streaming | modal

  function fireConfetti() {
    const opts = { particleCount: 80, spread: 90, origin: { y: 0.55 }, colors: ['#F5C842','#ff6baf','#6bffd8','#ffffff','#c0392b'] }
    confetti({ ...opts, angle: 60, origin: { x: 0.2, y: 0.6 } })
    confetti({ ...opts, angle: 120, origin: { x: 0.8, y: 0.6 } })
  }

  useEffect(() => {
    // Entry confetti
    const t = setTimeout(() => {
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.3 }, colors: ['#F5C842','#ff6baf','#6bffd8','#ffffff'] })
    }, 800)
    return () => clearTimeout(t)
  }, [])

  function handleGiftClick() {
    if (phase !== 'idle') return
    fireConfetti()
    setPhase('streaming')
  }

  function handleStreamDone() {
    setPhase('modal')
    fireConfetti()
  }

  return (
    <div className="page">
      <Stars />

      <h1 className="heading">
        🎉 Happy Birthday, Trevor!
        <span className="from">from your favourite (and only) engineer 😉</span>
      </h1>

      <div className="trevor-wrap">
        <img src="/trevor.png" alt="Trevor" />
      </div>

      <div className="gift-area">
        <span className="gift-label">{phase === 'idle' ? 'A gift awaits…' : phase === 'streaming' ? 'Opening…' : '🎁'}</span>
        <button
          className="gift-btn"
          onClick={handleGiftClick}
          disabled={phase !== 'idle'}
          title="Click me!"
        >
          <GiftSVG />
        </button>
      </div>

      {phase === 'streaming' && <PageStream onDone={handleStreamDone} />}
      {phase === 'modal' && <Modal onClose={() => setPhase('idle')} />}
    </div>
  )
}
