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
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  updateChar = () => {
    // const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
      .getAllCharacters()
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { char, error, loading } = this.state;
    const errorMassage = error ? <ErrorMassage /> : null;
    const loadingMassage = loading ? (
      <BallTriangle height="200" width="200" color="red" />
    ) : null;

const items = char.map((item) => {
    let imgStyle = {'objectFit' : 'cover'};
    if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }
    
    return (
        <li 
            className="char__item"
            key={item.id}>
                <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                <div className="char__name">{item.name}</div>
        </li>
    )})

    const content = !(error || loading) ? items  : null;
    const charItem = loadingMassage || errorMassage || content;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {charItem}
         
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}


export default CharList;
