import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'

import keyboardsRouter from './routes/keyboards.js'
import featuresRouter from './routes/features.js'
import optionsRouter from './routes/options.js'
import incompatibilitiesRouter from './routes/incompatibilities.js'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'favicon.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'favicon.png')))
    app.use(express.static('public'))
}

app.use('/api/keyboards', keyboardsRouter)
app.use('/api/features', featuresRouter)
app.use('/api/options', optionsRouter)
app.use('/api/incompatibilities', incompatibilitiesRouter)

app.use('/api', (req, res) => {
    res.status(404).json({ error: `No API route for ${req.method} ${req.originalUrl}` })
})

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ error: error.message })
})

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})
