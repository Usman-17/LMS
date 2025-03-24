import { Webhook } from "svix";
import User from "../models/user.model.js";

// API Controller Function to Manage Clerk User with Database
export const clerkWebhook = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      // User Created Case
      case "user.created": {
        if (!data.email_addresses?.length) {
          return res.status(400).json({ error: "Email address is missing" });
        }

        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        await User.create(userData);
        return res.status(201).json({ message: "User created successfully" });
      }

      // User Updated Case
      case "user.updated": {
        if (!data.email_address?.length) {
          return res.status(400).json({ error: "Email address is missing" });
        }

        const userData = {
          email: data.email_address[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        return res.status(200).json({ message: "User updated successfully" });
      }

      //   User Deleted Case
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.status(200).json({ message: "User deleted successfully" });
      }

      default:
        return res.status(400).json({ error: "Unhandled event type" });
    }
  } catch (error) {
    console.error("Error in clerkWebhook:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
