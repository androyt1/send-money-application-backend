const expressAsyncHandler = require('express-async-handler');
const fs = require('fs');
// const sgMail = require('@sendgrid/mail');
// const crypto = require('crypto');
// const { cloudinaryUploadImage } = require('../../utils/cloudinary');

const User = require('../../model/User/User');
const generateToken = require('../../utils/generateToken');

// sgMail.setApiKey(
//   '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'
// );
//=======================================
//Register Users
//=======================================
const registerUserContrl = expressAsyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) throw new Error('User already exist');
  const user = await User.create(req.body);
  if (!user) throw new Error('User Registering Error. Try again later');
  res.status(200);
  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
    position: user.postion,
  });
});

//===============================
//LOGIN_USER_CONTROLLER
//===============================
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;
  const user = await User.findOne({ phoneNumber: phoneNumber });
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user && user._id,
      username: user && user.fullName,
      email: user && user.email,
      token: generateToken(user && user._id),
      position: user && user.position,
      profilePhoto: user.profilePhoto,
      role: user && user.role,
      ministry: user && user.ministry,
    });
  } else {
    res.status(401);
    throw new Error('invalid credentials');
  }
});

//==============================
//PROFILE
//============================

// //Populate following and followers
// const userProfileController = expressAsyncHandler(async (req, res, next) => {
//   // if (!req.user) throw new Error('Please authenticate first');
//   const myProfile = await User.findById(req.user._id)
//     .populate('OfflineTithesPayment')
//     .populate('onlineTithesSubscription')
//     .populate('following')
//     .populate('followers')
//     .populate('prayerRequests')
//     .populate('posts')
//     .populate('appointments')
//     .populate('youthMinistryBeneficiaries')
//     .exec();
//   res.send(myProfile);
// });

// //==============================
// //FETCH ALL USERS WITH SEARCH QUERY
// //============================

// const fetchAllUsersController = expressAsyncHandler(async (req, res, next) => {
//   const users = await User.find({})
//     .populate('OfflineTithesPayment')
//     .populate('onlineTithesSubscription')
//     .exec();
//   res.json(users);
// });

// // const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
// //   const users = await User.find({
// //     firstName: {
// //       $regex: new RegExp(req.query.name),
// //     }, //Partial Search
// //   }).sort('-createdAt');
// //   if (users || users.length === []) {
// //     res.json(users);
// //   } else {
// //     throw new Error('Error occured');
// //   }
// // });

// //Fetch inactive members
// const fetchInActiveUsersController = expressAsyncHandler(async (req, res) => {
//   const users = await User.find({
//     isNotActive: 'false',
//   }).sort('-createdAt');
//   if (users || users.length === []) {
//     res.json(users);
//   } else {
//     throw new Error('Error occured');
//   }
// });

// //User Details
// const fetchUserDetailsController = expressAsyncHandler(
//   async (req, res, next) => {
//     const user = await User.findById(req.params.id);

//     res.json(user);
//   }
// );

// //following
// const addUserFollowingController = expressAsyncHandler(
//   async (req, res, next) => {
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $push: { following: req.user._id },
//       },
//       { runValidators: true, new: true }
//     ).populate('following');
//     res.status(200).json(user);
//   }
// );

// //following
// const updateUserRoleController = expressAsyncHandler(async (req, res, next) => {
//   const user = await User.findByIdAndUpdate(
//     req.body.userId,
//     {
//       $set: { role: req.body.role },
//     },
//     { runValidators: true, new: true }
//   );
//   res.status(200).json(user);
// });

// //Subscribe members to subscription

// //Youth Dues
// const subscribeYouthToDuesPlanCtrl = expressAsyncHandler(
//   async (req, res, next) => {
//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       {
//         $set: { isSubscribedToYouthMinistryDuesPlan: true },
//       },
//       { runValidators: true, new: true }
//     );
//     res.status(200).json(user);
//   }
// );

// //Mens ministry Dues
// const subscribeMensMinistryToDuesPlanCtrl = expressAsyncHandler(
//   async (req, res, next) => {
//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       {
//         $set: { isSubscribedToMensMinistryDuesPlan: true },
//       },
//       { runValidators: true, new: true }
//     );
//     res.status(200).json(user);
//   }
// );

// //Update user today Attendance

// const updateUserTodayAttendanceController = expressAsyncHandler(
//   async (req, res, next) => {
//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       {
//         $set: { donationType: req.body.donationType },
//       },
//       { runValidators: true, new: true }
//     );
//     res.status(200).json(user);
//   }
// );

