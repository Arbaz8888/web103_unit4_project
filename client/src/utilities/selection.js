export const defaultSelection = (features) =>
    Object.fromEntries(features.map((feature) => [feature.slug, feature.options[0]?.slug]))

export const pickSelection = (record, features) =>
    Object.fromEntries(features.map((feature) => [feature.slug, record?.[feature.slug]]))

export const resolveBuild = (selection, features) =>
    Object.fromEntries(
        features.map((feature) => [
            feature.slug,
            feature.options.find((option) => option.slug === selection?.[feature.slug])
        ])
    )

export const describeBuild = (build) => {
    const parts = [build.layout?.name, build.case?.name, build.keycaps?.name].filter(Boolean)
    return parts.join(' · ')
}
