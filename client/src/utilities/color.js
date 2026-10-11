const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)))

const parse = (hex) => {
    const clean = hex.replace('#', '')
    const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean
    const n = Number.parseInt(full, 16)
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const toHex = ([r, g, b]) => `#${[r, g, b].map((v) => clamp(v).toString(16).padStart(2, '0')).join('')}`

export const shade = (hex, amount) => {
    const target = amount > 0 ? 255 : 0
    const t = Math.abs(amount)
    return toHex(parse(hex).map((channel) => channel + (target - channel) * t))
}

export const RAINBOW = ['#ff6b6b', '#ffa94d', '#ffe66d', '#6bf178', '#4dd4ff', '#7b6bff', '#ff6bd6']
