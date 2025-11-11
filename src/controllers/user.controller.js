import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from "../utils/ApiError.js";
import {User} from '../models/user.models.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js';
const registerUser=asyncHandler(async (req ,res)=>{

     // get user data from frontend
  const { fullName, email, username, password } = req.body;
  

  // validation
  if (
    [fullName, email, username, password].some(field => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }


 // check if user already exists: username, email
 const existedUser= await User.findOne({

    $or:[{ username },{ email }]
  })

  if(existedUser){
    throw new ApiError(409,"User with this username or email already exists")
  }


   // check for images, check for avatar
   const avatarLocalpath=req.files?.avatar?.[0]?.path;
    console.log("Uploading Avatar From:", avatarLocalpath);

    if(!avatarLocalpath){
      throw new ApiError(400,"Avater is required")
    }

    // upload them to cloudinary

    const avatar=await uploadOnCloudinary(avatarLocalpath);
     console.log("Avatar: ", avatar);


     if (!avatar) {
    throw new ApiError(400, "Avatar is not uploaded to cloudinary");
  }

   // create user object - create entry in db
   const user=await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
   })

     // remove password and refresh token from response

     const createdUser= await User.findById(user._id).select("-password -refreshToken");

     if(!createdUser){
      throw ApiError(500,"Something is went worng please try again ")
     }


    return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
})



export {registerUser};