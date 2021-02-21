import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
} from "react";
import { useDispatch } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";
import DataInterpreter from "./DataInterpreter";

const SYMBOL = "tBTCUSD";
const SUBSCRIPTION_PAYLOADS = [
    {
        event: "subscribe",
        channel: "book",
        symbol: SYMBOL,
        frequency: "F1",
        prec: "p1",
    },
    // {
    //     event: "subscribe",
    //     channel: "trades",
    //     symbol: SYMBOL,
    //     frequency: "F1",
    // },
    {
        event: "subscribe",
        channel: "ticker",
        symbol: SYMBOL,
        prec: "p1",
    },
];
export const WsWrapper = ({ children }) => {
    //Public API that will echo messages sent to it back to the client
    const [socketUrl] = useState("wss://api-pub.bitfinex.com/ws/2");
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    const connectChannels = useCallback(() => {
        SUBSCRIPTION_PAYLOADS.map((config) => {
            sendMessage(JSON.stringify(config));
        });
    }, []);

    const disconnectChannels = () => {};
    useEffect(() => {
        connectChannels();
        return () => {
            disconnectChannels();
        };
    }, []);

    // const connectionStatus = {
    //     [ReadyState.CONNECTING]: "Connecting",
    //     [ReadyState.OPEN]: "Open",
    //     [ReadyState.CLOSING]: "Closing",
    //     [ReadyState.CLOSED]: "Closed",
    //     [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    // }[readyState];

    return (
        <>
            <DataInterpreter lastMessage={lastMessage}>
                <div className="columns">
                    <div className="column">
                        <button className="button is-success">Enable Realtime</button>
                        <button className="button is-danger">Disable Realtime</button>
                    </div>
                </div>
                {children}
            </DataInterpreter>
        </>
    );
};

export default WsWrapper;
