import React from 'react'
import Swatch from './Swatch'
import { formatOptionPrice } from '../utilities/calcPrice'
import { findConflicts, getBlockingRules } from '../utilities/validation'

// One section of the builder: every option for a single feature.
// Options ruled out by the current selection are greyed out before submit;
// an already-selected option that becomes invalid is flagged in red.
const FeaturePicker = ({ feature, selection, rules, onSelect, optionName }) => {
    const selected = selection[feature.slug]
    const conflicts = findConflicts(selection, rules).filter((rule) => rule.blocks_feature === feature.slug)

    return (
        <fieldset className='feature'>
            <legend className='feature-head'>
                <span className='feature-name'>{feature.name}</span>
                <span className='feature-desc'>{feature.description}</span>
            </legend>

            <div className='option-grid' role='radiogroup' aria-label={feature.name}>
                {feature.options.map((option) => {
                    const blockers = getBlockingRules(feature.slug, option.slug, selection, rules)
                    const isSelected = selected === option.slug
                    const isBlocked = blockers.length > 0
                    const state = isSelected && isBlocked ? 'conflicting' : isBlocked ? 'blocked' : isSelected ? 'selected' : ''

                    return (
                        <button
                            type='button'
                            key={option.slug}
                            role='radio'
                            aria-checked={isSelected}
                            aria-disabled={isBlocked && !isSelected}
                            className={`option ${state}`.trim()}
                            onClick={() => {
                                if (!isBlocked) onSelect(feature.slug, option.slug)
                            }}
                        >
                            <span className='option-top'>
                                <Swatch feature={feature.slug} option={option} />
                                <span className='option-price'>{formatOptionPrice(option.price)}</span>
                            </span>
                            <span className='option-name'>{option.name}</span>
                            {option.description && <span className='option-desc'>{option.description}</span>}
                            {isBlocked && (
                                <span className='option-note'>
                                    {isSelected ? 'Conflicts with' : 'Not available with'}{' '}
                                    {optionName(blockers[0].when_feature, blockers[0].when_option)}
                                </span>
                            )}
                        </button>
                    )
                })}
            </div>

            {conflicts.map((rule) => (
                <p key={rule.id} className='feature-warning' role='alert'>
                    ⚠️ {rule.message}
                </p>
            ))}
        </fieldset>
    )
}

export default FeaturePicker
