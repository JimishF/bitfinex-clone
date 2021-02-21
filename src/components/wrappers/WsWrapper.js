import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
    Children,
} from "react";
import { useDispatch } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";
const SUBSCRIPTION_PAYLOADS = [
    {
        event: "subscribe",
        channel: "book",
        symbol: "tBTCUSD",
        frequency: "F1",
    },
    {
        event: "subscribe",
        channel: "trades",
        symbol: "tBTCUSD",
        frequency: "F1",
    },
];
export const WsWrapper = ({ Children }) => {
    //Public API that will echo messages sent to it back to the client
    const [socketUrl] = useState("wss://api-pub.bitfinex.com/ws/2");
    const dispatch = useDispatch();
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

    const channelState = useRef({});

    const updateSnapshotTrigger = (message) => {
        let [chanId, data] = message;

        if (channelState.current[chanId].channel === "book") {
            let [price, count, amount] = data;

            /**
             * https://docs.bitfinex.com/reference#ws-public-books
             * from Algorithm to create and keep a book instance updated\
             */
            let action = null;
            if (count > 0) {
                if (amount > 0) {
                    // 3.1 if amount > 0 then add/update bids
                    action = "UPDATE_BID_BOOK";
                } else if (amount < 0) {
                    // 3.2 if amount < 0 then add/update asks
                    action = "UPDATE_ASK_BOOK";
                }
            } else if (count === 0) {
                if (amount == 1) {
                    // 4.1 if amount = 1 then remove from bids
                    action = "REMOVE_BID_BOOK";
                } else if (amount === -1) {
                    // 4.2 if amount = -1 then remove from asks
                    action = "REMOVE_ASK_BOOK";
                }
            }

            /* Dispatch appropriate action for bid/ask book */
            dispatch({
                type: action,
                payload: message,
            });
        } else if (channelState.current[chanId].channel === "trade") {
        }

        console.log(`Updating ${message[0]}`);
    };

    const createSnapshotTrigger = (message) => {
        let chanId = message[0];
        channelState.current[chanId] = {
            ...channelState.current[chanId],
            snapshotLoaded: true,
        };

        // TODO: decide trade or book, using chanId;
        if (channelState.current[chanId].channel === "book") {
            dispatch({
                type: "CREATE_BOOK",
                payload: message,
            });
        } else if (channelState.current[chanId].channel === "trade") {
        }

        console.log(`Creating ${message[0]}`);
    };

    useEffect(() => {
        if (lastMessage) {
            let data = JSON.parse(lastMessage.data);
            if (data.event === "subscribed") {
                /* Config */
                let { channel, chanId } = data;
                channelState.current[chanId] = {
                    ...data,
                    snapshotLoaded: false,
                };
            } else {
                /* Data */
                let chanId = data[0];
                if (chanId && channelState.current[chanId]) {
                    if (!channelState.current[chanId].snapshotLoaded) {
                        createSnapshotTrigger(data);
                    } else {
                        updateSnapshotTrigger(data);
                    }
                }
            }
        }
    }, [lastMessage]);

    // const connectionStatus = {
    //     [ReadyState.CONNECTING]: "Connecting",
    //     [ReadyState.OPEN]: "Open",
    //     [ReadyState.CLOSING]: "Closing",
    //     [ReadyState.CLOSED]: "Closed",
    //     [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    // }[readyState];

    return <>{Children}</>;
};

export default WsWrapper;
