import { asyncHandler } from "../utils/asyncHandler.js"; // Helper function to handle errors in async code
import { ApiError } from "../utils/ApiError.js"; // Custom error class to handle API errors
import { User } from "../models/user.model.js"; // Import the User model to interact with the database
import { ApiResponse } from "../utils/ApiResponse.js"; // Standard response format to send API responses

// Function to generate access and refresh tokens for a user
const generateAccessAndRefreshToken = async (userId) => {
    try {
        // Fetch the user from the database using their ID
        const user = await User.findById(userId);

        // Generate access and refresh tokens using user-defined methods
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save the refresh token in the database
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        // Return the tokens
        return { accessToken, refreshToken };
    } catch (error) {
        // Handle errors during token generation
        throw new ApiError(501, "Something went wrong while generating tokens");
    }
};


const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log("Registration attempt:", { firstName, lastName, email });

  // Validate required fields
  if (!firstName || !lastName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  // Create user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password
  });
    
    // Step 4: Fetch the newly created user (excluding sensitive fields)
    const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // Step 5: Respond with the user details
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});

/**
 // Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.isPasswordCorrect(password))) {
    throw new ApiError(401, "Invalid email or password");
  }
 */


// Controller to log in a user
const loginUser = asyncHandler(async (req, res) => {
    // Extract login details from the request body
    const { email, password } = req.body;

    console.log("Login attempt for email:", email); // ✅ Debugging

    // Validate presence of email and password
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    // ✅ FIX: Directly find user by email (remove $or operator)
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    
    console.log("User found:", user ? "Yes" : "No"); // ✅ Debugging
    
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // Step 2: Validate the password
    console.log("Checking password..."); // ✅ Debugging
    const isPasswordValid = await user.isPasswordCorrect(password);
    console.log("Password valid:", isPasswordValid); // ✅ Debugging
    
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    // Step 3: Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    // Step 4: Fetch the logged-in user's details (excluding sensitive fields)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // Step 5: Set cookies for tokens and respond
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User logged in successfully"
            )
        );
});

// Controller to log out a user
const logOutUser = asyncHandler(async (req, res) => {
    // Remove the refresh token from the database
    await User.findByIdAndUpdate(
        req.user._id,
        { $set: { refreshToken: undefined } },
        { new: true }
    );

    // Clear cookies and respond
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .cookie("accessToken", "", options)
        .cookie("refreshToken", "", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});


// async function getCurrentUser(req) {
//   if (req.user && req.user._id) {
//     return await User.findById(req.user._id);
//   }

//   // fallback: use email from env or create a demo user
//   const demoEmail = process.env.DEMO_USER_EMAIL || "demo@local";
//   let user = await User.findOne({ email: demoEmail });
//   if (!user) {
//     user = await User.create({ email: demoEmail, name: "Demo User" });
//   }
//   return user;
// }
// Get current user profile
const getMe = asyncHandler(async (req, res) => {
  // req.user already set by verifyjwt middleware
  const user = req.user;
  
  return res.status(200).json({
    success: true,
    data: {
      firstName: user.firstName || user.name?.split(' ')[0] || '',
      lastName: user.lastName || user.name?.split(' ').slice(1).join(' ') || '',
      email: user.email,
      bio: user.bio || "",
      phone: user.phone || "",
      joinDate: user.createdAt
    }
  });
});

// Update user profile
const updateMe = asyncHandler(async (req, res) => {
  const user = req.user;
  const { firstName, lastName, email, bio, phone } = req.body;

  // Check if email already exists (if changing email)
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "Email already exists");
    }
  }

  // Update fields
  const updateData = {};
  if (firstName !== undefined) updateData.firstName = firstName;
  if (lastName !== undefined) updateData.lastName = lastName;
  if (email !== undefined) updateData.email = email;
  if (bio !== undefined) updateData.bio = bio;
  if (phone !== undefined) updateData.phone = phone;

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $set: updateData },
    { new: true }
  ).select("-password -refreshToken");

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: {
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      bio: updatedUser.bio,
      phone: updatedUser.phone,
      joinDate: updatedUser.createdAt
    }
  });
});
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Fetch fresh user with password field
  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Verify current password
  const isPasswordValid = await user.isPasswordCorrect(currentPassword);
  if (!isPasswordValid) {
    throw new ApiError(400, "Current password is incorrect");
  }

  // Update password
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Password changed successfully"
  });
});

// Delete user account
const deleteMe = asyncHandler(async (req, res) => {
  const user = req.user;
  const { password } = req.body; // Optional: confirm password before deletion

  if (password) {
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(400, "Password is incorrect");
    }
  }

  await User.findByIdAndDelete(user._id);

  res.status(200).json({
    success: true,
    message: "Account deleted successfully"
  });
});

// Export controllers
export {
    registerUser, 
    loginUser, 
    logOutUser,
    getMe,
    updateMe,
    changePassword,
    deleteMe

   
};