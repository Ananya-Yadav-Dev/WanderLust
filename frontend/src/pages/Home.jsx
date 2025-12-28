import { useListings } from '../hooks/useListings';
import ListingCard from '../components/listings/ListingCard';
import Carousel from '../components/listings/Carousel';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home = () => {
  const { data: listings, isLoading, error } = useListings();

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="alert alert-danger">
        Failed to load listings. Please try again later.
      </div>
    );
  }

  return (
    <>
      <h3 style={{ visibility: 'hidden' }}>Hello</h3>
      <Carousel />
      <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1">
        {listings && listings.length > 0 ? (
          listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))
        ) : (
          <p className="text-center">No listings available</p>
        )}
      </div>
    </>
  );
};

export default Home;
