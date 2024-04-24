import {
  Avatar,
  CardContent,
  CardHeader,
  TextField,
  CardActions,
  Button,
} from '@mui/material';

import { Review } from '../generic/review/Review';
import { useReviewForm } from '../../hooks/useReviewForm/useReviewForm';
import { Modal } from '../generic/modal/Modal';
import { Movie } from '../../utils/types/models';

export interface ReviewFormProps {
  movie: Movie;
}

export const ReviewForm = ({ movie }: ReviewFormProps) => {
  const {
    onCancel,
    onSubmit,
    review,
    message,
    setReview,
    setMessage,
    isSubmitting,
  } = useReviewForm();

  const onChangeReview = (
    e: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) => setReview((newValue || 0) * 2);

  const hasErrors = message.length > 100 || review === 0;
  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);
  const helperText = message.length > 100  ? `${message.length}/100. Message is too long.` : `${message.length}/100`;

  return (
    <Modal open={!!movie} onClose={onCancel}>
      <form onSubmit={onSubmit}>
        <CardHeader
          title={movie.title}
          subheader={movie?.companyName}
          avatar={
            <Avatar>
              {movie.title?.split('')[0]}
            </Avatar>
          }
        />
        <CardContent>
            <Review value={review} onChange={onChangeReview} label="Your review:" />
            <br />
            <TextField
              sx={{ width: '100%' }}
              error={message.length > 100}
              helperText={helperText}
              id="review-message"
              label="Message"
              placeholder="Please provide some feedback about the movie"
              value={message}
              onChange={onMessageChange}
              minRows={2}
              multiline
            />
        </CardContent>

        <CardActions>
          <Button onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={hasErrors || isSubmitting}>{isSubmitting ? 'Submitting' : 'Submit'}</Button>
        </CardActions>
      </form>
    </Modal>
  );
};
