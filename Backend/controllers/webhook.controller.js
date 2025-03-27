import { Webhook } from "svix";
import User from "../models/user.model.js";

// API Controller Function to Manage Clerk User with Database
export const clerkWebhook = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const event = whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        if (!data.email_addresses?.length) {
          return res.status(400).json({ error: "Email address is missing" });
        }

        const userData = {
          _id: data.id, // Use String for Clerk ID
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        // Check if user already exists before creating
        const existingUser = await User.findById(data.id);
        if (!existingUser) {
          await User.create(userData);
          console.log("User created in DB:", userData);
        }

        return res.status(201).json({ message: "User created successfully" });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData, { new: true });
        return res.status(200).json({ message: "User updated successfully" });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.status(200).json({ message: "User deleted successfully" });
      }

      default:
        return res.status(400).json({ error: "Unhandled event type" });
    }
  } catch (error) {
    console.error("Error in clerkWebhook:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
