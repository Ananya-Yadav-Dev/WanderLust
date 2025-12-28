import ListingForm from '../components/listings/ListingForm';
import { useCreateListing } from '../hooks/useListings';

const NewListing = () => {
  const createListing = useCreateListing();

  const handleSubmit = (formData) => {
    createListing.mutate(formData);
  };

  return (
    <div className="row mt-3">
      <div className="col-8 offset-2">
        <h3>List Your Property</h3>
        <ListingForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default NewListing;
