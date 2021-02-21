import React, { useMemo, Fragment } from "react";
import { useSelector } from "react-redux";
import OrderBookRow from "./OrderBookRow";
const ar = [...new Array(25)];

function OrderBookWidget() {
 
    const key = "total";
    return (
            <div className="box">
                <p className="has-text-centered mb-3"><strong>Order Book</strong></p>
                <div className="">
                  
                        <div className="is-flex my-4" >
                            <strong className="col">Count</strong>
                            <strong className="col">Amount</strong>
                            <strong className="col">Total</strong>
                            <strong className="col">Price</strong>
                            {/* Second half */}
                            <strong className="col">Price</strong>
                            <strong className="col">Total</strong>
                            <strong className="col">Amount</strong>
                            <strong className="col">Count</strong>
                        </div>
                        {ar.map((elm, index) => (
                            <div className="columns" key={index}>
                                <OrderBookRow
                                    book_type="bid_book"
                                    index={index}
                                />
                                <OrderBookRow
                                    book_type="ask_book"
                                    index={index}
                                />
                            </div>
                        ))}
                </div>
            </div>
    );
}

export default OrderBookWidget;
