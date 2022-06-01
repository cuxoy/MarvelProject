import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import "./searchChar.scss";
import searchButton from "../../resources/img/Search button.png";
import charButton from "../../resources/img/Button.png";
import { Link } from "react-router-dom";

const SearchChar = () => {
  const { getCharacterBySearch } = useMarvelService();
  const [char, setChar] = useState("");

  const onRequest = (char) => {
    getCharacterBySearch(char).then(setChar).catch(setChar(char));
  };

  let messageValidation = "hide";
  let messageValidationFalse = "hide";
  if (char && !char.name) {
    messageValidationFalse = "search-error-massage";
  } else if (char && char.name) {
    messageValidation = "search-found-message";
  }
  return (
    <div className="search-char">
      <h2>Find a charachter by name</h2>
      <Formik
        htmlFor="searchChar"
        className="search-char__panel"
        initialValues={{ text: char }}
        validationSchema={yup.object({
          text: yup.string().required("This field is required"),
        })}
        onSubmit={(values) => onRequest(values.text)}
      >
        <Form>
          <Field
            id="text"
            type="text"
            name="text"
            className="search-char__search-input"
            placeholder = "Enter the name"
          />
          <button type="submit" className=" button">
            <img src={searchButton}></img>
          </button>
          <ErrorMessage
            name="text"
            component="div"
            className="search-error-massage"
          />
          <div className={messageValidationFalse}> Character not found</div>
          <div className={messageValidation}>
            {" "}
            Character is found
            <div className="mt-10">There is! Visit {char.name} page?</div>
            <Link to={`/:${char.name}`}>
              <img className="button mt-10" src={charButton}></img>
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export default SearchChar;
