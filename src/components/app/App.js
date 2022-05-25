import React, { useState, Fragment, lazy, Suspense} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { Triangle } from "react-loader-spinner";
import AppBanner from "../appBanner/AppBanner";
import decoration from "../../resources/img/vision.png";
 
const Page404 = lazy(()=>import('../404/404'))
const SingleComic = lazy(()=>import('../singleComic/SingleComic'))
const RandomChar = lazy(()=>import('../randomChar/RandomChar'))
const CharList = lazy(()=>import("../charList/CharList"))
const CharInfo = lazy(()=>import("../charInfo/CharInfo"))
const ComicsList = lazy(()=>import("../comicsList/ComicsList"))

const App = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar(id);
  };
  return (
   <Suspense fallback={<Triangle/>}>
      <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element = {
              <Fragment>
                <RandomChar />
                <div className="char__content">
                  <CharList onCharSelected={onCharSelected} />
                  <CharInfo charId={selectedChar} />
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
              </Fragment>}>
            </Route>
            <Route path="/comics" element = {
              <Fragment>
                <AppBanner />
                <ComicsList />
              </Fragment>}/>
            <Route path="/comics/:comicsId" element = {
              <Fragment>
                <AppBanner />
                <SingleComic />
              </Fragment>}/>  
            <Route path="*" element = { <Page404 />}/>
          </Routes>
        </main>
      </div>
    </Router>
   </Suspense>
  );
};

export default App;
