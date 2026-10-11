import React, { createContext, useContext, useEffect, useState } from 'react'
import { getFeatures, getIncompatibilities } from '../services/OptionsAPI'

// Loads the feature catalog (features, options, base price) and the
// incompatibility rules once, and shares them with every page.
const CatalogContext = createContext({
    basePrice: 0,
    features: [],
    rules: [],
    loading: true,
    error: null
})

export const CatalogProvider = ({ children }) => {
    const [catalog, setCatalog] = useState({
        basePrice: 0,
        features: [],
        rules: [],
        loading: true,
        error: null
    })

    useEffect(() => {
        let cancelled = false

        const load = async () => {
            try {
                const [featureData, rules] = await Promise.all([getFeatures(), getIncompatibilities()])
                if (cancelled) return
                setCatalog({
                    basePrice: featureData.basePrice,
                    features: featureData.features,
                    rules,
                    loading: false,
                    error: null
                })
            } catch (error) {
                if (cancelled) return
                setCatalog((previous) => ({ ...previous, loading: false, error: error.message }))
            }
        }

        load()
        return () => { cancelled = true }
    }, [])

    return (
        <CatalogContext.Provider value={catalog}>
            {children}
        </CatalogContext.Provider>
    )
}

export const useCatalog = () => useContext(CatalogContext)
