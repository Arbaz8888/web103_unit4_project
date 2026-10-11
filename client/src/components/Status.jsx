import React from 'react'
import { Link } from 'react-router-dom'

export const Loading = ({ label = 'Loading…' }) => (
    <div className='loading' role='status' aria-live='polite'>
        <span className='spinner' aria-hidden='true' />
        <span>{label}</span>
    </div>
)

export const ErrorBanner = ({ message, onRetry }) => (
    <div className='alert alert-error' role='alert'>
        <strong>Something went wrong.</strong>
        <p>{message}</p>
        {onRetry && (
            <button type='button' className='btn btn-ghost btn-sm' onClick={onRetry}>Try again</button>
        )}
    </div>
)

export const EmptyState = ({ title, children, to = '/', cta = 'Build a keyboard' }) => (
    <div className='empty-state'>
        <h3>{title}</h3>
        {children && <p>{children}</p>}
        <Link to={to} className='btn btn-primary'>{cta}</Link>
    </div>
)
