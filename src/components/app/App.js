import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import AppBanner from "../appBanner/AppBanner";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import ComicsList from "../comicsList/ComicsList";

const App = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar(id);
  };
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Switch>
            <Route exact path="/">
              <RandomChar />
              <div className="char__content">
                <CharList onCharSelected={onCharSelected} />
                <CharInfo charId={selectedChar} />
              </div>
              <img className="bg-decoration" src={decoration} alt="vision" />
            </Route>
            <Route exact path="/comics">
              <AppBanner />
              <ComicsList />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
