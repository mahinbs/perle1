// Perle — vibrant & classy AI search interface (with animated icons)
// Adds subtle, classy icon animations via injected CSS keyframes.

import React, { useEffect, useState } from 'react'
import {
  Plus,
  Search as SearchIcon,
  Mic,
  MoreHorizontal,
  User,
  Book,
  Cpu,
  Briefcase,
  Rocket,
  Globe,
  Paintbrush,
  Shield,
  Activity,
  Database,
  Smartphone
} from 'lucide-react'

const BG = '#0B0F10'
const FG = '#EAF2F4'
const CARD = 'rgba(18,21,22,0.86)'
const TEAL = '#00D1E0'
const TEAL_DIM = 'rgba(13,186,198,0.28)'

const center = { display: 'flex', alignItems: 'center', justifyContent: 'center' }
const roundBtn = (size, bg, extra = {}) => ({
  height: size,
  width: size,
  borderRadius: size / 2,
  display: 'grid',
  placeItems: 'center',
  background: bg,
  border: 'none',
  cursor: 'pointer',
  transition: 'transform .12s ease, box-shadow .12s ease, background .2s ease',
  ...extra,
})

const signInStyles = {
  alignSelf: 'center',
  width: '92%',
  height: 64,
  borderRadius: 26,
  marginBottom: 14,
  ...center,
  border: `1px solid ${TEAL_DIM}`,
  background: 'linear-gradient(135deg, rgba(0,209,224,0.14), rgba(0,120,132,0.12))',
  color: TEAL,
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: 0.2,
  boxShadow: '0 10px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)'
}

const inputWrapStyles = {
  display: 'flex',
  alignItems: 'center',
  background: CARD,
  borderRadius: 30,
  border: '1px solid #1E2325',
  padding: '0 14px',
  height: 80,
  justifyContent: 'space-between',
  gap: 12,
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  boxShadow: '0 16px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.35)'
}

const inputStyle = {
  flex: 1,
  margin: '0 12px',
  color: FG,
  fontSize: 18,
  background: 'transparent',
  border: 'none',
  outline: 'none',
}

const micBtnStyle = roundBtn(38, 'rgba(13,186,198,0.12)', { border: `1px solid ${TEAL_DIM}` })
const sendBtnStyle = roundBtn(48, TEAL, { color: '#0b0f10', boxShadow: '0 8px 20px rgba(0,209,224,0.35)' })
const leftBtnStyle = roundBtn(38, 'rgba(255,255,255,0.05)')
const profileBtnStyle = roundBtn(44, 'rgba(255,255,255,0.06)', {
  position: 'absolute',
  top: 20,
  right: 20,
  border: `1px solid rgba(255,255,255,0.08)`,
  color: '#b9c3c7',
  transition: 'all 0.2s ease',
})

const categories = [
  { label: 'AI & ML', query: 'Latest in AI & ML', Icon: Cpu },
  { label: 'Business', query: 'Business strategy frameworks', Icon: Briefcase },
  { label: 'Startups', query: 'How to validate an MVP', Icon: Rocket },
  { label: 'Design', query: 'Modern UI/UX patterns', Icon: Paintbrush },
  { label: 'World', query: 'Today's top world news', Icon: Globe },
  { label: 'Security', query: 'Best practices in cybersecurity', Icon: Shield },
  { label: 'Health', query: 'Latest health research summaries', Icon: Activity },
  { label: 'Databases', query: 'Postgres vs. MongoDB tradeoffs', Icon: Database },
  { label: 'Mobile', query: 'Flutter vs React Native 2025', Icon: Smartphone },
  { label: 'Books', query: 'Best product management books', Icon: Book },
]

const catCardStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
  padding: '10px 12px',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  minWidth: 140,
  height: 54,
  cursor: 'pointer',
  boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
  transition: 'transform .12s ease, box-shadow .12s ease, background .2s ease',
}

const catLabelStyle = { fontSize: 14, color: FG, opacity: 0.9, fontWeight: 600 }

