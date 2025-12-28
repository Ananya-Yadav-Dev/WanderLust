import { useAuth } from '../../hooks/useAuth';
import { useDeleteReview } from '../../hooks/useReviews';
import StarRating from './StarRating';

const ReviewCard = ({ review, listingId }) => {
  const { user } = useAuth();
  const deleteReview = useDeleteReview(listingId);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReview.mutate(review._id);
    }
  };

  const isAuthor = user && review.author && user._id === review.author._id;

  return (
    <div className="card col-5 mb-3 ms-3">
      <div className="card-body mt-2" style={{ overflowX: 'auto' }}>
        <h5 className="card-title">{review.author?.username || 'Anonymous'}</h5>
        <p className="card-text text-muted">{review.comment}</p>
        <StarRating rating={review.rating} readOnly={true} />
        {isAuthor && (
          <button
            className="btn btn-dark btn-sm review-btn"
            onClick={handleDelete}
            disabled={deleteReview.isPending}
          >
            {deleteReview.isPending ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
