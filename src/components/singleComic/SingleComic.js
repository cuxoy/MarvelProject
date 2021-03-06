import "./singleComic.scss";
import useMarvelService from "../../services/MarvelService";
import ErrorMassage from "../errorMassage/ErrorMassage";
import { Triangle } from "react-loader-spinner";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

const SingleComic = () => {
  const { comicsId } = useParams();
  const { error, loading, getComics, clearError } = useMarvelService();
  const [comics, setComics] = useState(null);

  useEffect(() => {
    onComicsLoading();
  }, [comicsId]);

  const onComicsLoading = () => {
    clearError();
    getComics(comicsId)
    .then(comicsLoading);
  };
  
  const comicsLoading = (comics) => {
    if (comics && comics !== null) {
      setComics(comics);
    }
  };

  const errorMassage = error ? <ErrorMassage /> : null;
  const loadingMassage = loading ? (
    <Triangle height="200" width="200" color="red" />
  ) : null;
  let transitionIn = comics? true : false

  return (
    <div className="single-comic">
      {errorMassage}
      {loadingMassage}
      <CSSTransition in={transitionIn} timeout={900} classNames = "my-node">
        <Viev comics={comics} />
      </CSSTransition>
    </div>
  );
};

const Viev = ({ comics }) => {
  if (comics) {
    let { thumbnail, id, description, name, price, pages } = comics;
    if (!description) {
      description = "No description yet";
    }
    return (
        <>
          <img src={thumbnail} alt={name} className="single-comic__img" />
          <div className="single-comic__info">
            <h2 className="single-comic__name">{name}</h2>
            <p className="single-comic__descr">{description}</p>
            <p className="single-comic__descr">{pages} pages</p>
            <p className="single-comic__descr">Language: en-us</p>
            <div className="single-comic__price">{price}</div>
          </div>
          <Link to="/comics" className="single-comic__back">
            Back to all
          </Link>
        </>
    );
  }
};
export default SingleComic;
