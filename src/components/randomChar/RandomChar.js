import { useState, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import ErrorMassage from "../errorMassage/ErrorMassage";
import "./randomChar.scss";
import useMarvelService from "../../services/MarvelService";
import mjolnir from "../../resources/img/mjolnir.png";
import { CSSTransition } from "react-transition-group";

const RandomChar = () => {
  const [char, setChar] = useState({});

  const { loading, error, getCharacter, clearError } = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  };
  useEffect(() => {
    updateChar();
  }, []);

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id).then(onCharLoaded);
  };

  const errorMassage = error ? <ErrorMassage /> : null;
  const loadingMassage = loading ? (
    <Triangle height="200" width="200" color="red" />
  ) : null;
  const content = !(error || loading) ? <View char={char} /> : null;

  let transitionIn = content? true : false;

  return (
    
      <div className="randomchar">
        <CSSTransition in={transitionIn} timeout={900} classNames="my-node">
        <>
        {errorMassage}
        {loadingMassage}
        {content}
        </>
        </CSSTransition>
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div className="inner" onClick={() => updateChar()}>
              try it
            </div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    // </CSSTransition>
  );
};
const View = ({ char }) => {
  let { name, description, thumbnail, wiki, homepage } = char;
  let randomImgClass = "randomchar__img";

  if (description && description.length <= 1) {
    description += "No description yet";
  } else if (description && description.length > 200) {
    description = description.slice(0, 200) + "...";
  }

  if (
    thumbnail ==
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    randomImgClass += " cover";
  }

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className={randomImgClass} />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
