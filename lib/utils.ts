import {type ClassValue, clsx} from "clsx";
import mongoose, {mongo} from "mongoose";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const connectToDatabase = async () => {
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) return;

    const {connection} = await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        dbName: "nextjs-auth",
      }
    );
    console.log(`Connected To Database: ${connection.host}`);
  } catch (error) {
    throw new Error("Error To Connect Database");
  }
};
