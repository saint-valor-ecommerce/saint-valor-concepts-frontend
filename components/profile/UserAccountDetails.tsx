interface UserAccountDetailsProps {
  emailValue: string;
  isSaving: boolean;
  hasChanges: boolean;
  onSave: () => void;
}

const UserAccountDetails = ({
  emailValue,
  isSaving,
  hasChanges,
  onSave,
}: UserAccountDetailsProps) => {
  return (
    <div className="flex flex-col gap-5">
      {/* Email */}
      <div>
        <label className="text-xs text-secondary uppercase tracking-wide mb-1.5 block">
          Email Address
        </label>
        <div className="flex items-center border border-border rounded-md bg-ivory px-3 py-2">
          <input
            type="email"
            value={emailValue}
            disabled
            readOnly
            className="flex-1 text-sm text-secondary bg-transparent outline-none cursor-not-allowed"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="text-xs text-secondary uppercase tracking-wide mb-1.5 block">
          Password
        </label>
        <div className="flex items-center border border-border rounded-md bg-ivory px-3 py-2">
          <input
            type="text"
            value="••••••••••••••"
            disabled
            readOnly
            className="flex-1 text-sm text-secondary bg-transparent outline-none cursor-not-allowed"
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={onSave}
        disabled={isSaving || !hasChanges}
        className="w-fit px-6 py-2.5 bg-gold text-white text-sm font-medium rounded-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default UserAccountDetails;
