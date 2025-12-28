import { useState } from 'react';
import { useCreateReview } from '../../hooks/useReviews';
import StarRating from './StarRating';

const ReviewForm = ({ listingId }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const createReview = useCreateReview(listingId);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      review: {
        rating,
        comment
      }
    };

    createReview.mutate(reviewData, {
      onSuccess: () => {
        setRating(1);
        setComment('');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="needs-validation">
      <div className="mt-3">
        <label htmlFor="rating" className="form-label">Rating:</label>
        <StarRating rating={rating} onChange={setRating} />
      </div>
      <div className="mb-3">
        <label htmlFor="comment" className="form-label">Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="5"
          cols="30"
          className="form-control"
          required
        ></textarea>
        <div className="invalid-feedback">Please add some comments for review</div>
      </div>
      <button
        type="submit"
        className="btn btn-outline-dark"
        disabled={createReview.isPending || !comment.trim()}
      >
        {createReview.isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default ReviewForm;
