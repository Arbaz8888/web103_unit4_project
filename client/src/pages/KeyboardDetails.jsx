import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCatalog } from '../context/CatalogContext'
import KeyboardPreview from '../components/KeyboardPreview'
import SpecChips from '../components/SpecChips'
import ConfirmDialog from '../components/ConfirmDialog'
import { Loading, ErrorBanner } from '../components/Status'
import { getKeyboard, deleteKeyboard } from '../services/KeyboardsAPI'
import { formatPrice, formatOptionPrice } from '../utilities/calcPrice'
import { resolveBuild } from '../utilities/selection'
import usePageTitle from '../hooks/usePageTitle'
import '../App.css'

const formatDate = (value) =>
    new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const KeyboardDetails = ({ title }) => {
    usePageTitle(title)
    const { id } = useParams()
    const navigate = useNavigate()
    const catalog = useCatalog()

    const [keyboard, setKeyboard] = useState(null)
    const [status, setStatus] = useState({ loading: true, error: null })
    const [confirming, setConfirming] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [actionError, setActionError] = useState(null)

    useEffect(() => {
        let cancelled = false

        const load = async () => {
            setStatus({ loading: true, error: null })
            try {
                const data = await getKeyboard(id)
                if (!cancelled) {
                    setKeyboard(data)
                    setStatus({ loading: false, error: null })
                }
            } catch (error) {
                if (!cancelled) setStatus({ loading: false, error: error.message })
            }
        }

        load()
        return () => { cancelled = true }
    }, [id])

    useEffect(() => {
        if (keyboard?.name) document.title = `ClackLab | ${keyboard.name}`
    }, [keyboard])

    const handleDelete = async () => {
        setDeleting(true)
        setActionError(null)
        try {
            await deleteKeyboard(id)
            navigate('/keyboards')
        } catch (error) {
            setActionError(error.message)
            setDeleting(false)
            setConfirming(false)
        }
    }

    const loading = status.loading || catalog.loading
    const error = status.error || catalog.error
    const build = keyboard ? resolveBuild(keyboard, catalog.features) : {}

    return (
        <section className='page'>
            {loading && <Loading label='Loading keyboard…' />}
            {!loading && error && (
                <>
                    <ErrorBanner message={error} />
                    <Link to='/keyboards' className='btn btn-ghost'>Back to my keyboards</Link>
                </>
            )}

            {!loading && !error && keyboard && (
                <>
                    <header className='page-head with-actions'>
                        <div>
                            <p className='eyebrow'>Custom keyboard</p>
                            <h2>{keyboard.name}</h2>
                            <p className='meta'>
                                Created {formatDate(keyboard.created_at)}
                                {keyboard.updated_at !== keyboard.created_at && ` · Updated ${formatDate(keyboard.updated_at)}`}
                            </p>
                        </div>
                        <div className='details-actions'>
                            <Link to='/keyboards' className='btn btn-ghost'>All keyboards</Link>
                            <Link to={`/edit/${keyboard.id}`} className='btn btn-secondary'>Edit</Link>
                            <button type='button' className='btn btn-danger' onClick={() => setConfirming(true)}>
                                Delete
                            </button>
                        </div>
                    </header>

                    {actionError && <ErrorBanner message={actionError} />}

                    <div className='details'>
                        <div className='preview-card'>
                            <KeyboardPreview build={build} />
                            <SpecChips build={build} features={catalog.features} />
                        </div>

                        <div className='card'>
                            <h3 className='card-title'>Build sheet</h3>
                            <table className='spec-table'>
                                <tbody>
                                    <tr>
                                        <th scope='row'>Base keyboard</th>
                                        <td></td>
                                        <td className='num'>{formatPrice(catalog.basePrice)}</td>
                                    </tr>
                                    {catalog.features.map((feature) => {
                                        const option = build[feature.slug]
                                        return (
                                            <tr key={feature.slug}>
                                                <th scope='row'>{feature.name}</th>
                                                <td>
                                                    <span className='spec-value'>{option?.name ?? keyboard[feature.slug]}</span>
                                                    {option?.description && <span className='spec-desc'>{option.description}</span>}
                                                </td>
                                                <td className='num'>{option ? formatOptionPrice(option.price) : '—'}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th scope='row'>Total</th>
                                        <td></td>
                                        <td className='num total'>{formatPrice(keyboard.price)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <ConfirmDialog
                        open={confirming}
                        title={`Delete "${keyboard.name}"?`}
                        message='This removes the keyboard from your saved builds. There is no undo.'
                        busy={deleting}
                        onConfirm={handleDelete}
                        onCancel={() => setConfirming(false)}
                    />
                </>
            )}
        </section>
    )
}

export default KeyboardDetails
