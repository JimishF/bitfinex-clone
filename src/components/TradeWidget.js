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
                            <tr key={elm.id}>
                                <td>
                                    {daily_change - elm.price < 0 ? (
                                        <i className="fas fa-angle-up"></i>
                                    ) : (
                                        <i className="fas fa-angle-up"></i>
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
