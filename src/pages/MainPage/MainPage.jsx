import tracksList from "../../assets/tracksList";
import style from "./MainPage.module.scss";
import Track from "../../components/Track/Track";

const MainPage = () => {
  return (
    <div className={style.search}>
      <>Search tracks</>
      <div className={style.list}>
        {tracksList.map((track) => (
          <Track key={track.id} {...track} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
