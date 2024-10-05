// src/models/user.js
import mongoose, { Document, Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
}, {
  timestamps: true
});

// Configure passport-local-mongoose
UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
