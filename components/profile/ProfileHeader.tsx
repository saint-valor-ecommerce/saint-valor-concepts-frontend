import { Pencil } from "lucide-react";

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  memberSince: string;
  editName: boolean;
  firstNameValue: string;
  lastNameValue: string;
  onToggleEditName: () => void;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
}

const ProfileHeader = ({
  firstName,
  lastName,
  memberSince,
  editName,
  firstNameValue,
  lastNameValue,
  onToggleEditName,
  onFirstNameChange,
  onLastNameChange,
}: ProfileHeaderProps) => {
  return (
    <div className="flex items-start flex-col md:flex-row md:justify-between gap-4">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-charcoal text-ivory flex items-center justify-center text-lg font-semibold uppercase">
          {firstName[0]}
        </div>

        <div>
          <div className="flex items-center gap-2">
            {editName ? (
              <div className="flex gap-2">
                <input
                  value={firstNameValue}
                  onChange={(e) => onFirstNameChange(e.target.value)}
                  className="border border-border rounded px-2 py-1 text-sm text-charcoal outline-none"
                />
                <input
                  value={lastNameValue}
                  onChange={(e) => onLastNameChange(e.target.value)}
                  className="border border-border rounded px-2 py-1 text-sm text-charcoal outline-none"
                />
              </div>
            ) : (
              <h2 className="text-xl font-semibold text-charcoal capitalize">
                {firstName} {lastName}
              </h2>
            )}
            <button onClick={onToggleEditName}>
              <Pencil className="w-4 h-4 cursor-pointer" />
            </button>
          </div>
          <p className="text-sm text-secondary mt-0.5">
            Saint Valor member since {memberSince}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
