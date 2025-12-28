import { useParams } from 'react-router-dom';
import ListingForm from '../components/listings/ListingForm';
import { useListingDetails, useUpdateListing } from '../hooks/useListings';
import LoadingSpinner from '../components/common/LoadingSpinner';

const EditListing = () => {
  const { id } = useParams();
  const { data: listing, isLoading } = useListingDetails(id);
  const updateListing = useUpdateListing();

  if (isLoading) return <LoadingSpinner />;

  if (!listing) {
    return <div className="alert alert-danger">Listing not found</div>;
  }

  const handleSubmit = (formData) => {
    updateListing.mutate({ id, formData });
  };

  return (
    <div className="row mt-3">
      <div className="col-8 offset-2">
        <h3>Edit Your Listing</h3>
        <ListingForm defaultValues={listing} onSubmit={handleSubmit} isEdit={true} />
      </div>
    </div>
  );
};

export default EditListing;
