import request from './request'

const getAllKeyboards = async () => {
    return request('/api/keyboards')
}

const getKeyboard = async (id) => {
    return request(`/api/keyboards/${id}`)
}

const createKeyboard = async (keyboard) => {
    return request('/api/keyboards', {
        method: 'POST',
        body: JSON.stringify(keyboard)
    })
}

const updateKeyboard = async (id, keyboard) => {
    return request(`/api/keyboards/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(keyboard)
    })
}

const deleteKeyboard = async (id) => {
    return request(`/api/keyboards/${id}`, {
        method: 'DELETE'
    })
}

export { getAllKeyboards, getKeyboard, createKeyboard, updateKeyboard, deleteKeyboard }

export default { getAllKeyboards, getKeyboard, createKeyboard, updateKeyboard, deleteKeyboard }
