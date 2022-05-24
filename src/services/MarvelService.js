import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=53fa4d2285b861097b61ec23f4943d33";
  const randomInt = Math.floor(Math.random() * (1550 - 0) + 0);
  const randomIntComics = Math.floor(Math.random() * (52071 - 0) + 0);

  const getAllCharacters = async (offset = randomInt) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_tranformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _tranformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = randomIntComics) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComics = async (id) =>{
      const res = await request (
          `${_apiBase}comics/${id}?${_apiKey}`
      )
      return _transformComics(res.data.results[0])
  }

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      name: comics.title,
      description: comics.description,
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      price: comics.prices[0].price + " $",
      homepage: comics.urls[0].url,
      pages:comics.pageCount
    };
  };
  const _tranformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
  return {
    getAllCharacters,
    getCharacter,
    getAllComics,
    loading,
    error,
    clearError,
    getComics
   
  };
};
export default useMarvelService;
