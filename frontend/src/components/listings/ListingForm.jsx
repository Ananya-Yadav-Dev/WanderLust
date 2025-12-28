import { useForm } from 'react-hook-form';
import { CATEGORIES } from '../../utils/constants';
import { useState } from 'react';

const ListingForm = ({ defaultValues, onSubmit, isEdit = false }) => {
  const [imagePreview, setImagePreview] = useState(defaultValues?.image?.url || null);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues || {},
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(`listing[${key}]`, data[key]);
    });

    if (imageFile) {
      formData.append('listing[image]', imageFile);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="needs-validation">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          {...register('title', { required: 'Title is required' })}
          type="text"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          placeholder="Add a title"
        />
        {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          placeholder="Enter description"
        ></textarea>
        {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          {isEdit ? 'Upload New Image (optional)' : 'Upload Image'}
        </label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleImageChange}
          required={!isEdit}
        />
        {imagePreview && (
          <div className="mt-2">
            <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', borderRadius: '8px' }} />
          </div>
        )}
      </div>

      <div className="row">
        <div className="mb-3 col-md-4">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            {...register('price', {
              required: 'Price is required',
              min: { value: 0, message: 'Price must be positive' },
            })}
            type="number"
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            placeholder="1200"
          />
          {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
        </div>

        <div className="mb-3 col-md-4">
          <label htmlFor="country" className="form-label">Country</label>
          <input
            {...register('country', { required: 'Country is required' })}
            type="text"
            className={`form-control ${errors.country ? 'is-invalid' : ''}`}
            placeholder="India"
          />
          {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
        </div>

        <div className="col-md-4">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            {...register('category', { required: 'Category is required' })}
            className={`form-select form-control ${errors.category ? 'is-invalid' : ''}`}
          >
            <option value="">Choose...</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="location" className="form-label">Location</label>
        <input
          {...register('location', { required: 'Location is required' })}
          type="text"
          className={`form-control ${errors.location ? 'is-invalid' : ''}`}
          placeholder="Matheran, Maharashtra"
        />
        {errors.location && <div className="invalid-feedback">{errors.location.message}</div>}
      </div>

      <button type="submit" className="btn btn-dark add-btn mt-3" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : isEdit ? 'Update' : 'Add'}
      </button>
      <br /><br />
    </form>
  );
};

export default ListingForm;
