import { useState, useContext } from "react";

import { Context as MovieContext } from '../../context/MoviesContext';

const DEFAULT_MESSAGE = '';
const DEFAULT_REVIEW = 0;

export const useReviewForm = () => {
  const { selectMovie, submitReview } = useContext(MovieContext);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [review, setReview] = useState(DEFAULT_REVIEW);

  const resetForm = () => {
    selectMovie(undefined);
    setMessage(DEFAULT_MESSAGE);
    setReview(DEFAULT_REVIEW);
  }

  const onCancel = () => {
    resetForm();
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitReview({ message, review });
    resetForm();
  };

  return {
    onCancel,
    onSubmit,
    review,
    message,
    setReview,
    setMessage,
  };
};
