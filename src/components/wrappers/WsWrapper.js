import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
    Children,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { updateBook } from "../../actions/book";
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
    const messageHistory = useRef([]);

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

    const [channelState, setChannelState] = useState({});

    const updateSnapshotTrigger = (message) => {
        console.log(`Updating ${message[0]}`);
    };

    const createSnapshotTrigger = (message) => {
        let chanId = message[0]; 
        setChannelState((s) => {
            s[chanId] = { ...s[chanId], snapshotLoaded: true };
            return s;
        });
        console.log(`Creating ${message[0]}`);
    };

    useEffect(() => {
        if (lastMessage) {
            let data = JSON.parse(lastMessage.data);
            if (data.event === "subscribed") {
                /* Config */
                let { channel, chanId } = data;
                console.log(channel, chanId);
                setChannelState((s) => {
                    s[chanId] = { ...data, snapshotLoaded: false };
                    return s;
                });
            } else {
                /* Data */
                let chanId = data[0];
                if (
                    chanId &&
                    channelState[chanId] &&
                    !channelState[chanId].snapshotLoaded
                ) {
                    createSnapshotTrigger(data);
                } else {
                    updateSnapshotTrigger(data);
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
