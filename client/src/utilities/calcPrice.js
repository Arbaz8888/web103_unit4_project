export const getOption = (features, featureSlug, optionSlug) => {
    const feature = features.find((f) => f.slug === featureSlug)
    return feature?.options.find((o) => o.slug === optionSlug)
}

export const getOptionPrice = (features, featureSlug, optionSlug) => {
    return getOption(features, featureSlug, optionSlug)?.price ?? 0
}

export const priceBreakdown = (selection, features, basePrice) => {
    const lines = [{ key: 'base', label: 'Base keyboard', price: basePrice }]

    for (const feature of features) {
        const option = getOption(features, feature.slug, selection[feature.slug])
        if (option) {
            lines.push({ key: feature.slug, label: `${feature.name}: ${option.name}`, price: option.price })
        }
    }

    return lines
}

export const calcTotalPrice = (selection, features, basePrice) => {
    const total = priceBreakdown(selection, features, basePrice).reduce((sum, line) => sum + line.price, 0)
    return Math.round(total * 100) / 100
}

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export const formatPrice = (amount) => currency.format(amount ?? 0)

export const formatOptionPrice = (price) => (price > 0 ? `+${formatPrice(price)}` : 'Included')
