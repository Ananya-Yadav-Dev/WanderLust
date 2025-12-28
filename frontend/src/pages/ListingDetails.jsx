import { useParams, useNavigate, Link } from 'react-router-dom';
import { useListingDetails, useDeleteListing } from '../hooks/useListings';
import { useAuth } from '../hooks/useAuth';
import ReviewCard from '../components/reviews/ReviewCard';
import ReviewForm from '../components/reviews/ReviewForm';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: listing, isLoading, error } = useListingDetails(id);
  const deleteListing = useDeleteListing();

  if (isLoading) return <LoadingSpinner />;

  if (error || !listing) {
    return (
      <div className="alert alert-danger">
        Listing not found
      </div>
    );
  }

  const isOwner = user && listing.owner && user._id === listing.owner._id;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      deleteListing.mutate(id);
    }
  };

  return (
    <div className="row">
      <h3 style={{ visibility: 'hidden' }}>Space</h3>
      <div className="col-8 offset-3">
        <h3>{listing.title}</h3>
      </div>
      <div className="card col-6 offset-3 show-card listing-card">
        <img src={listing.image.url} className="card-img-top show-img" alt="..." />
        <p className="text-muted">
          <i>Owned by </i>
          <span style={{ color: '#64d15a', fontWeight: 550 }}>
            {listing.owner?.username || 'Unknown'}
          </span>
        </p>
        <div className="card-body">
          <p className="card-text">{listing.description}</p>
          <p>&#8377; {listing.price.toLocaleString("en-IN")}</p>
          <p>{listing.location}</p>
          <p>{listing.country}</p>
        </div>
      </div>
      <br />
      {isOwner && (
        <div className="btns row">
          <Link
            to={`/listings/${listing._id}/edit`}
            className="btn btn-dark col-1 offset-3 mb-2"
          >
            Edit
          </Link>
          <button
            className="btn btn-dark delete-btn col-1 mb-2"
            onClick={handleDelete}
            disabled={deleteListing.isPending}
          >
            {deleteListing.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      )}
      <div className="col-8 offset-3 mb-3">
        <hr />
        {user ? (
          <>
            <h4>Leave a Review:</h4>
            <ReviewForm listingId={id} />
          </>
        ) : (
          <p className="text-muted">
            <Link to="/login">Login</Link> to leave a review
          </p>
        )}
        <hr />
        <h4 style={{ color: '#ffc107' }}><b>Reviews</b></h4>
        <div className="row mt-3">
          {listing.reviews && listing.reviews.length > 0 ? (
            listing.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} listingId={id} />
            ))
          ) : (
            <h6 className="text-muted">No reviews posted</h6>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
