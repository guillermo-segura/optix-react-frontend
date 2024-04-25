import { useState } from 'react';

import { useMoviesContext } from '../../context/MoviesContext';

const DEFAULT_MESSAGE = '';
const DEFAULT_REVIEW = 0;

export const useReviewForm = () => {
  const { selectMovie, submitReview } = useMoviesContext();
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [review, setReview] = useState(DEFAULT_REVIEW);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    submitReview({ message, review })
      .then(() => {
        resetForm();
      })
      .catch(() => {
        // @TODO: SURFACE ERROR THROUGH NOTIFICATION
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return {
    onCancel,
    onSubmit,
    review,
    message,
    setReview,
    setMessage,
    isSubmitting,
  };
};
