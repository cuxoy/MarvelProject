import { useEffect, useState } from "react";
import MarvelService from "../../services/MarvelService";
import { Triangle } from "react-loader-spinner";
import Skeleton from "../skeleton/Skeleton";
import ErrorMassage from "../errorMassage/ErrorMassage";
import "./charInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();
  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    marvelService.getCharacter(charId).then(onCharLoaded).catch(onError);
  };

  const errorMassage = error ? <ErrorMassage /> : null;
  const loadingMassage = loading ? (
    <Triangle height="200" width="200" color="red" />
  ) : null;
  const content = !(error || loading || !char) ? <View char={char} /> : null;

  const skeleton = char || loading || error ? null : <Skeleton />;
  return (
    <div className="char__info">
      {skeleton}
      {loadingMassage}
      {errorMassage}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  let { name, thumbnail, description, homepage, wiki, comics } = char;
  let noComics = "";
  if (comics.length == 0) {
    noComics += "No comics yet";
  }
  if (description.length <= 1) {
    description += "No description yet";
  } else if (description.length > 200) {
    description = description.slice(0, 200) + "...";
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {noComics}
        {comics.slice(0, 10).map((item, i) => {
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
