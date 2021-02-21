import React, { useMemo, Fragment, useState } from "react";
import { useSelector } from "react-redux";
import OrderBookRow from "./OrderBookRow";
const ar = [...new Array(25)];

function OrderBookWidget() {
    const key = "total";
    const [chartType, setChartType] = useState("amount");
    const onChangeValue = (e) => {
        setChartType(e.target.value);
    };
    return (
        <div className="box">
            <p className="has-text-centered mb-3">
                <strong>Order Book</strong>
            </p>
            <div className="columns">
                <div className="column">
                    <form>
                        <div className="radio">
                            <label>
                                <input
                                    type="radio"
                                    value="amount"
                                    checked={
                                        chartType === "amount"
                                    }
                                    onChange={onChangeValue}
                                />
                                Amount 
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input
                                    type="radio"
                                    value="commutative"
                                    checked={
                                        chartType === "commutative"
                                    }
                                    onChange={onChangeValue}
                                />
                                Commutative
                            </label>
                        </div>
                    </form>
                </div>
            </div>
            <div className="">
                <div className="is-flex my-4">
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
                            chartType={chartType}
                        />
                        <OrderBookRow
                            book_type="ask_book"
                            index={index}
                            chartType={chartType}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderBookWidget;
