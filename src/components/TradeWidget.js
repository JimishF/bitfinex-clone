import React from "react";
import { useSelector } from "react-redux";

function TradeWidget() {
    const trade = useSelector((state) => state.tradeReducer.trade);
    return (
        <table className="table is-fullwidth is-narrow">
            <thead>
                <tr>
                    <td></td>
                    <td>Time</td>
                    <td>Price</td>
                    <td>Amount</td>
                </tr>
            </thead>
            <tbody>
                {trade.map((elm) => (
                    <tr key={elm.id}>
                        <td>{}</td>  
                        <td>{elm.timestamp}</td>  
                        <td>{elm.amount}</td>  
                        <td>{elm.price}</td>  
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TradeWidget;
