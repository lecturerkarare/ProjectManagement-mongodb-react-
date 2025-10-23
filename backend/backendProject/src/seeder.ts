import mongoose from "mongoose";
import dotenv from "dotenv";
import { Roles } from "./model/roles";
import { User } from "./model/user";
import { connectDb } from "./utils/connects";

dotenv.config();

const importData = async () => {
  try {
    // await connectDb();
    await User.deleteMany();

    const sysadminRole = await Roles.findOne({ name: "SYSADMIN" });

    if (!sysadminRole) {
      throw new Error(
        "SYSADMIN role not found. Make sure default roles are seeded first."
      );
    }

    const user = {
      firstname: "SYSTEM",
      lastname: "ADMIN",
      email: "systemadmin@gmail.com",
      password: "@!SystemAdmin2030",
      role: [
        {
          _id: sysadminRole._id,
          name: sysadminRole.name,
        },
      ],
    };

    await User.create(user);

    console.log("✅ User data imported");
    process.exit();
  } catch (error) {
    process.exit(1);
  }
};

export const destroyData = async () => {
  try {
    // await connectDb();
    await User.deleteMany();
    console.log("🗑️ User data destroyed");
    process.exit();
  } catch (error) {
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
