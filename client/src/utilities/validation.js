// Feature-combination rules. Each rule is directional: while `when_option` is
// selected for `when_feature`, `blocks_option` is not allowed for `blocks_feature`.
// The same rows power the server-side check, so a combo rejected here is also
// rejected by the API.

export const findConflicts = (selection, rules) =>
    rules.filter((rule) =>
        selection[rule.when_feature] === rule.when_option &&
        selection[rule.blocks_feature] === rule.blocks_option
    )

// Rules that currently make a given option unavailable.
export const getBlockingRules = (featureSlug, optionSlug, selection, rules) =>
    rules.filter((rule) =>
        rule.blocks_feature === featureSlug &&
        rule.blocks_option === optionSlug &&
        selection[rule.when_feature] === rule.when_option
    )

export const MAX_NAME_LENGTH = 60

// Everything the form checks before it talks to the API. Returns a list of
// human-readable problems; an empty list means the keyboard can be saved.
export const validateKeyboard = (name, selection, features, rules) => {
    const errors = []
    const trimmed = (name ?? '').trim()

    if (!trimmed) errors.push('Give your keyboard a name.')
    else if (trimmed.length > MAX_NAME_LENGTH) errors.push(`Keep the name to ${MAX_NAME_LENGTH} characters or fewer.`)

    for (const feature of features) {
        const valid = feature.options.some((option) => option.slug === selection[feature.slug])
        if (!valid) errors.push(`Choose a ${feature.name.toLowerCase()} option.`)
    }

    findConflicts(selection, rules).forEach((rule) => errors.push(rule.message))

    return errors
}
