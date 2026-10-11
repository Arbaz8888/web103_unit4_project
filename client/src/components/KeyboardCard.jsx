import React from 'react'
import { Link } from 'react-router-dom'
import KeyboardPreview from './KeyboardPreview'
import SpecChips from './SpecChips'
import { formatPrice } from '../utilities/calcPrice'
import { resolveBuild } from '../utilities/selection'

// A saved keyboard in the list view, with edit and delete right on the card.
const KeyboardCard = ({ keyboard, features, onDelete }) => {
    const build = resolveBuild(keyboard, features)

    return (
        <article className='kb-card'>
            <Link to={`/keyboards/${keyboard.id}`} className='kb-card-preview' aria-label={`View ${keyboard.name}`}>
                <KeyboardPreview build={build} compact />
            </Link>

            <div className='kb-card-body'>
                <div className='kb-card-head'>
                    <h3><Link to={`/keyboards/${keyboard.id}`}>{keyboard.name}</Link></h3>
                    <span className='kb-price'>{formatPrice(keyboard.price)}</span>
                </div>

                <SpecChips build={build} features={features} compact />

                <div className='kb-card-actions'>
                    <Link to={`/keyboards/${keyboard.id}`} className='btn btn-ghost btn-sm'>Details</Link>
                    <Link to={`/edit/${keyboard.id}`} className='btn btn-secondary btn-sm'>Edit</Link>
                    <button type='button' className='btn btn-danger btn-sm' onClick={() => onDelete(keyboard)}>
                        Delete
                    </button>
                </div>
            </div>
        </article>
    )
}

export default KeyboardCard
