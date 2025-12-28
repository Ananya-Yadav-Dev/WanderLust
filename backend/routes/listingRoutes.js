const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler.js");
const { isAuthenticated, isOwner } = require("../middleware/auth.js");
const { validateListing } = require("../middleware/validators.js");
const ListingController = require("../controllers/listingController.js");
const multer  = require('multer');
const {storage} = require("../config/cloudinary.js");
const upload = multer({ storage});

router
  .route("/")
  .get(asyncHandler(ListingController.index))
  .post(
    isAuthenticated,
    upload.single('listing[image]'),
    validateListing,
    asyncHandler(ListingController.createListing)
  );

router.get(
  "/category/:category",
  asyncHandler(ListingController.listingsByCategory)
);

router
  .route("/:id")
  .get(asyncHandler(ListingController.showListing))
  .put(
    isAuthenticated,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    asyncHandler(ListingController.updateListing)
  )
  .delete(isAuthenticated, isOwner, asyncHandler(ListingController.destroyListing));

module.exports = router;
