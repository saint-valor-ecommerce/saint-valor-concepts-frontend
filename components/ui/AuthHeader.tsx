import Image from "next/image";

type AuthHeaderProps = {
  title: string;
  description: string;
};

const AuthHeader = ({ title, description }: AuthHeaderProps) => {
  return (
    <div>
      <Image
        src="/images/Logo.svg"
        width={44}
        height={44}
        style={{ height: "auto" }}
        alt="Saint Valor Logo"
      />

      <div className="space-y-1.5 mt-2">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-sm leading-relaxed text-secondary">{description}</p>
      </div>
    </div>
  );
};

export default AuthHeader;
