import { Component } from "react";
import { BallTriangle } from "react-loader-spinner";
import ErrorMassage from "../errorMassage/ErrorMassage";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
  state = {
    char: [],
    loading: true,
    error: false,
    offsetChar: Math.floor(Math.random() * (1550 - 0) + 0)
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();  
  }

  onRequest = (offset) =>{
    this.marvelService.getAllCharacters(offset)
    .then(this.onCharLoaded)
    .catch(this.error)
  }

  updateChar = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoaded = (newChar) => {
    this.setState(({char,offsetChar})=>({
       char:[...char, ...newChar],
        loading: false,
        offsetChar: offsetChar +9 
    }));
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { char, error, loading, offsetChar} = this.state;
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
          onClick={() => this.props.onCharSelected(item.id)}
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
        onClick={()=>this.onRequest(offsetChar)}>
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
