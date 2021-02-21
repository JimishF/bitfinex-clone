import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
function TradeWidget() {
    const trade = useSelector((state) => {
        return state.tradeReducer.trade;
    });
    const daily_change = useSelector(
        (state) => state.tickerReducer.ticker?.daily_change
    );

    return (
            <div className="box">
                <p className="has-text-centered mb-3"><strong>Trade History</strong></p>
                <table className="table is-fullwidth is-narrow">
                    <thead>
                        <tr className="has-background-info-light">
                            <td></td>
                            <td>Time</td>
                            <td>Price</td>
                            <td>Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        {trade.map((elm) => (
                            <tr key={elm.id} className={
<<<<<<< HEAD
                                daily_change - elm.price < 0 ? 'has-background-success-light' : 'has-background-danger-light' 
                            }>
                                <td>
                                    {daily_change - elm.price < 0 ? (
                                        <i className="fas has-text-success fa-angle-up"></i>
                                    ) : (
                                        <i className="fas has-text-danger fa-angle-down"></i>
=======
                                daily_change - elm.price < 0 ? 'has-background-danger-light' : 'has-background-success-light' 
                            }>
                                <td>
                                    {daily_change - elm.price < 0 ? (
                                        <i className="fas has-text-danger fa-angle-down"></i>
                                    ) : (
                                        <i className="fas has-text-success fa-angle-up"></i>
>>>>>>> 733f3db2b82ce8ef04dc85c1ffe1fa63f3be808b
                                    )}
                                </td>
                                <td>
                                    {moment(elm.timestamp).format(
                                        "DD MMM HH:mm:ss"
                                    )}
                                </td>
                                <td>{elm.price}</td>
                                <td>{Math.abs(elm.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    );
}

export default TradeWidget;
