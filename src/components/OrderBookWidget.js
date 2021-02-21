import React, { useMemo, Fragment } from "react";
import { useSelector } from "react-redux";
import OrderBookRow from "./OrderBookRow";
const ar = [...new Array(25)];

function OrderBookWidget() {
    const min = 0;
    const key = "total";
    return (
        <section className="section">
            <div className="box">
                <table className="table  is-narrow is-fullwidth">
                    <thead>
                        <tr className="has-background-info-light">
                            <th>Count</th>
                            <th>Amount</th>
                            <th>Total</th>
                            <th>Price</th>
                            {/* Second half */}
                            <th>Price</th>
                            <th>Total</th>
                            <th>Amount</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ar.map((elm, index) => (
                            <tr key={index}>
                                <OrderBookRow
                                    book_type="bid_book"
                                    index={index}
                                />
                                <OrderBookRow
                                    book_type="ask_book"
                                    index={index}
                                />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default OrderBookWidget;
