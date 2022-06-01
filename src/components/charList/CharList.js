import { useState, useEffect, useRef } from "react";
import { BallTriangle } from "react-loader-spinner";
import ErrorMassage from "../errorMassage/ErrorMassage";
import useMarvelService from "../../services/MarvelService";
import { CSSTransition, TransitionGroup } from "react-transition-group";


import "./charList.scss";

const CharList = (props) => {
  const [char, setChar] = useState([]);

  const [offsetChar, setOffsetChar] = useState(
    Math.floor(Math.random() * (1550 - 0) + 0)
  );

  const { error, loading, getAllCharacters, getAllComics } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const onRequest = (offset) => {
    getAllCharacters(offset).then(onCharLoaded);
  };

  const updateChar = () => {
    getAllCharacters().then(onCharLoaded);
  };

  const onCharLoaded = (newChar) => {
    setChar((char) => [...char, ...newChar]);
    setOffsetChar((offsetChar) => offsetChar + 9);
  };

  const errorMassage = error ? <ErrorMassage /> : null;
  const loadingMassage = loading ? (
    <BallTriangle height="200" width="200" color="red" />
  ) : null;

  const items = char.map((item) => {
    let imgStyle = { objectFit: "cover" };
    if (
      item.thumbnail ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
      imgStyle = { objectFit: "unset" };
    }

    return (
      <CSSTransition timeout={1000} classNames="my-node">
        <li
          className="char__item"
          key={item.id}
          onClick={() => props.onCharSelected(item.id)}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      </CSSTransition>
    );
  });

  return (
    <div className="char__list">
      {loadingMassage}
      {errorMassage}
      <TransitionGroup component={"ul"} className="char__grid">
        {items}
      </TransitionGroup>
      <button
        className="button button__main button__long"
        onClick={() => onRequest(offsetChar)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
