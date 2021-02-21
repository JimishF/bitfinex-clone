import React from "react";
import { useSelector } from "react-redux";

function OrderBookRow({ index, book_type = "ask_book" }) {
    const count = useSelector(
        (state) => state.bookReducer[book_type][index]?.count
    );
    const amount = useSelector(
        (state) => state.bookReducer[book_type][index]?.amount
    );
    const total = useSelector(
        (state) => state.bookReducer[book_type][index]?.total
    );
    const price = useSelector(
        (state) => state.bookReducer[book_type][index]?.price
    );

    if( !count ) return <></>
    return (
        <>
            {book_type === "bid_book" ? (
                <>
                    <td>{count}</td>
                    <td>{amount}</td>
                    <td>{total}</td>
                    <td>{price}</td>
                </>
            ) : (
                <>
                    <td>{price}</td>
                    <td>{total}</td>
                    <td>{amount}</td>
                    <td>{count}</td>
                </>
            )}
        </>
    );
}

export default OrderBookRow;
