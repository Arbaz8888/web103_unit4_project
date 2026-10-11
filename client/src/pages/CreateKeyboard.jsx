import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCatalog } from '../context/CatalogContext'
import KeyboardForm from '../components/KeyboardForm'
import { Loading, ErrorBanner } from '../components/Status'
import { createKeyboard } from '../services/KeyboardsAPI'
import usePageTitle from '../hooks/usePageTitle'
import '../App.css'

const CreateKeyboard = ({ title }) => {
    usePageTitle(title)
    const navigate = useNavigate()
    const { loading, error } = useCatalog()

    const handleCreate = async (values) => {
        const created = await createKeyboard(values)
        navigate(`/keyboards/${created.id}`)
    }

    return (
        <section className='page'>
            <header className='page-head'>
                <p className='eyebrow'>Build a board</p>
                <h2>Design your dream keyboard</h2>
                <p className='lede'>
                    Pick a layout, case, keycaps, switches, lighting and connectivity.
                    The preview and the price update as you go.
                </p>
            </header>

            {loading && <Loading label='Loading options…' />}
            {!loading && error && <ErrorBanner message={error} />}
            {!loading && !error && (
                <KeyboardForm onSubmit={handleCreate} submitLabel='Save keyboard' />
            )}
        </section>
    )
}

export default CreateKeyboard
