"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile, updateProfile, deleteAccount } from "@/lib/api/auth";
import { Pencil, Trash2, MapPin } from "lucide-react";
import { toast } from "react-toastify";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  memberSince: string;
}

type Tab = "profile" | "orders" | "notifications";

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Edit states
  const [editName, setEditName] = useState(false);
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { isLoggedIn, clearAuth } = useAuthStore();
  const router = useRouter();

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
    if (!isLoggedIn) {
      router.push("/sign-in");
      return;
    }
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
      if (editEmail) payload.email = emailValue;
      if (editPassword && passwordValue) payload.password = passwordValue;

      const updated = await updateProfile(payload);
      setUser(updated);
      setFirstNameValue(updated.firstName);
      setLastNameValue(updated.lastName);
      setEmailValue(updated.email);
      setEditName(false);
      setEditEmail(false);
      setEditPassword(false);
      setPasswordValue("");
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );
    if (!confirmed) return;

    try {
      await deleteAccount();
      clearAuth();
      toast.success("Account deleted successfully.");
      router.push("/");
    } catch {
      toast.error("Failed to delete account. Please try again.");
    }
  };

  const tabClass = (tab: Tab) =>
    `pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
      activeTab === tab
        ? "border-charcoal text-charcoal"
        : "border-transparent text-secondary hover:text-charcoal"
    }`;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <p className="text-secondary text-sm">Loading profile...</p>
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
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-8 border-b border-border mb-8">
          <button
            className={tabClass("profile")}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={tabClass("orders")}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={tabClass("notifications")}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && user && (
          <div className="flex flex-col gap-8">
            {/* Header row */}
            <div className="flex items-start flex-col md:flex-row md:justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-charcoal text-ivory flex items-center justify-center text-lg font-semibold uppercase">
                  {user.firstName[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    {editName ? (
                      <div className="flex gap-2">
                        <input
                          value={firstNameValue}
                          onChange={(e) => setFirstNameValue(e.target.value)}
                          className="border border-border rounded px-2 py-1 text-sm text-charcoal outline-none"
                        />
                        <input
                          value={lastNameValue}
                          onChange={(e) => setLastNameValue(e.target.value)}
                          className="border border-border rounded px-2 py-1 text-sm text-charcoal outline-none"
                        />
                      </div>
                    ) : (
                      <h2 className="text-xl font-semibold text-charcoal capitalize">
                        {user.firstName} {user.lastName}
                      </h2>
                    )}
                    <button onClick={() => setEditName((prev) => !prev)}>
                      <Pencil className="w-4 h-4 cursor-pointer" />
                    </button>
                  </div>
                  <p className="text-sm text-secondary mt-0.5">
                    Saint Valor member since {user.memberSince}
                  </p>
                </div>
              </div>

              {/* Delete Account */}
              <button
                onClick={handleDeleteAccount}
                className="flex items-center gap-1.5 text-sm text-red-500 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left — Email & Password */}
              <div className="flex flex-col gap-5">
                {/* Email */}
                <div>
                  <label className="text-xs text-secondary uppercase tracking-wide mb-1.5 block">
                    Email Address
                  </label>
                  <div className="flex items-center border border-border rounded-md bg-white px-3 py-2 gap-2">
                    <input
                      type="email"
                      value={emailValue}
                      disabled={!editEmail}
                      onChange={(e) => setEmailValue(e.target.value)}
                      className="flex-1 text-sm text-charcoal bg-transparent outline-none disabled:text-secondary"
                    />
                    <button
                      onClick={() => setEditEmail((prev) => !prev)}
                      className="text-secondary hover:text-charcoal transition"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-xs text-secondary uppercase tracking-wide mb-1.5 block">
                    Password
                  </label>
                  <div className="flex items-center border border-border rounded-md bg-white px-3 py-2 gap-2">
                    <input
                      type="password"
                      value={editPassword ? passwordValue : "••••••••••••••"}
                      disabled={!editPassword}
                      onChange={(e) => setPasswordValue(e.target.value)}
                      placeholder={editPassword ? "Enter new password" : ""}
                      className="flex-1 text-sm text-charcoal bg-transparent outline-none disabled:text-secondary"
                    />
                    <button
                      onClick={() => setEditPassword((prev) => !prev)}
                      className="text-secondary hover:text-charcoal transition"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSaveChanges}
                  disabled={
                    isSaving || (!editEmail && !editPassword && !editName)
                  }
                  className="w-fit px-6 py-2.5 bg-gold text-white text-sm font-medium rounded-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>

              {/* Right — Billing Address */}
              <div>
                <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide mb-4">
                  Billing Address
                </h3>
                <div className="border border-border rounded-md bg-white p-8 flex flex-col items-center justify-center text-center gap-3 min-h-45">
                  <MapPin className="w-6 h-6 text-secondary" />
                  <div>
                    <p className="text-sm font-medium text-charcoal">
                      No Addresses
                    </p>
                    <p className="text-xs text-secondary mt-0.5">
                      You&apos;ve not saved any addresses
                    </p>
                  </div>
                  <button className="mt-1 px-5 py-2 border border-gold text-gold text-sm rounded-md hover:bg-gold hover:text-white transition">
                    Add Address
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <p className="text-charcoal font-medium">No Orders Yet</p>
            <p className="text-sm text-secondary">
              Your order history will appear here.
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-2 px-6 py-2.5 bg-gold text-white text-sm font-medium rounded-md hover:opacity-90 transition"
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <p className="text-charcoal font-medium">No Notifications</p>
            <p className="text-sm text-secondary">You&apos;re all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
