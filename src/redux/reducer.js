import actionTypes from './actionTypes'


const initState = {
    user: null,
    links: []
}


const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload.user
            }

        case actionTypes.SET_LINKS:
            return {
                ...state,
                links: action.payload.links
            }

        
        case actionTypes.DELETE_LINK:
            let newLinks = state.links.filter(link => link.id !== action.payload.id)

            return {
                ...state,
                links: newLinks
            }


        case actionTypes.EDIT_LINK:
            let updatedLinks = state.links.map(link => {
                if(link.id === action.payload.id){
                    return {
                        ...link,
                        text: action.payload.newLink
                    }
                }else {
                    return link
                }
            })

            return {
                ...state,
                links: updatedLinks
            }


        default:
            console.log("REDUCER: default")
            return state
    }
}


export default reducer
