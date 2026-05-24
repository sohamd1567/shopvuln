"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Profile = {
  id: string;
  userId: string;
  creditCard: string;
  bankAccount: string;
  ssn: string;
  address: string;
  phone: string;
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      if (!session?.user?.id) {
        return;
      }

      const response = await fetch(`/api/profile/${session.user.id}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to load profile");
        return;
      }

      setProfile(data);
    }

    loadProfile();
  }, [session?.user?.id]);

  if (status === "loading") {
    return <p className="rounded border bg-white p-5">Loading profile...</p>;
  }

  if (status === "unauthenticated") {
    return <p className="rounded border bg-white p-5 text-red-700">Unauthorized</p>;
  }

  if (error) {
    return <p className="rounded border bg-white p-5 text-red-700">{error}</p>;
  }

  if (!profile) {
    return <p className="rounded border bg-white p-5">Loading profile...</p>;
  }

  return (
    <div className="rounded border bg-white p-6">
      <h1 className="mb-6 text-3xl font-semibold">Profile</h1>
      <dl className="grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-slate-600">Credit Card</dt>
          <dd>{profile.creditCard}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-600">Bank Account</dt>
          <dd>{profile.bankAccount}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-600">Phone</dt>
          <dd>{profile.phone}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-600">SSN</dt>
          <dd>{profile.ssn}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-slate-600">Address</dt>
          <dd>{profile.address}</dd>
        </div>
      </dl>
    </div>
  );
}
