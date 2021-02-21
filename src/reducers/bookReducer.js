export default (state = { bid_book: [], ask_book: [] }, action) => {
    switch (action.type) {
        case "UPDATE_BID_BOOK":
            return {
                book: action.payload,
            };
        case "UPDATE_ASK_BOOK":
            return {
                book: action.payload,
            };
        default:
            return state;
    }
};
