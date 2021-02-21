import WsWrapper from "./components/wrappers/WsWrapper";
import { Provider } from "react-redux";
import store from "./store";
import OrderBookWidget from "./components/OrderBookWidget";
import Ticker from "./components/Ticker";
import "./styles/index.css";
import TradeWidget from "./components/TradeWidget";

function App() {
    return (
        <div className="container">
            <Provider store={store}>
                <WsWrapper>
                    <OrderBookWidget />
                    <Ticker/>
                    <TradeWidget />
                </WsWrapper>
            </Provider>
        </div>
    );
}

export default App;
