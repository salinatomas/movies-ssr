import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setFavorite, deleteFavorite } from "../actions";

import "../assets/styles/components/CarouselItem.scss";
import playIcon from "../assets/static/play-icon.png";
import plusIcon from "../assets/static/plus-icon.png";
import removeIcon from "../assets/static/remove-icon.png";
import { Link } from "react-router-dom";

import axios from "axios";

const CarouselItem = (props) => {
  const {
    userId,
    _id,
    title,
    cover,
    year,
    contentRating,
    duration,
    isList,
  } = props;

  const handleSetFavorite = () => {
    axios
      .post("/user-movies", { userId, movieId: _id })
      .then(({ data: userMovie }) =>
        props.setFavorite({
          userMovieId: userMovie.data,
          _id,
          title,
          cover,
          year,
          contentRating,
          duration,
        })
      )
      .catch((err) => console.log(err));
  };

  const handleDeleteFavorite = (userMovieId, movieId) => {
    axios
      .delete(`/user-movies/${userMovieId}`)
      .then(({ data }) => {
        props.deleteFavorite(movieId);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="carousel-item">
      <img className="carousel-item__img" src={cover} alt={title} />
      <div className="carousel-item__details">
        <div>
          <Link to={`/player/${props._id}`}>
            <img
              className="carousel-item__details--img"
              src={playIcon}
              alt="Play Icon"
            />
          </Link>

          {isList ? (
            <img
              className="carousel-item__details--img"
              src={removeIcon}
              alt="Remove Icon"
              onClick={() => handleDeleteFavorite(props.userMovieId, props._id)}
            />
          ) : (
            <img
              className="carousel-item__details--img"
              src={plusIcon}
              alt="Plus Icon"
              onClick={handleSetFavorite}
            />
          )}
        </div>
        <p className="carousel-item__details--title">{title}</p>
        <p className="carousel-item__details--subtitle">
          {`${year} ${contentRating} ${duration} minutos`}
        </p>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
  };
};

const mapDispatchToProps = {
  setFavorite,
  deleteFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselItem);
