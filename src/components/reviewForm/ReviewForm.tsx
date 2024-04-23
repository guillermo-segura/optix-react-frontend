export interface ReviewFormProps {
  selectedMovie: {
    title?: string;
  },
}

export const ReviewForm = ({ selectedMovie }: ReviewFormProps) => {
  return (
    <div>
      <p>{selectedMovie.title ? "You have selected " +  selectedMovie.title : "No movie title"}</p>
      <p>Please leave a review below</p>
      <form onSubmit={() => {}}>
        <label>
        Review:
        <input type="text"/>
      </label>
      </form>
    </div>
  );
};