export default function App() {
  const [hoverSend, setHoverSend] = useState(false)
  const [query, setQuery] = useState('')

  // Inject animation styles once
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (document.getElementById('perle-anim')) return
    const style = document.createElement('style')
    style.id = 'perle-anim'
    style.innerHTML = `
      @keyframes perle-breath { 0%{transform:translateZ(0) scale(1)} 50%{transform:translateZ(0) scale(1.04)} 100%{transform:translateZ(0) scale(1)} }
      @keyframes perle-pulse { 0%,100%{opacity:1; filter:drop-shadow(0 0 0 rgba(0,209,224,0))} 50%{opacity:.9; filter:drop-shadow(0 0 10px rgba(0,209,224,.45))} }
      @keyframes perle-float { 0%{transform:translateY(0)} 50%{transform:translateY(-2px)} 100%{transform:translateY(0)} }
      @keyframes perle-wiggle { 0%{transform:rotate(0)} 50%{transform:rotate(8deg)} 100%{transform:rotate(0)} }
      .perle-breath { animation: perle-breath 3s ease-in-out infinite; }
      .perle-pulse { animation: perle-pulse 1.8s ease-in-out infinite; }
      .perle-float { animation: perle-float 3.2s ease-in-out infinite; }
      .perle-wiggle:hover { animation: perle-wiggle .3s ease-in-out; }
      .perle-ico-hover { transition: transform .15s ease; }
      .perle-ico-hover:hover { transform: translateY(-1px) scale(1.03); }
      .perle-send-hover:hover { transform: translateY(-1px) rotate(6deg) !important; }
      .cat-card:hover .cat-ico { transform: translateY(-1px) scale(1.04); filter: drop-shadow(0 0 6px rgba(0,209,224,.35)); }
      .cat-ico { transition: transform .15s ease, filter .2s ease; }
    `
    document.head.appendChild(style)
  }, [])

  const handleCatClick = (q) => {
    setQuery(q)
    const input = document.querySelector('[data-testid="ask-input"]')
    if (input) input.focus()
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: BG, color: FG, display: 'flex', flexDirection: 'column' }}>
      <button
        style={profileBtnStyle}
        className="perle-breath perle-ico-hover"
        aria-label="profile"
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 12px rgba(0,209,224,0.5)')}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
        data-testid="profile-btn"
        data-anim="breath"
      >
        <User size={22} color={TEAL} />
      </button>

      {/* Background */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} data-testid="bg-layers">
        <div style={{ position: 'absolute', left: '50%', top: '28%', transform: 'translate(-50%,-50%)', width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(0,209,224,0.18), transparent 70%)', filter: 'blur(20px)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 40%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '24px 24px', color: '#b9c3c7' }} />
      </div>

      {/* Logo */}
      <div style={{ flex: 1, ...center }}>
        <div style={{ fontSize: 52, letterSpacing: '-1.2px', fontWeight: 700, textShadow: '0 2px 18px rgba(0,209,224,0.18)' }} data-testid="logo-text" className="perle-pulse" data-anim="pulse">
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>per</span>
          <span style={{ color: 'rgba(255,255,255,0.95)' }}>le</span>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={signInStyles} data-testid="sign-in-pill" className="perle-float" data-anim="float">Sign In</div>

        {/* Categories */}
        <div style={{ margin: '12px 2px 16px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }} data-testid="category-grid">
            {categories.map(({ label, query, Icon }, idx) => (
              <button
                key={idx}
                style={catCardStyle}
                className="cat-card"
                onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 10px 24px rgba(0,0,0,0.35)'}}
                onMouseLeave={(e)=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 6px 18px rgba(0,0,0,0.25)'}}
                onClick={() => handleCatClick(query)}
                aria-label={`category-${label}`}
                data-testid="category-card"
              >
                <span className="cat-ico" style={{ ...roundBtn(32, 'rgba(255,255,255,0.06)', { border: '1px solid rgba(255,255,255,0.08)' }) }} data-anim="hover-float">
                  <Icon size={16} color={TEAL} />
                </span>
                <span style={catLabelStyle}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={inputWrapStyles} data-testid="input-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button style={leftBtnStyle} className="perle-wiggle perle-ico-hover" data-anim="wiggle"><Plus size={20} color="#B9C3C7" /></button>
            <button style={leftBtnStyle} className="perle-ico-hover" data-anim="hover"><SearchIcon size={18} color="#B9C3C7" /></button>
          </div>

          <input
            placeholder="Ask anything..."
            aria-label="Ask anything"
            style={inputStyle}
            data-testid="ask-input"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button style={micBtnStyle} className="perle-pulse perle-ico-hover" data-testid="mic-btn" data-anim="pulse"><Mic size={18} color="#0dbac6" /></button>
            <button
              style={{ ...sendBtnStyle, transform: hoverSend ? 'translateY(-1px)' : 'none' }}
              className="perle-send-hover perle-ico-hover"
              onMouseEnter={() => setHoverSend(true)}
              onMouseLeave={() => setHoverSend(false)}
              data-testid="send-btn"
              data-anim="send-tilt"
            >
              <MoreHorizontal size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function runSmokeTests() {
  try {
    const q = (sel) => document.querySelector(sel)
    const qa = (sel) => Array.from(document.querySelectorAll(sel))
    const checks = [
      ['logo exists', !!q('[data-testid="logo-text"]')],
      ['profile button exists', !!q('[data-testid="profile-btn"]')],
      ['sign-in exists', !!q('[data-testid="sign-in-pill"]')],
      ['mic button exists', !!q('[data-testid="mic-btn"]')],
      ['send button exists', !!q('[data-testid="send-btn"]')],
      ['category grid exists', !!q('[data-testid="category-grid"]')],
      ['at least 6 category cards', qa('[data-testid="category-card"]').length >= 6],
      // Animation presence tests
      ['style tag injected', !!q('#perle-anim')],
      ['profile has breath anim', q('[data-testid="profile-btn"]').getAttribute('data-anim') === 'breath'],
      ['logo has pulse anim', q('[data-testid="logo-text"]').getAttribute('data-anim') === 'pulse'],
      ['mic has pulse anim', q('[data-testid="mic-btn"]').getAttribute('data-anim') === 'pulse'],
      ['send has tilt anim', q('[data-testid="send-btn"]').getAttribute('data-anim') === 'send-tilt'],
    ]
    const failed = checks.filter(([, ok]) => !ok)
    if (failed.length) console.warn('⚠️ UI tests failed:', failed.map(f => f[0]))
    else console.log('✅ UI tests passed for Perle (animated)')
  } catch (e) {
    console.warn('⚠️ Test harness error', e)
  }
}

if (typeof window !== 'undefined') setTimeout(runSmokeTests, 600)
