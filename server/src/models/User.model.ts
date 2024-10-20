import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

type User0 = InferSchemaType<typeof userSchema>
export type User = User0 & Document;


const User = model<User>("User", userSchema);

export default User;
