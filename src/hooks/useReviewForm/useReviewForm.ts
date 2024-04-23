import { useState, useContext } from "react";

import { Context as MovieContext } from '../../context/MoviesContext';

export const useReviewForm = () => {
  const { selectMovie, state: { selectedMovie } } = useContext(MovieContext);
  const [message, setMessage] = useState('');
  const [review, setReview] = useState(0);

  const onCancel = () => {
    selectMovie(undefined);
    setMessage('');
    setReview(0);
  }

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Submit clicked', message, review);
    onCancel();
  };

  return {
    onCancel,
    onSubmit,
    review,
    message,
    setReview,
    setMessage,
    selectedMovie,
  };
};
