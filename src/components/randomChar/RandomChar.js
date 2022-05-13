import { Component } from "react";
import { Triangle } from "react-loader-spinner";
import ErrorMassage from "../errorMassage/ErrorMassage";
import "./randomChar.scss";
import MarvelService from "../../services/MarvelService";
import mjolnir from "../../resources/img/mjolnir.png";

class RandomChar extends Component {

  state = {
    char: {},
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();
  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  componentDidMount(){
    this.updateChar();
  }

  onUpdate = ()=> {
    this.updateChar();
  }


  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError)
      
  };

  render() {
    let {
      char,
      loading,
      error,
    } = this.state

    const errorMassage = error ? <ErrorMassage /> : null;
    const loadingMassage = loading ? (
      <Triangle height="200" width="200" color="red" />
    ) : null;
    const content = !(error || loading) ?  <View char={char} /> : null;

    return (
      <div className="randomchar">
        {errorMassage}
        {loadingMassage}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div className="inner" onClick={this.onUpdate}>try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}
const View = ({ char }) => {
  let { name, description, thumbnail, wiki, homepage } = char ;
  let randomImgClass = "randomchar__img"

  if (description.length<=1) {
    description += "No description yet";
  } else if (description.length > 200) {
    description = description.slice(0, 200) + "...";
  }

  if(thumbnail =="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
       randomImgClass += " cover"
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
