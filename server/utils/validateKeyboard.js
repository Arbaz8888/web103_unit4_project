import { pool } from '../config/database.js'
import { BASE_PRICE, FEATURE_SLUGS, roundPrice } from './pricing.js'

export const findConflicts = (selection, rules) =>
    rules.filter((rule) =>
        selection[rule.when_feature] === rule.when_option &&
        selection[rule.blocks_feature] === rule.blocks_option
    )

export const validateKeyboard = async (body = {}) => {
    const errors = []

    const name = typeof body.name === 'string' ? body.name.trim() : ''
    if (!name) errors.push('Give your keyboard a name.')
    else if (name.length > 60) errors.push('Keep the name to 60 characters or fewer.')

    const { rows: options } = await pool.query(`
        SELECT f.slug AS feature, f.name AS feature_name, o.slug, o.name, o.price::float AS price
        FROM options o
        JOIN features f ON f.id = o.feature_id
    `)
    const { rows: rules } = await pool.query('SELECT * FROM incompatibilities')

    const selection = {}
    let price = BASE_PRICE
    for (const feature of FEATURE_SLUGS) {
        const option = options.find((o) => o.feature === feature && o.slug === body[feature])
        if (!option) {
            const label = options.find((o) => o.feature === feature)?.feature_name ?? feature
            errors.push(`Choose a ${label.toLowerCase()} option.`)
            continue
        }
        selection[feature] = option.slug
        price += option.price
    }

    const conflicts = findConflicts(selection, rules)
    conflicts.forEach((rule) => errors.push(rule.message))

    return { errors, conflicts, name, selection, price: roundPrice(price) }
}
