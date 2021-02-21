import WsWrapper from "./components/wrappers/WsWrapper";
import { Provider } from "react-redux";
import store from "./store";
function App() {
    return (
        <div>
            <Provider store={store}>
                <WsWrapper></WsWrapper>
            </Provider>
        </div>
    );
}

export default App;
