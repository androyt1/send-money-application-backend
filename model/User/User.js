const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

userSchema.virtual('prayerRequests', {
  ref: 'PrayerRequest',
  foreignField: 'user',
  localField: '_id',
});
//Method accessible on all instance of users
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//hash password
userSchema.pre('save', async function (next) {
  //We don't want the hasing password to run when a user update other field apart from password
  if (!this.isModified('password')) {
    next();
  }
  this.passwordChangedAt = Date.now() - 1000;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//==============================
// PASSWORD RESET
//==============================
//Instant methods . This is found all instances of created user
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  //We have to return because we will send this with email.
  //We will comepare this token to the crypto.createHash if this was used to create that
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
