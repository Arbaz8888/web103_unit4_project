import React from 'react'
import { priceBreakdown, calcTotalPrice, formatPrice, formatOptionPrice } from '../utilities/calcPrice'

const PriceSummary = ({ selection, features, basePrice }) => {
    const lines = priceBreakdown(selection, features, basePrice)
    const total = calcTotalPrice(selection, features, basePrice)

    return (
        <div className='price-summary'>
            <ul className='price-lines'>
                {lines.map((line) => (
                    <li key={line.key}>
                        <span>{line.label}</span>
                        <span className='price-amount'>
                            {line.key === 'base' ? formatPrice(line.price) : formatOptionPrice(line.price)}
                        </span>
                    </li>
                ))}
            </ul>
            <div className='price-total'>
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
            </div>
        </div>
    )
}

export default PriceSummary
