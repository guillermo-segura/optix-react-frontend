import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from '@mui/material';
import { Movie as MovieIcon } from '@mui/icons-material';

import { useReviewForm } from '../../hooks/useReviewForm/useReviewForm';
import { Movie } from '../../utils/types/models';
import { Modal } from '../generic/modal/Modal';
import { Review } from '../generic/review/Review';

export interface ReviewFormProps {
  movie: Movie;
}

export const ReviewForm = ({ movie }: ReviewFormProps) => {
  const {
    review,
    message,
    isSubmitting,
    onCancel,
    onSubmit,
    setReview,
    setMessage,
  } = useReviewForm();

  const hasErrors = message.length > 100 || review === 0;
  const helperText = message.length > 100  ? `${message.length}/100. Message is too long.` : `${message.length}/100`;

  const onChangeReview = (
    e: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) => setReview((newValue || 0) * 2);

  const onMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => setMessage(e.target.value);

  return (
    <Modal open={!!movie} onClose={onCancel}>
      <form onSubmit={onSubmit}>
        <CardHeader
          title={movie.title}
          subheader={movie?.companyName}
          avatar={
            <Avatar sx={{ bgcolor: 'blue' }}>
              <MovieIcon />
            </Avatar>
          }
        />
        <CardContent>
            <Review value={review} onChange={onChangeReview} label="Your review:" />
            <TextField
              sx={{ width: '100%', marginTop: '12px' }}
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
          <Button
            type="submit"
            variant="contained"
            disabled={hasErrors || isSubmitting}
          >
            {isSubmitting ? 'Submitting' : 'Submit'}
          </Button>
        </CardActions>
      </form>
    </Modal>
  );
};
