const app = (state = {
  showAppLoader: true,
  showSignup: false,
  showFP:false,
  name: null,
  email: null,
  password: null,
  error: null
}, action) => {
  switch (action.type) {
    case 'UPDATE_APP_STATE': 
    return {
      ...state,
      ...action.state,
    }
    default:
      return state
  }
}

export default app