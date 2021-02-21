import React from "react";
import { useSelector } from "react-redux";

function OrderBookRow({ index }) {
    const state = useSelector((state) => state?.bookReducer?.ask_book[index]);
    return (
        <div className="columns">
            <div className="column">{state?.count}</div>
            <div className="column">{state?.amount}</div>
            <div className="column">{state?.total}</div>
            <div className="column">{state?.price}</div>
        </div>
    );;
}

export default OrderBookRow;
