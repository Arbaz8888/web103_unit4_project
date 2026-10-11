import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useCatalog } from '../context/CatalogContext'
import KeyboardPreview from './KeyboardPreview'
import SpecChips from './SpecChips'
import FeaturePicker from './FeaturePicker'
import PriceSummary from './PriceSummary'
import { calcTotalPrice, formatPrice, getOption } from '../utilities/calcPrice'
import { findConflicts, validateKeyboard, MAX_NAME_LENGTH } from '../utilities/validation'
import { defaultSelection, pickSelection, resolveBuild, describeBuild } from '../utilities/selection'

// Shared by the Create and Edit pages. `onSubmit` receives
// { name, layout, case, keycaps, switches, lighting, connectivity } and may throw.
const KeyboardForm = ({ initialValues, onSubmit, submitLabel = 'Save keyboard' }) => {
    const { basePrice, features, rules } = useCatalog()

    const [name, setName] = useState(initialValues?.name ?? '')
    const [selection, setSelection] = useState(() =>
        initialValues ? pickSelection(initialValues, features) : defaultSelection(features)
    )
    const [errors, setErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const errorRef = useRef(null)

    const build = useMemo(() => resolveBuild(selection, features), [selection, features])
    const total = calcTotalPrice(selection, features, basePrice)
    const conflictCount = findConflicts(selection, rules).length

    const optionName = (featureSlug, optionSlug) =>
        getOption(features, featureSlug, optionSlug)?.name ?? optionSlug

    const handleSelect = (featureSlug, optionSlug) => {
        setSelection((previous) => ({ ...previous, [featureSlug]: optionSlug }))
        setErrors([])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const problems = validateKeyboard(name, selection, features, rules)
        if (problems.length > 0) {
            setErrors(problems)
            return
        }

        setSubmitting(true)
        try {
            await onSubmit({ name: name.trim(), ...selection })
        } catch (error) {
            // The API returns every problem it found; fall back to the message.
            setErrors(error.details?.errors?.length ? error.details.errors : [error.message])
        } finally {
            setSubmitting(false)
        }
    }

    useEffect(() => {
        if (errors.length > 0) errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, [errors])

    return (
        <form className='builder' onSubmit={handleSubmit} noValidate>
            <div className='builder-preview'>
                <div className='preview-card'>
                    <KeyboardPreview build={build} />
                    <div className='preview-caption'>
                        <h3>
                            {name.trim() || 'Untitled build'}
                            {conflictCount > 0 && (
                                <span className='badge badge-warn'>
                                    {conflictCount} conflict{conflictCount > 1 ? 's' : ''}
                                </span>
                            )}
                        </h3>
                        <p>{describeBuild(build)}</p>
                    </div>
                    <SpecChips build={build} features={features} compact />
                </div>

                <div className='price-card'>
                    <PriceSummary selection={selection} features={features} basePrice={basePrice} />
                </div>
            </div>

            <div className='builder-form'>
                <label className='field'>
                    <span className='field-label'>Name your keyboard</span>
                    <input
                        type='text'
                        value={name}
                        maxLength={MAX_NAME_LENGTH}
                        placeholder='e.g. Midnight Typist'
                        onChange={(event) => {
                            setName(event.target.value)
                            setErrors([])
                        }}
                    />
                </label>

                {features.map((feature) => (
                    <FeaturePicker
                        key={feature.slug}
                        feature={feature}
                        selection={selection}
                        rules={rules}
                        onSelect={handleSelect}
                        optionName={optionName}
                    />
                ))}

                {errors.length > 0 && (
                    <div className='alert alert-error' role='alert' ref={errorRef}>
                        <strong>This keyboard can't be saved yet.</strong>
                        <ul>
                            {errors.map((message, index) => (
                                <li key={index}>{message}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className='form-actions'>
                    <div className='form-total'>
                        <span>Total</span>
                        <strong>{formatPrice(total)}</strong>
                    </div>
                    <button type='submit' className='btn btn-primary' disabled={submitting}>
                        {submitting ? 'Saving…' : submitLabel}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default KeyboardForm
