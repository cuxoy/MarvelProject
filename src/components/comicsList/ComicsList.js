import { useState, useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ErrorMassage from "../errorMassage/ErrorMassage";
import "./comicsList.scss";
import useMarvelService from "../../services/MarvelService";

const ComicsList = () => {
  const { loading, error, getAllComics } = useMarvelService();

  const [comicsList, setComicsList] = useState([]);

  const [offsetComicsList, setOffsetComicsList] = useState(
    Math.floor(Math.random() * (52071 - 0) + 0)
  );

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    getAllComics(offsetComicsList).then(onComicsListLoaded);
  };

  const onComicsListLoaded = (newComicsList) => {
    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setOffsetComicsList((offsetComicsList) => offsetComicsList + 8);
  };

  let comics = [];
  comicsList.length > 0 ? (comics = comicsList) : console.log("loading");
  const errorMassage = error ? <ErrorMassage /> : null;
  const loadingMassage = loading ? (
    <BallTriangle height="200" width="200" color="red" />
  ) : null;
  let items = comics.map((item) => {
    return (
      <CSSTransition timeout={900} classNames="my-node">
        <li className="comics__item" key={item.id}>
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.name}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.name}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      </CSSTransition>
    );
  });

  return (
    <div className="comics__list">
      {errorMassage}
      {loadingMassage}
      <TransitionGroup component={"ul"} className="comics__grid">
        {items}
      </TransitionGroup>
      <button onClick={onRequest} className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
