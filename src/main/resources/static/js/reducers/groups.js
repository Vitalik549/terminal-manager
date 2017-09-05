const groups = (state = [], action) => {
    switch (action.type) {
        case 'ADD_GROUP':
            console.warn('add group');
            return null;
            break;
        case 'REMOVE_GROUP':
            console.warn('remove group');
            return null;
            break;
        default:
            return state
    }
};

export default groups;