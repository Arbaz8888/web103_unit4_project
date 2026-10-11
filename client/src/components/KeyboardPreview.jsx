import React, { useId } from 'react'
import { buildLayout, U } from '../utilities/keyboardLayouts'
import { shade, RAINBOW } from '../utilities/color'

// Fixed canvas so a 60% board looks small and a full-size board looks wide.
const CANVAS_W = 24.5 * U
const CANVAS_H = 9.5 * U
const BEZEL = 0.45 * U
const KEY_GAP = 3
const ACCENT = '#6d5ae6'

const DEFAULT_CASE = { color: '#23252b', material: 'plastic' }
const DEFAULT_CAPS = { alpha: '#3a3d46', mod: '#2a2d35', accent: '#f0a35e', legend: '#f4f4f6' }

// Renders the selected build as an SVG. `build` maps each feature slug to the
// chosen option object; missing options fall back to sensible defaults.
const KeyboardPreview = ({ build = {}, compact = false, className = '' }) => {
    // Gradient/filter ids must be unique when several previews share a page.
    const uid = useId().replace(/:/g, '')
    const ids = {
        rainbow: `rainbow-${uid}`,
        metal: `metal-${uid}`,
        wood: `wood-${uid}`,
        grain: `grain-${uid}`,
        acrylic: `acrylic-${uid}`,
        blurBig: `blur-big-${uid}`,
        blurSmall: `blur-small-${uid}`
    }

    const layout = buildLayout(build.layout?.slug)
    const caseMeta = build.case?.meta ?? DEFAULT_CASE
    const caps = build.keycaps?.meta ?? DEFAULT_CAPS
    const glow = build.lighting?.meta?.glow ?? 'none'
    const underglow = Boolean(build.lighting?.meta?.underglow)
    const wireless = build.connectivity?.slug === 'wireless'
    const translucent = Boolean(caps.translucent)

    const boardW = layout.width * U
    const boardH = layout.height * U
    const keysX = (CANVAS_W - boardW) / 2
    const keysY = (CANVAS_H - boardH) / 2 + 0.35 * U
    const caseX = keysX - BEZEL
    const caseY = keysY - BEZEL
    const caseW = boardW + 2 * BEZEL
    const caseH = boardH + 2 * BEZEL
    const caseRadius = 0.55 * U
    const centerX = CANVAS_W / 2

    const material = caseMeta.material
    const caseFill =
        material === 'aluminum' ? `url(#${ids.metal})` :
        material === 'wood' ? `url(#${ids.wood})` :
        material === 'acrylic' ? `url(#${ids.acrylic})` :
        caseMeta.color
    const caseStroke = material === 'acrylic' ? 'rgba(255,255,255,0.95)' : shade(caseMeta.color, -0.35)
    const caseOpacity = material === 'acrylic' ? 0.72 : 1

    const fillFor = (type) => caps[type] ?? caps.alpha
    const label = `${build.layout?.name ?? 'Keyboard'} with ${build.case?.name ?? 'default'} case and ${build.keycaps?.name ?? 'default'} keycaps`

    return (
        <svg
            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
            className={`keyboard-preview ${className}`.trim()}
            role='img'
            aria-label={label}
        >
            <defs>
                <linearGradient id={ids.rainbow} x1='0' y1='0' x2='1' y2='0'>
                    {RAINBOW.map((color, index) => (
                        <stop key={color} offset={`${(index / (RAINBOW.length - 1)) * 100}%`} stopColor={color} />
                    ))}
                </linearGradient>
                <linearGradient id={ids.metal} x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor={shade(caseMeta.color, 0.35)} />
                    <stop offset='45%' stopColor={caseMeta.color} />
                    <stop offset='100%' stopColor={shade(caseMeta.color, -0.18)} />
                </linearGradient>
                <linearGradient id={ids.wood} x1='0' y1='0' x2='1' y2='1'>
                    <stop offset='0%' stopColor={shade(caseMeta.color, 0.12)} />
                    <stop offset='50%' stopColor={caseMeta.color} />
                    <stop offset='100%' stopColor={shade(caseMeta.color, -0.22)} />
                </linearGradient>
                <linearGradient id={ids.acrylic} x1='0' y1='0' x2='1' y2='1'>
                    <stop offset='0%' stopColor='#ffffff' />
                    <stop offset='100%' stopColor={caseMeta.color} />
                </linearGradient>
                <pattern id={ids.grain} width='140' height='16' patternUnits='userSpaceOnUse'>
                    <path d='M0 8 Q 35 3 70 8 T 140 8' fill='none' stroke='rgba(0,0,0,0.16)' strokeWidth='2' />
                    <path d='M0 14 Q 45 11 90 14 T 180 14' fill='none' stroke='rgba(255,255,255,0.10)' strokeWidth='1.5' />
                </pattern>
                <filter id={ids.blurBig} x='-30%' y='-60%' width='160%' height='220%'>
                    <feGaussianBlur stdDeviation='14' />
                </filter>
                <filter id={ids.blurSmall} x='-10%' y='-10%' width='120%' height='120%'>
                    <feGaussianBlur stdDeviation='4' />
                </filter>
            </defs>

            {/* Underglow halo sits behind everything */}
            {underglow && (
                <rect
                    x={caseX - 8} y={caseY - 8} width={caseW + 16} height={caseH + 16}
                    rx={caseRadius * 1.3}
                    fill={`url(#${ids.rainbow})`}
                    filter={`url(#${ids.blurBig})`}
                    opacity='0.95'
                />
            )}

            {/* Coiled cable for wired boards */}
            {!wireless && (
                <g>
                    <path
                        d={`M ${centerX} ${caseY} C ${centerX} ${caseY - 26}, ${centerX + 34} ${caseY - 22}, ${centerX + 46} ${caseY - 52}`}
                        fill='none' stroke='#3b3a44' strokeWidth='5' strokeLinecap='round'
                    />
                    <rect x={centerX - 7} y={caseY - 12} width='14' height='14' rx='4' fill='#4a4953' />
                </g>
            )}

            {/* Case */}
            <rect
                x={caseX} y={caseY} width={caseW} height={caseH} rx={caseRadius}
                fill={caseFill} fillOpacity={caseOpacity} stroke={caseStroke} strokeWidth='2'
            />
            {material === 'wood' && (
                <rect x={caseX} y={caseY} width={caseW} height={caseH} rx={caseRadius} fill={`url(#${ids.grain})`} />
            )}
            {material !== 'acrylic' && (
                <rect
                    x={caseX + 3} y={caseY + 3} width={caseW - 6} height={caseH - 6} rx={caseRadius - 3}
                    fill='none' stroke='rgba(255,255,255,0.18)' strokeWidth='1.5'
                />
            )}

            {/* Plate and backlight showing through the gaps between keys */}
            <rect x={keysX} y={keysY} width={boardW} height={boardH} rx='6' fill='#1b1c21' />
            {glow !== 'none' && (
                <rect
                    x={keysX} y={keysY} width={boardW} height={boardH} rx='6'
                    fill={glow === 'rgb' ? `url(#${ids.rainbow})` : '#ffffff'}
                    filter={`url(#${ids.blurSmall})`}
                    opacity={glow === 'rgb' ? 0.95 : 0.85}
                />
            )}

            {/* Keycaps */}
            {layout.keys.map((k, index) => {
                const x = keysX + k.x * U + KEY_GAP
                const y = keysY + k.y * U + KEY_GAP
                const w = k.w * U - 2 * KEY_GAP
                const h = k.h * U - 2 * KEY_GAP
                return (
                    <g key={index}>
                        <rect
                            x={x} y={y} width={w} height={h} rx='5'
                            fill={fillFor(k.type)} fillOpacity={translucent ? 0.55 : 1}
                            stroke='rgba(0,0,0,0.28)' strokeWidth='1'
                        />
                        {!compact && (
                            <rect x={x + 3} y={y + 2} width={w - 6} height={h - 9} rx='3' fill='rgba(255,255,255,0.14)' />
                        )}
                        {!compact && k.label && (
                            <text
                                x={x + 6} y={y + 14}
                                fontSize={k.label.length > 2 ? 8 : 10} fontWeight='600'
                                fill={caps.legend} fontFamily='Inter, system-ui, sans-serif'
                            >
                                {k.label}
                            </text>
                        )}
                    </g>
                )
            })}

            {/* Wireless indicator */}
            {wireless && (
                <g
                    transform={`translate(${caseX + caseW - 26}, ${caseY - 16})`}
                    fill='none' stroke={ACCENT} strokeWidth='2.5' strokeLinecap='round'
                >
                    <circle cx='0' cy='6' r='2.5' fill={ACCENT} stroke='none' />
                    <path d='M -6 1 a 8.5 8.5 0 0 1 12 0' />
                    <path d='M -11 -4 a 15.5 15.5 0 0 1 22 0' />
                    <path d='M -16 -9 a 22.5 22.5 0 0 1 32 0' />
                </g>
            )}
        </svg>
    )
}

export default KeyboardPreview
