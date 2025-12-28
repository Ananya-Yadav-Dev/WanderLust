const StarRating = ({ rating, onChange, readOnly = false }) => {
  if (readOnly) {
    return (
      <p className="starability-result card-text" data-rating={rating}></p>
    );
  }

  return (
    <fieldset className="starability-slot">
      <input
        type="radio"
        id="no-rate"
        className="input-no-rate"
        name="rating"
        value="1"
        defaultChecked
        onChange={() => onChange(1)}
        aria-label="No rating."
      />
      <input
        type="radio"
        id="first-rate1"
        name="rating"
        value="1"
        onChange={() => onChange(1)}
      />
      <label htmlFor="first-rate1" title="Terrible"></label>
      <input
        type="radio"
        id="first-rate2"
        name="rating"
        value="2"
        onChange={() => onChange(2)}
      />
      <label htmlFor="first-rate2" title="Not good"></label>
      <input
        type="radio"
        id="first-rate3"
        name="rating"
        value="3"
        onChange={() => onChange(3)}
      />
      <label htmlFor="first-rate3" title="Average"></label>
      <input
        type="radio"
        id="first-rate4"
        name="rating"
        value="4"
        onChange={() => onChange(4)}
      />
      <label htmlFor="first-rate4" title="Very good"></label>
      <input
        type="radio"
        id="first-rate5"
        name="rating"
        value="5"
        onChange={() => onChange(5)}
      />
      <label htmlFor="first-rate5" title="Amazing"></label>
    </fieldset>
  );
};

const getRatingLabel = (rating) => {
  const labels = {
    1: "Terrible",
    2: "Not good",
    3: "Average",
    4: "Very good",
    5: "Amazing"
  };
  return labels[rating];
};

export default StarRating;
