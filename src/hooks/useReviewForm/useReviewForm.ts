import { useState, useContext } from "react";

import { Context as MovieContext } from '../../context/MoviesContext';

export const useReviewForm = () => {
  const { selectMovie, state: { selectedMovie } } = useContext(MovieContext);
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);

  const onCancel = () => {
    selectMovie(undefined);
    setDescription('');
    setRating(0);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Submit clicked', description, rating);
    onCancel(undefined);
  };

  const values = { description, rating };

  const setValues = (key, value) => {
    const setters = {
      description: setDescription,
      rating: setRating,
    };

    setters[key](value);
  };

  return {
    onCancel,
    onSubmit,
    values,
    setValues,
    selectedMovie,
  };
};
