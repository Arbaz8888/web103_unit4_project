import { pool } from '../config/database.js'
import { validateKeyboard } from '../utils/validateKeyboard.js'

// case_style is exposed to the client as "case" so it lines up with the feature slug.
const COLUMNS = `
    id, name, layout, case_style AS "case", keycaps, switches, lighting, connectivity,
    price::float AS price, created_at, updated_at
`

const parseId = (value) => {
    const id = Number.parseInt(value, 10)
    return Number.isInteger(id) && id > 0 ? id : null
}

const getKeyboards = async (req, res) => {
    try {
        const { rows } = await pool.query(`SELECT ${COLUMNS} FROM keyboards ORDER BY created_at DESC, id DESC`)
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getKeyboardById = async (req, res) => {
    const id = parseId(req.params.id)
    if (!id) return res.status(400).json({ error: 'Keyboard id must be a positive integer.' })

    try {
        const { rows } = await pool.query(`SELECT ${COLUMNS} FROM keyboards WHERE id = $1`, [id])
        if (rows.length === 0) return res.status(404).json({ error: `No keyboard with id ${id}.` })
        res.status(200).json(rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createKeyboard = async (req, res) => {
    try {
        const { errors, conflicts, name, selection, price } = await validateKeyboard(req.body)
        if (errors.length > 0) {
            return res.status(400).json({ error: errors[0], errors, conflicts })
        }

        const { rows } = await pool.query(
            `INSERT INTO keyboards (name, layout, case_style, keycaps, switches, lighting, connectivity, price)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING ${COLUMNS}`,
            [name, selection.layout, selection.case, selection.keycaps, selection.switches, selection.lighting, selection.connectivity, price]
        )
        res.status(201).json(rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateKeyboard = async (req, res) => {
    const id = parseId(req.params.id)
    if (!id) return res.status(400).json({ error: 'Keyboard id must be a positive integer.' })

    try {
        const { errors, conflicts, name, selection, price } = await validateKeyboard(req.body)
        if (errors.length > 0) {
            return res.status(400).json({ error: errors[0], errors, conflicts })
        }

        const { rows } = await pool.query(
            `UPDATE keyboards
             SET name = $1, layout = $2, case_style = $3, keycaps = $4, switches = $5,
                 lighting = $6, connectivity = $7, price = $8, updated_at = NOW()
             WHERE id = $9
             RETURNING ${COLUMNS}`,
            [name, selection.layout, selection.case, selection.keycaps, selection.switches, selection.lighting, selection.connectivity, price, id]
        )
        if (rows.length === 0) return res.status(404).json({ error: `No keyboard with id ${id}.` })
        res.status(200).json(rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteKeyboard = async (req, res) => {
    const id = parseId(req.params.id)
    if (!id) return res.status(400).json({ error: 'Keyboard id must be a positive integer.' })

    try {
        const { rows } = await pool.query(`DELETE FROM keyboards WHERE id = $1 RETURNING ${COLUMNS}`, [id])
        if (rows.length === 0) return res.status(404).json({ error: `No keyboard with id ${id}.` })
        res.status(200).json(rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default { getKeyboards, getKeyboardById, createKeyboard, updateKeyboard, deleteKeyboard }
