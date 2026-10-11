import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCatalog } from '../context/CatalogContext'
import KeyboardForm from '../components/KeyboardForm'
import { Loading, ErrorBanner } from '../components/Status'
import { getKeyboard, updateKeyboard } from '../services/KeyboardsAPI'
import usePageTitle from '../hooks/usePageTitle'
import '../App.css'

const EditKeyboard = ({ title }) => {
    usePageTitle(title)
    const { id } = useParams()
    const navigate = useNavigate()
    const catalog = useCatalog()

    const [keyboard, setKeyboard] = useState(null)
    const [status, setStatus] = useState({ loading: true, error: null })

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

    const handleUpdate = async (values) => {
        await updateKeyboard(id, values)
        navigate(`/keyboards/${id}`)
    }

    const loading = status.loading || catalog.loading
    const error = status.error || catalog.error

    return (
        <section className='page'>
            <header className='page-head with-actions'>
                <div>
                    <p className='eyebrow'>Edit</p>
                    <h2>{keyboard ? keyboard.name : 'Edit keyboard'}</h2>
                    <p className='lede'>Change any option. The price is recalculated when you save.</p>
                </div>
                <Link to={keyboard ? `/keyboards/${id}` : '/keyboards'} className='btn btn-ghost'>Cancel</Link>
            </header>

            {loading && <Loading label='Loading keyboard…' />}
            {!loading && error && <ErrorBanner message={error} />}
            {!loading && !error && keyboard && (
                <KeyboardForm key={keyboard.id} initialValues={keyboard} onSubmit={handleUpdate} submitLabel='Save changes' />
            )}
        </section>
    )
}

export default EditKeyboard