// // //following
// // const uploadProfilePhotoController = expressAsyncHandler(
// //   async (req, res, next) => {
// //     console.log(req.params);
// //     //Get the location of the file on our local server
// //     const localFilePath = `public/img/users/${req.file.filename}`;
// //     //Get the files after multer has verify it and pass it to cloudinary
// //     const uploader = async fileToUpload => {
// //       return await cloudinaryUploadImage(fileToUpload, 'name-of-my-folder');
// //     };
// //     //send request to cloudinary
// //     const newPath = await uploader(localFilePath, {
// //       with: 350,
// //       crop: 'scale',
// //     });
// //     fs.unlinkSync(localFilePath); //remove from diskstorage
// //     //create post

// //     const user = await User.findByIdAndUpdate(
// //       req.body.id,
// //       {
// //         $set: { profilePhoto: newPath.url },
// //       },
// //       { runValidators: true, new: true }
// //     );
// //     res.status(200).json(user);
// //   }
// // );

// // var camelSentence = function camelSentence(str) {
// //   return (' ' + str)
// //     .toLowerCase()
// //     .replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
// //       return chr.toUpperCase();
// //     });
// // };

// //Update user profile
// const updateUserController = expressAsyncHandler(async (req, res) => {
//   const user = await User.findById(req.body.id);
//   console.log('user', user);
//   console.log('Body', req.body);
//   if (user) {
//     user.fullName = req.body.values.fullName || user.fullName;
//     user.email = req.body.values.email || user.email;
//     user.city = req.body.values.city || user.city;
//     user.country = req.body.values.country || user.country;
//     user.phoneNumber = req.body.values.phoneNumber || user.phoneNumber;
//     if (req.body.values.password) {
//       user.password = req.body.values.password;
//     }
//     const updatedUser = await user.save();
//     res.json(updatedUser);
//   } else {
//     res.status(401);
//     throw new Error('User not found');
//   }
// });

// //sendgridKey:  SG.c_Of3IInTMO4ffUpY67S4A.vmRV6YJ0wbwm - Apbde6bLTwbKl1YUDlM9MCTw46q290;

// // using Twilio SendGrid's v3 Node.js Library
// // https://github.com/sendgrid/sendgrid-nodejs

// // using Twilio SendGrid's v3 Node.js Library
// // https://github.com/sendgrid/sendgrid-nodejs

// const forgetPasswordController = expressAsyncHandler(async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   console.log(req.body);
//   if (!user) {
//     throw new Error('No user found');
//   }

//   //Generate token:  so we will create an instance method

//   const resetToken = user.createPasswordResetToken();

//   await user.save({ validateBeforeSave: false });
//   //One problem is that when saving document we made some fields required so we need to by pass the validation

//   const resetURL = `<a href='http://localhost:3000/resetpassword/${resetToken}'>CLICK HERE TO RESET PASSWORD</a>`;
//   const message = `Forget your password? make request to:  ${resetURL}.\nIf you did not forget your password please ignore this email`;
//   const msg = {
//     to: req.body.email, // Change to your recipient
//     from: 'twentekghana@gmail.com', // Change to your verified sender
//     subject: 'Password Reset Request',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: message,
//   };
//   sgMail
//     .send(msg)
//     .then(() => {
//       res.send(message);
//     })
//     .catch(error => {
//       res.send(error);
//     });
// });

// //Reset Password

// const resetPasswordController = expressAsyncHandler(async (req, res) => {
//   console.log('TOKEN');
//   //Get the user base on the token
//   //Decrypt the token
//   const hashedToken = crypto
//     .createHash('sha256')
//     .update('755a5aef681bb0ea3eb9143c3ee6ed14b0e186f8f7e9785a180ff698e5c487ca')
//     .digest('hex');
//   console.log(hashedToken);
//   const user = await User.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: Date.now() },
//   });
//   // if the token has not expired and there is a user, set the new password

//   console.log('user', user);
//   if (!user) {
//     throw new Error('Token Expired');
//   }
//   // update changedAt property of the user
//   user.password = req.body.password;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();
//   res.send(user);
// });

// const usersAbsentController = expressAsyncHandler(async (req, res) => {
//   res.send('Absent');
// });
module.exports = {
  loginUserCtrl,
  registerUserContrl,
};
