const Listing = require("../models/Listing.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.json({
    success: true,
    data: allListings
  });
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    return res.status(404).json({
      success: false,
      error: "Listing not found"
    });
  }

  res.json({
    success: true,
    data: listing
  });
};

module.exports.listingsByCategory = async (req, res, next) => {
  try {
    const allowedCategories = ["Urban", "Nature", "Beach", "Luxury", "Other"];
    const { category } = req.params;

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        error: "Invalid category"
      });
    }

    const listings = await Listing.find({ category });
    res.json({
      success: true,
      data: listings
    });
  } catch (err) {
    next(err);
  }
};

module.exports.createListing = async (req, res, next) => {
  try {
    const url = req.file.path;
    const filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();

    res.status(201).json({
      success: true,
      data: newListing,
      message: "New Listing Created!"
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

  if (typeof req.file !== "undefined") {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  res.json({
    success: true,
    data: listing,
    message: "Listing Updated!"
  });
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);

  res.json({
    success: true,
    data: deletedListing,
    message: "Listing Deleted!"
  });
};
