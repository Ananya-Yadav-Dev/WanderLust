import { useParams } from 'react-router-dom';
import { useListingsByCategory } from '../hooks/useListings';
import ListingCard from '../components/listings/ListingCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CategoryPage = () => {
  const { category } = useParams();
  const { data: listings, isLoading, error } = useListingsByCategory(category);

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
      <h3 style={{ visibility: 'hidden' }}>Space</h3>
      <h2>{category}</h2>
      <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1">
        {listings && listings.length > 0 ? (
          listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))
        ) : (
          <p className="text-center">No {category} listings available</p>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
