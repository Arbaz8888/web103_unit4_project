import { pool } from '../config/database.js'

const OPTION_COLUMNS = `
    o.id, f.slug AS feature, o.slug, o.name, o.description,
    o.price::float AS price, o.meta, o.sort_order
`

// GET /api/options           -> every option
// GET /api/options?feature=x -> options for one feature
const getOptions = async (req, res) => {
    try {
        const { feature } = req.query
        const { rows } = feature
            ? await pool.query(
                `SELECT ${OPTION_COLUMNS} FROM options o JOIN features f ON f.id = o.feature_id
                 WHERE f.slug = $1 ORDER BY o.sort_order, o.id`,
                [feature]
            )
            : await pool.query(
                `SELECT ${OPTION_COLUMNS} FROM options o JOIN features f ON f.id = o.feature_id
                 ORDER BY f.sort_order, o.sort_order, o.id`
            )
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getOptionById = async (req, res) => {
    const id = Number.parseInt(req.params.id, 10)
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'Option id must be a positive integer.' })

    try {
        const { rows } = await pool.query(
            `SELECT ${OPTION_COLUMNS} FROM options o JOIN features f ON f.id = o.feature_id WHERE o.id = $1`,
            [id]
        )
        if (rows.length === 0) return res.status(404).json({ error: `No option with id ${id}.` })
        res.status(200).json(rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default { getOptions, getOptionById }
