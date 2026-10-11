import React from 'react'
import Swatch from './Swatch'

// One chip per feature showing the chosen option.
const SpecChips = ({ build, features, compact = false }) => (
    <ul className={`spec-chips${compact ? ' compact' : ''}`}>
        {features.map((feature) => {
            const option = build[feature.slug]
            if (!option) return null
            return (
                <li key={feature.slug} className='chip'>
                    <Swatch feature={feature.slug} option={option} />
                    <span className='chip-text'>
                        {!compact && <span className='chip-label'>{feature.name}</span>}
                        <span className='chip-value'>{option.name}</span>
                    </span>
                </li>
            )
        })}
    </ul>
)

export default SpecChips
