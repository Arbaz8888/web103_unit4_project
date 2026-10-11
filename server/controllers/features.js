import { pool } from '../config/database.js'
import { BASE_PRICE } from '../utils/pricing.js'

const OPTION_COLUMNS = `
    o.id, f.slug AS feature, o.slug, o.name, o.description,
    o.price::float AS price, o.meta, o.sort_order
`

// Every feature with its options nested, plus the base price the client needs for totals.
const getFeatures = async (req, res) => {
    try {
        const { rows: features } = await pool.query(
            'SELECT id, slug, name, description, sort_order FROM features ORDER BY sort_order, id'
        )
        const { rows: options } = await pool.query(
            `SELECT ${OPTION_COLUMNS} FROM options o JOIN features f ON f.id = o.feature_id ORDER BY o.sort_order, o.id`
        )
        const result = features.map((feature) => ({
            ...feature,
            options: options.filter((option) => option.feature === feature.slug)
        }))
        res.status(200).json({ basePrice: BASE_PRICE, features: result })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getFeatureBySlug = async (req, res) => {
    try {
        const { rows: features } = await pool.query(
            'SELECT id, slug, name, description, sort_order FROM features WHERE slug = $1',
            [req.params.slug]
        )
        if (features.length === 0) return res.status(404).json({ error: `No feature "${req.params.slug}".` })

        const { rows: options } = await pool.query(
            `SELECT ${OPTION_COLUMNS} FROM options o JOIN features f ON f.id = o.feature_id
             WHERE f.slug = $1 ORDER BY o.sort_order, o.id`,
            [req.params.slug]
        )
        res.status(200).json({ ...features[0], options })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default { getFeatures, getFeatureBySlug }
