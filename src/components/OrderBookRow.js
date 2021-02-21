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
        <div className="column is-flex p-0 bgload">
            {book_type === "bid_book" ? (
                <>
                    <div className="col">{count}</div>
                    <div className="col">{amount}</div>
                    <div className="col">{total}</div>
                    <div className="col">{price}</div>
                </> 
            ) : (
                <>
                    <div className="col">{price}</div>
                    <div className="col">{Math.abs(total)}</div>
                    <div className="col">{Math.abs(amount)}</div>
                    <div className="col">{count}</div>
                </>
            )}
        </div>
    );
}

export default OrderBookRow;
