import actionTypes from './actionTypes'


export const setUser = (user) => (
    {
        type: actionTypes.SET_USER,
        payload: {
            user,
        }
    }
)


export const setLinks = (links) => (
    {
        type: actionTypes.SET_LINKS,
        payload: {
            links,
        }
    }
)


export const deleteLink = (id) => (
    {
        type: actionTypes.DELETE_LINK,
        payload: {
            id,
        }
    }
)


export const editLink = (id, newLink) => (
    {
        type: actionTypes.EDIT_LINK,
        payload: {
            id,
            newLink
        }
    }
)