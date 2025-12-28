const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncHandler = require("../utils/asyncHandler.js");
const { isAuthenticated, isReviewAuthor } = require("../middleware/auth.js");
const { validateReview } = require("../middleware/validators.js");
const ReviewController = require("../controllers/reviewController.js");

router.post(
  "/",
  isAuthenticated,
  validateReview,
  asyncHandler(ReviewController.createReview)
);

router.delete(
  "/:reviewId",
  isAuthenticated,
  isReviewAuthor,
  asyncHandler(ReviewController.destroyReview)
);

module.exports = router;
