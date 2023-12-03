import MainPage from "./pages/MainPage/MainPage.jsx";
import Playbar from "./components/Playbar/Playbar.jsx";
import style from "./global.module.scss";

const App = () => (
  <div className={style.wrapper}>
    <MainPage />
    <Playbar />
  </div>
);

export default App;
