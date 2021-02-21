const get_updated_book = (book, payload, sort_type) => {
    let [chanId, data] = payload;
    let [price, count, amount] = data;
    let total = price * amount;

    let found = false;

    for (let index in book) {
        const entry = book[index];
        /* Update if price exists */
        if (entry.price === price) {
            book[index] = {
                count,
                price,
                amount,
                total,
            };
            found = true;
            break;
        }
    }

    /* Create if not found */
    if (!found) {
        book.unshift({
            count,
            price,
            amount,
            total,
        });
    }

    if (sort_type === "asc") {
        book.sort((a, z) => {
            return z.price - a.prize;
        });
    } else {
        book.sort((a, z) => {
            return z.price - a.prize;
        });
    }

    return book.slice(0, 25);
};
const remove_from_book = (bid_book, payload) => {
    let [chanId, data] = payload;
    let [price, count, amount] = data;
    return bid_book.filter((entry) => entry.price === price);
};

const get_create_books = (payload) => {
    let [chanId, data] = payload;
    let ask_book = [],
        bid_book = [];
    // debugger;
    data.forEach((element) => {
        let [price, count, amount] = element;
        let total = price * amount;

        /**
         * https://docs.bitfinex.com/reference#ws-public-books
         * from Algorithm to create and keep a book instance updated\
         * Assuming count > 0 for first snapshot
         */

        if (amount > 0) {
            bid_book.push({
                price,
                count,
                amount,
                total,
            });
        } else if (amount < 0) {
            ask_book.push({
                price,
                count,
                amount,
                total,
            });
        }
    });

    return { ask_book, bid_book };
};

export default (state = { bid_book: [], ask_book: [] }, action) => {
    switch (action.type) {
        case "CREATE_BOOK": {
            let { bid_book, ask_book } = get_create_books(action.payload);
            return {
                bid_book,
                ask_book,
            };
        }

        case "UPDATE_BID_BOOK": {
            let bid_book = get_updated_book(
                state.bid_book,
                action.payload,
                "asc"
            );
            return {
                ...state,
                bid_book,
            };
        }

        case "UPDATE_ASK_BOOK": {
            let ask_book = get_updated_book(
                state.ask_book,
                action.payload,
                "desc"
            );
            return {
                ...state,
                ask_book,
            };
        }

        case "REMOVE_BID_BOOK": {
            let bid_book = remove_from_book(state.bid_book, action.payload);
            return {
                ...state,
                bid_book,
            };
        }

        case "REMOVE_BID_BOOK": {
            let ask_book = remove_from_book(state.ask_book, action.payload);
            return {
                ...state,
                ask_book,
            };
        }

        default:
            return state;
    }
};
