// Every keyboard starts from this price; each selected option adds its own price on top.
export const BASE_PRICE = 89

export const FEATURE_SLUGS = ['layout', 'case', 'keycaps', 'switches', 'lighting', 'connectivity']

export const roundPrice = (value) => Math.round(value * 100) / 100
