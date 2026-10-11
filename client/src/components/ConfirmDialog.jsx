import React, { useEffect } from 'react'

const ConfirmDialog = ({ open, title, message, confirmLabel = 'Delete', busy = false, onConfirm, onCancel }) => {
    useEffect(() => {
        if (!open) return undefined
        const onKey = (event) => {
            if (event.key === 'Escape') onCancel()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open, onCancel])

    if (!open) return null

    return (
        <div className='modal-backdrop' onClick={onCancel}>
            <div
                className='modal'
                role='dialog'
                aria-modal='true'
                aria-labelledby='confirm-title'
                onClick={(event) => event.stopPropagation()}
            >
                <h3 id='confirm-title'>{title}</h3>
                <p>{message}</p>
                <div className='modal-actions'>
                    <button type='button' className='btn btn-ghost' onClick={onCancel} disabled={busy}>
                        Cancel
                    </button>
                    <button type='button' className='btn btn-danger' onClick={onConfirm} disabled={busy}>
                        {busy ? 'Deleting…' : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDialog
