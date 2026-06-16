import { clerkClient } from "@clerk/express";
import User from "./user.model";

export async function getOrCreateUserByClerkId(clerkUserId: string) {
  return User.findOneAndUpdate(
    { clerkUserId },
    { $setOnInsert: { clerkUserId } },
    { upsert: true, new: true },
  );
}

export async function upsertCurrentUser(clerkUserId: string) {
  let clerkUser:
    | Awaited<ReturnType<typeof clerkClient.users.getUser>>
    | null = null;

  try {
    clerkUser = await clerkClient.users.getUser(clerkUserId);
  } catch (error) {
    // If Clerk is temporarily unavailable we still want requests to work.
    console.error("Failed to fetch user from Clerk:", error);
  }

  const primaryEmail =
    clerkUser?.emailAddresses?.find((e) => e.id === clerkUser?.primaryEmailAddressId)
      ?.emailAddress ??
    clerkUser?.emailAddresses?.[0]?.emailAddress ??
    undefined;

  const update = {
    clerkUserId,
    email: primaryEmail,
    firstName: clerkUser?.firstName ?? undefined,
    lastName: clerkUser?.lastName ?? undefined,
    imageUrl: clerkUser?.imageUrl ?? undefined,
  };

  const user = await User.findOneAndUpdate(
    { clerkUserId },
    { $set: update },
    { upsert: true, new: true },
  );

  return user;
}

