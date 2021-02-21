import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import OrderBookRow from "./OrderBookRow";
const ar = [...new Array(25)];

function OrderBookWidget() {
    const min = 0;
    const key = "total";
    return (
        <section className="section">
            <div className="container">
                {ar.map((elm, index) => (
                    <OrderBookRow key={index} index={index} />
                ))}
            </div>
        </section>
    );
}

export default OrderBookWidget;
