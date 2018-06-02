const InitialState = { ID: 0, Page: '' };

export default (state = InitialState, action) => {
    switch (action.type) {
        case 'selectID':
            console.log(action.payload);
            return {
                ...state,
                ID: action.payload.selectID,
                Page: action.payload.page
            };
        default:
            return state;
    }
};
