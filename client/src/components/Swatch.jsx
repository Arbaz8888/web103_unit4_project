import React from 'react'
import { shade, RAINBOW } from '../utilities/color'
import { layoutWidthPercent } from '../utilities/keyboardLayouts'

const caseBackground = (meta) => {
    switch (meta.material) {
        case 'aluminum':
            return `linear-gradient(135deg, ${shade(meta.color, 0.4)}, ${meta.color} 55%, ${shade(meta.color, -0.2)})`
        case 'wood':
            return `repeating-linear-gradient(100deg, ${meta.color} 0 4px, ${shade(meta.color, -0.18)} 4px 6px)`
        case 'acrylic':
            return `linear-gradient(135deg, #ffffff, ${meta.color})`
        default:
            return meta.color
    }
}

const lightingBackground = (meta) => {
    if (meta.glow === 'rgb') return `conic-gradient(${[...RAINBOW, RAINBOW[0]].join(', ')})`
    if (meta.glow === 'white') return 'radial-gradient(circle, #ffffff 35%, #cfd3dc 100%)'
    return '#d9d7e2'
}

export const CableIcon = () => (
    <svg viewBox='0 0 16 16' width='14' height='14' aria-hidden='true'>
        <path d='M8 1v4M5 5h6v3a3 3 0 0 1-6 0V5zM8 11v4' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
)

export const WirelessIcon = () => (
    <svg viewBox='0 0 16 16' width='14' height='14' aria-hidden='true'>
        <circle cx='8' cy='12.5' r='1.5' fill='currentColor' />
        <path d='M5 9.5a4.5 4.5 0 0 1 6 0M2.5 6.5a8 8 0 0 1 11 0' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
    </svg>
)

const Swatch = ({ feature, option }) => {
    if (!option) return <span className='swatch' aria-hidden='true' />
    const meta = option.meta ?? {}

    switch (feature) {
        case 'layout':
            return (
                <span className='swatch swatch-layout' aria-hidden='true'>
                    <span style={{ width: `${layoutWidthPercent(option.slug)}%` }} />
                </span>
            )
        case 'case':
            return <span className='swatch' style={{ background: caseBackground(meta) }} aria-hidden='true' />
        case 'keycaps':
            return (
                <span
                    className='swatch'
                    style={{ background: `conic-gradient(${meta.alpha} 0 55%, ${meta.mod} 55% 82%, ${meta.accent} 82% 100%)` }}
                    aria-hidden='true'
                />
            )
        case 'switches':
            return (
                <span className='swatch swatch-switch' style={{ background: meta.color }} aria-hidden='true'>
                    <span />
                </span>
            )
        case 'lighting':
            return <span className='swatch' style={{ background: lightingBackground(meta) }} aria-hidden='true' />
        case 'connectivity':
            return (
                <span className='swatch swatch-icon' aria-hidden='true'>
                    {option.slug === 'wireless' ? <WirelessIcon /> : <CableIcon />}
                </span>
            )
        default:
            return <span className='swatch' aria-hidden='true' />
    }
}

export default Swatch
