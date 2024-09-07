import userModel from '../models/userModel.js'; // Adjust the path as necessary
import catchAsync from '../utils/catchAsync.js'; // For handling async errors
import AppError from '../utils/appError.js'; // For custom error handling

// Update user profile
export const updateProfile = catchAsync(async (req, res, next) => {
  const { name, email, phone, address, profilePic, role } = req.body;
  const userId = req.user.id; // Assuming you're using authentication middleware to attach the user ID

  // Validate input
  if (!name || !email) {
    return next(new AppError('Name and email are required fields.', 400));
  }

  // Find the user and update
  const user = await userModel.findByIdAndUpdate(
    userId,
    { name, email, phone, address, profilePic, role },
    { new: true, runValidators: true } // Return the updated user and run validators
  );

  // Handle case where user is not found
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Send response
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
