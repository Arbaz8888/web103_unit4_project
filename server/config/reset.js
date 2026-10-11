import { pool } from './database.js'
import { features, options, incompatibilities, sampleKeyboards } from './data.js'
import { BASE_PRICE, FEATURE_SLUGS, roundPrice } from '../utils/pricing.js'

const createTables = async () => {
    await pool.query('DROP TABLE IF EXISTS keyboards, incompatibilities, options, features CASCADE')

    await pool.query(`
        CREATE TABLE features (
            id SERIAL PRIMARY KEY,
            slug VARCHAR(40) UNIQUE NOT NULL,
            name VARCHAR(80) NOT NULL,
            description TEXT,
            sort_order INT NOT NULL DEFAULT 0
        )
    `)

    await pool.query(`
        CREATE TABLE options (
            id SERIAL PRIMARY KEY,
            feature_id INT NOT NULL REFERENCES features(id) ON DELETE CASCADE,
            slug VARCHAR(40) NOT NULL,
            name VARCHAR(80) NOT NULL,
            description TEXT,
            price NUMERIC(8, 2) NOT NULL DEFAULT 0,
            meta JSONB NOT NULL DEFAULT '{}',
            sort_order INT NOT NULL DEFAULT 0,
            UNIQUE (feature_id, slug)
        )
    `)

    await pool.query(`
        CREATE TABLE incompatibilities (
            id SERIAL PRIMARY KEY,
            when_feature VARCHAR(40) NOT NULL,
            when_option VARCHAR(40) NOT NULL,
            blocks_feature VARCHAR(40) NOT NULL,
            blocks_option VARCHAR(40) NOT NULL,
            message TEXT NOT NULL
        )
    `)

    await pool.query(`
        CREATE TABLE keyboards (
            id SERIAL PRIMARY KEY,
            name VARCHAR(60) NOT NULL,
            layout VARCHAR(40) NOT NULL,
            case_style VARCHAR(40) NOT NULL,
            keycaps VARCHAR(40) NOT NULL,
            switches VARCHAR(40) NOT NULL,
            lighting VARCHAR(40) NOT NULL,
            connectivity VARCHAR(40) NOT NULL,
            price NUMERIC(8, 2) NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
    `)

    console.log('🎉 tables created')
}

const seedFeatures = async () => {
    const ids = {}
    for (const feature of features) {
        const { rows } = await pool.query(
            'INSERT INTO features (slug, name, description, sort_order) VALUES ($1, $2, $3, $4) RETURNING id',
            [feature.slug, feature.name, feature.description, feature.sort_order]
        )
        ids[feature.slug] = rows[0].id
    }
    console.log(`✅ ${features.length} features seeded`)
    return ids
}

const seedOptions = async (featureIds) => {
    for (const option of options) {
        await pool.query(
            `INSERT INTO options (feature_id, slug, name, description, price, meta, sort_order)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [featureIds[option.feature], option.slug, option.name, option.description, option.price, option.meta, option.sort_order]
        )
    }
    console.log(`✅ ${options.length} options seeded`)
}

const seedIncompatibilities = async () => {
    for (const rule of incompatibilities) {
        await pool.query(
            `INSERT INTO incompatibilities (when_feature, when_option, blocks_feature, blocks_option, message)
             VALUES ($1, $2, $3, $4, $5)`,
            [rule.when_feature, rule.when_option, rule.blocks_feature, rule.blocks_option, rule.message]
        )
    }
    console.log(`✅ ${incompatibilities.length} incompatibility rules seeded`)
}

const priceFor = (keyboard) =>
    roundPrice(FEATURE_SLUGS.reduce((total, feature) => {
        const option = options.find((o) => o.feature === feature && o.slug === keyboard[feature])
        if (!option) throw new Error(`Sample keyboard "${keyboard.name}" uses unknown ${feature} "${keyboard[feature]}"`)
        return total + option.price
    }, BASE_PRICE))

const seedKeyboards = async () => {
    for (const keyboard of sampleKeyboards) {
        await pool.query(
            `INSERT INTO keyboards (name, layout, case_style, keycaps, switches, lighting, connectivity, price)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [keyboard.name, keyboard.layout, keyboard.case, keyboard.keycaps, keyboard.switches, keyboard.lighting, keyboard.connectivity, priceFor(keyboard)]
        )
    }
    console.log(`✅ ${sampleKeyboards.length} sample keyboards seeded`)
}

const reset = async () => {
    try {
        await createTables()
        const featureIds = await seedFeatures()
        await seedOptions(featureIds)
        await seedIncompatibilities()
        await seedKeyboards()
    } catch (error) {
        console.error('⚠️ reset failed:', error.message)
        process.exitCode = 1
    } finally {
        await pool.end()
    }
}

reset()
