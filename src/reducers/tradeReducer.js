const MAX_TRADES = 50;
const get_updated_trade = (trade, payload) => {
    let [chanId, flag, data] = payload;
    let [id, timestamp, amount, price] = data;

    trade.unshift({
        id,
        timestamp,
        amount,
        price,
    });
    return trade.slice(0, MAX_TRADES);
};

const get_create_trade = (payload) => {
    let trade = [];
    let [chanId, flag, data] = payload;
    for (let element of data) {
        let [id, timestamp, amount, price] = element;
        trade.unshift({
            id,
            timestamp,
            amount,
            price,
        });
    }
    return trade;
};

export default (state = { trade: [] }, action) => {
    switch (action.type) {
        case "CREATE_TRADE": {
            let trade = get_create_trade(action.payload);
            return {
                trade,
            };
        }

        case "UPDATE_TRADE": {
            let trade = get_updated_trade(state.trade, action.payload);
            return {
                ...state,
                trade,
            };
        }

        default:
            return state;
    }
};
