import { asynchHandlers} from "../utils/asyncHandlers.js"
import { ApiError } from "../utils/apierror.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asynchHandlers (async (req, res) => {

    




//   get user details from frontend(postman ke througth data le sakte hai(userdetail from userSchema))
// validation - not empty 
// check if user already exists: username, email
// check for image, check for avatar
// upload them to cloudinary, avatar
// create user object, create entry in db 
// remove password and refresh token field from response 
// check for user creation 
// return response 


const {fullName, email, userName, password} = req.body 
console.log("email:", email)
if(
    [
        fullName, email, password, userName
    ].some((field) => 
    field?.trim() === "")
) {
    throw new ApiError(
        400, "all dield required")
}

const existedUser = User.findOne({
    $or: [{userName}, {email}]
})

if(existedUser){
    throw new ApiError(
        409,"User with email or username already exists")
}

const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
    throw new ApiError(
        400, "Avtar image is required")
}

const avatar = uploadOnCloudinary(avatarLocalPath);
const coverImage = uploadOnCloudinary(coverImageLocalPath);

if(!avatar){
    throw new ApiError(
        400, "Avatar image is required")
}

const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    userName: userName.toLowerCase()
})

const createUser = await User.findById(
    User._id.select("-passsword -refreshToken"))

    if (!createUser){
        throw new ApiError(500, "something went wrong while registrin the user")
    }

    return res(201).json(
        new ApiResponse(200, createUser, "registered user successfully")
    )

})

export {registerUser}