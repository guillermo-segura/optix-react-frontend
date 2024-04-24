import {
  Avatar,
  CardContent,
  CardHeader,
  TextField,
  CardActions,
  Button,
  Typography,
} from '@mui/material';

import { Review } from '../generic/review/Review';
import { useReviewForm } from '../../hooks/useReviewForm/useReviewForm';
import { Modal } from '../generic/modal/Modal';

export const ReviewForm = () => {
  const {
    onCancel,
    onSubmit,
    review,
    message,
    setReview,
    setMessage,
    selectedMovie,
  } = useReviewForm();

  const onChangeReview = (
    e: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) => setReview((newValue || 0) * 2);

  const hasErrors = message.length > 100 || review === 0;

  return selectedMovie && (
    <Modal open={!!selectedMovie} onClose={onCancel}>
      <form onSubmit={onSubmit}>
        <CardHeader
          title={selectedMovie.title}
          subheader={selectedMovie?.companyName}
          avatar={
            <Avatar aria-label="recipe">
              {selectedMovie.title?.split('')[0]}
            </Avatar>
          }
        />
        <CardContent>
            <Typography variant="body1" component="p">
              Please provide some feedback about the movie
            </Typography>
            <Review values={[review]} onChange={onChangeReview}/>
            <br />
            <TextField
              sx={{ width: '100%' }}
              error={message.length > 100}
              helperText={`${message.length}/100`}
              id="review-message"
              label="Message"
              placeholder="Give us more details about your review"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              minRows={2}
              multiline
            />
        </CardContent>

        <CardActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={hasErrors}>Submit</Button>
        </CardActions>
      </form>
    </Modal>
  );
};
