import { pool } from '../config/database.js'

const getIncompatibilities = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM incompatibilities ORDER BY id')
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default { getIncompatibilities }
