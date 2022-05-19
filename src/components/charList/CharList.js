import { useState, useEffect, useRef } from "react";
import { BallTriangle } from "react-loader-spinner";
import ErrorMassage from "../errorMassage/ErrorMassage";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

const CharList = (props)=> {

  const [char,setChar] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState (false)
  const [offsetChar, setOffsetChar] = useState( Math.floor(Math.random() * (1550 - 0) + 0))

 const marvelService = new MarvelService();

useEffect(()=>{
  updateChar()
},[])

 const onRequest = (offset) =>{
    marvelService.getAllCharacters(offset)
    .then(onCharLoaded)
    .catch(error)
  }

 const updateChar = () => {
    marvelService
      .getAllCharacters()
      .then(onCharLoaded)
      .catch(onError);
  };

 const onCharLoaded = (newChar) => {

    setChar(char=> [...char, ...newChar])
    setLoading(false)
    setOffsetChar(offsetChar => offsetChar + 9)
  };

 const onError = () => {

    setLoading(false)
    setError(true)
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
        <li
          className="char__item"
          key={item.id}
          onClick={() => props.onCharSelected(item.id)}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    const content = !(error || loading) ? items : null;
    const charItem = loadingMassage || errorMassage || content;

    return (
      <div className="char__list">
        <ul className="char__grid">{charItem}</ul>
        <button className="button button__main button__long" 
        onClick={()=> onRequest(offsetChar)}>
          <div className="inner">load more</div>
        </button>
      </div>
    );
  
}

export default CharList;
