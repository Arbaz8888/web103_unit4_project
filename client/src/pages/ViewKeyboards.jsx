import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCatalog } from '../context/CatalogContext'
import KeyboardCard from '../components/KeyboardCard'
import ConfirmDialog from '../components/ConfirmDialog'
import { Loading, ErrorBanner, EmptyState } from '../components/Status'
import { getAllKeyboards, deleteKeyboard } from '../services/KeyboardsAPI'
import usePageTitle from '../hooks/usePageTitle'
import '../App.css'

const ViewKeyboards = ({ title }) => {
    usePageTitle(title)
    const catalog = useCatalog()

    const [keyboards, setKeyboards] = useState([])
    const [status, setStatus] = useState({ loading: true, error: null })
    const [pendingDelete, setPendingDelete] = useState(null)
    const [deleting, setDeleting] = useState(false)
    const [actionError, setActionError] = useState(null)

    const load = useCallback(async () => {
        setStatus({ loading: true, error: null })
        try {
            const data = await getAllKeyboards()
            setKeyboards(data)
            setStatus({ loading: false, error: null })
        } catch (error) {
            setStatus({ loading: false, error: error.message })
        }
    }, [])

    useEffect(() => {
        load()
    }, [load])

    const confirmDelete = async () => {
        if (!pendingDelete) return
        setDeleting(true)
        setActionError(null)
        try {
            await deleteKeyboard(pendingDelete.id)
            setKeyboards((previous) => previous.filter((keyboard) => keyboard.id !== pendingDelete.id))
            setPendingDelete(null)
        } catch (error) {
            setActionError(error.message)
        } finally {
            setDeleting(false)
        }
    }

    const loading = status.loading || catalog.loading
    const error = status.error || catalog.error

    return (
        <section className='page'>
            <header className='page-head with-actions'>
                <div>
                    <p className='eyebrow'>Saved builds</p>
                    <h2>My keyboards</h2>
                    <p className='lede'>
                        {keyboards.length === 0
                            ? 'Nothing saved yet.'
                            : `${keyboards.length} custom keyboard${keyboards.length === 1 ? '' : 's'}. Edit or delete any of them right here.`}
                    </p>
                </div>
                <Link to='/' className='btn btn-primary'>+ Build another</Link>
            </header>

            {actionError && <ErrorBanner message={actionError} />}
            {loading && <Loading label='Loading keyboards…' />}
            {!loading && error && <ErrorBanner message={error} onRetry={load} />}

            {!loading && !error && keyboards.length === 0 && (
                <EmptyState title='No keyboards yet'>
                    Head to the builder, pick your options, and save your first board.
                </EmptyState>
            )}

            {!loading && !error && keyboards.length > 0 && (
                <div className='kb-grid'>
                    {keyboards.map((keyboard) => (
                        <KeyboardCard
                            key={keyboard.id}
                            keyboard={keyboard}
                            features={catalog.features}
                            onDelete={setPendingDelete}
                        />
                    ))}
                </div>
            )}

            <ConfirmDialog
                open={Boolean(pendingDelete)}
                title={`Delete "${pendingDelete?.name}"?`}
                message='This removes the keyboard from your saved builds. There is no undo.'
                busy={deleting}
                onConfirm={confirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </section>
    )
}

export default ViewKeyboards
