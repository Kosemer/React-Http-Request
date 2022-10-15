import React, { useRef, useState } from "react";

import classes from "./AddMovie.module.css";

function AddMovie(props) {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  const [title, setTitle] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [success, setSuccess] = useState(false);

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const openingTextHandler = (event) => {
    setOpeningText(event.target.value);
  };

  const releaseDateHandler = (event) => {
    setReleaseDate(event.target.value);
  };

  const startSuccess = () => {
    setSuccess(true);
  };

  const stopSuccess = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  function submitHandler(event) {
    event.preventDefault();
    if (title == 0 || openingText == 0 || releaseDate == 0) {
      return setIsValid(false);
    }
    setSuccess(true)
    console.log(title);
    // could add validation here...

    const movie = {
      title: title,
      openingText: openingText,
      releaseDate: releaseDate,
    };
    props.onAddMovie(movie);
    setTitle("");
    setOpeningText("");
    setReleaseDate("");
    setIsValid(true);
    stopSuccess();
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          onChange={titleHandler}
          value={title}
          ref={titleRef}
          placeholder="Type here..."
        />
        {!isValid && title.length <= 0 ? (
          <p className={classes.inValid}>Title is required!</p>
        ) : (
          ""
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea
          rows="5"
          id="opening-text"
          onChange={openingTextHandler}
          value={openingText}
          ref={openingTextRef}
          placeholder="Type here..."
        ></textarea>
        {!isValid && openingText <= 0 ? (
          <p className={classes.inValid}>Text is required!</p>
        ) : (
          ""
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input
          type="text"
          id="date"
          onChange={releaseDateHandler}
          value={releaseDate}
          ref={releaseDateRef}
          placeholder="Type here..."
        />
        {!isValid && releaseDate.length <= 0 ? (
          <p className={classes.inValid}>Date is required!</p>
        ) : (
          ""
        )}
      </div>
      {success ? <p className={classes.success}>Success</p> : ''}
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
