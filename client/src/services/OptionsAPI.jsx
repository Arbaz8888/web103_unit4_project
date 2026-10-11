import request from './request'

// { basePrice, features: [{ slug, name, description, options: [...] }] }
const getFeatures = async () => {
    return request('/api/features')
}

const getFeature = async (slug) => {
    return request(`/api/features/${slug}`)
}

const getAllOptions = async () => {
    return request('/api/options')
}

const getOptionsForFeature = async (feature) => {
    return request(`/api/options?feature=${encodeURIComponent(feature)}`)
}

const getOption = async (id) => {
    return request(`/api/options/${id}`)
}

const getIncompatibilities = async () => {
    return request('/api/incompatibilities')
}

export { getFeatures, getFeature, getAllOptions, getOptionsForFeature, getOption, getIncompatibilities }

export default { getFeatures, getFeature, getAllOptions, getOptionsForFeature, getOption, getIncompatibilities }
