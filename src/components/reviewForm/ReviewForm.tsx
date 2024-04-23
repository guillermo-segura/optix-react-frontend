import { Avatar, Card, CardContent, CardHeader, TextField, CardActions, Button } from '@mui/material';

import { Review } from '../generic/review/Review';
import { useReviewForm } from '../../hooks/useReviewForm/useReviewForm';

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

  return selectedMovie && (
    <form onSubmit={onSubmit}>
      <Card sx={{
        marginTop: '16px',
      }}>
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
            <p>Please provide some feedback about the movie</p>
            <Review values={[review]} onChange={(e, newValue) => setReview(newValue * 2)}/>
            <br />
            <TextField
              sx={{ width: '100%' }}
              id="outlined-textarea"
              label="Multiline Placeholder"
              placeholder="Placeholder"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              minRows={4}
              multiline
            />
        </CardContent>

        <CardActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained">Submit</Button>
        </CardActions>
      </Card>
    </form>
  );
};
