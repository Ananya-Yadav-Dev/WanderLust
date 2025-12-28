import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  return (
    <Link to={`/listings/${listing._id}`} className="listing-link">
      <div className="card col listing-card">
        <img
          src={listing.image.url}
          className="card-img-top"
          alt="listing_image"
          style={{ height: '20rem' }}
        />
        <div className="card-img-overlay"></div>
        <div className="card-body">
          <p className="card-text">
            <b>{listing.title} <br /></b>
            &#8377; {listing.price.toLocaleString("en-IN")} /night
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
