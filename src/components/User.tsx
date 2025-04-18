"use client";

import { api } from "@/lib/api";

export default function User() {
  const { data: user, isLoading } = api.users.getById.useQuery({ id: 1 });
  return (
    <div>
      <h1>User</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
}
