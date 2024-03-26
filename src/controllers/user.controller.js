import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  const body = req.body;
  const { fullName, email, username, password } = body;
  // validation - not empty
  if (!fullName || !email || !username || !password) {
    throw new apiError(400, "all fileds are required");
  }

  // check if user already exists : username, email

  const existedUser = User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new apiError(404, "user with email or username is already exists");
  }
  // check for images, check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar is required");
  }
  // upload them to cloudinary, avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new apiError(400, "Avatar is required");
  }
  // create user object - create entry in db
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  // remove password and refresh token field from res
  createdUser = await User.findById(user._id).select("-password -refreshToken");
  // check for user creation res
  if (!createdUser) {
    throw new apiError(500, "something went wrong, User registration failed");
  }
  // return res
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Register successfully"));
});

export { registerUser };
