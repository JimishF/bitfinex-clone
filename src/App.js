import WsWrapper from "./components/wrappers/WsWrapper";
import { Provider } from "react-redux";
import store from "./store";
import OrderBookWidget from "./components/OrderBookWidget";
function App() {
    return (
        <div>
            <Provider store={store}>
                <WsWrapper>
                    <OrderBookWidget />
                </WsWrapper>
            </Provider>
        </div>
    );
}

export default App;
