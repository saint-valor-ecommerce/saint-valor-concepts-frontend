"use client";

import { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "@/lib/api/auth";
import { toast } from "react-toastify";
import ProfileHeader from "@/components/profile/ProfileHeader";
import AccountDetails from "@/components/profile/UserAccountDetails";
import BillingAddress from "@/components/profile/billingAddress/BillingAddress";
import { formatDate } from "@/lib/utils";
import { Address } from "@/types/address";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  memberSince: string;
  address: Address | null;
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editName, setEditName] = useState(false);
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const data = await getUserProfile();
      setUser(data);
      setEmailValue(data.email);
      setFirstNameValue(data.firstName);
      setLastNameValue(data.lastName);
    } catch {
      setError("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      const payload: {
        email?: string;
        password?: string;
        firstName?: string;
        lastName?: string;
      } = {};
      if (editName) {
        payload.firstName = firstNameValue;
        payload.lastName = lastNameValue;
      }

      const updated = await updateProfile(payload);
      setUser(updated);
      setFirstNameValue(updated.firstName);
      setLastNameValue(updated.lastName);
      setEditName(false);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAddress = async (address: Address) => {
    try {
      const updated = await updateProfile({ address });
      setUser(updated);
      toast.success("Address saved successfully!");
    } catch {
      toast.error("Failed to save address. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-secondary">Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className=" mx-auto px-6 py-8">
      {user && (
        <div className="flex flex-col gap-8">
          <ProfileHeader
            firstName={user.firstName}
            lastName={user.lastName}
            memberSince={formatDate(user.memberSince)}
            editName={editName}
            firstNameValue={firstNameValue}
            lastNameValue={lastNameValue}
            onToggleEditName={() => setEditName((prev) => !prev)}
            onFirstNameChange={setFirstNameValue}
            onLastNameChange={setLastNameValue}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AccountDetails
              emailValue={emailValue}
              isSaving={isSaving}
              hasChanges={editName}
              onSave={handleSaveChanges}
            />
            <BillingAddress
              address={user.address ?? null}
              onSave={handleSaveAddress}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
