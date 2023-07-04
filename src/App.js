import "./App.css";
import ToastWrapper from "./component/toast/toastWrapper";
import AppRouter from "./routers/AppRouter";

function App() {
  return (
    <div className="App">
      <ToastWrapper />
      <AppRouter />
    </div>
  );
}

export default App;
