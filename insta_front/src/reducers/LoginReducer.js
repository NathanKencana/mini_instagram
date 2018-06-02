const InitialState = { Password: '', Username: '', id: '' };

export default (state = InitialState, action) => {
    switch (action.type) {
        case 'userlogin':
            return {
                ...state,
                Id: action.payload.Id,                
                Username: action.payload.Username,
                Password: action.payload.Password,
                Profpic : action.payload.Profpic
            };
        default:
            return state;
    }
}