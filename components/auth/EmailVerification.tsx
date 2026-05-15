"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const EmailVerification: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className=" bg-white flex items-center justify-center p-4 mx-4 rounded-2xl">
      <div className="p-8 max-w-md w-full flex flex-col">
        {/* Email Icon */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/check-your-inbox.png"
            alt="Email Icon"
            width={200}
            height={200}
            loading="eager"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-charcoal mb-3">
          Check your inbox
        </h1>

        {/* Description */}
        <p className="text-charcoal text-sm mb-6">
          Click on the link we sent to{" "}
          <span className="font-bold text-charcoal">{email}</span> to finish
          your password reset.
        </p>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already reset your password?{" "}
          <Link href="/sign-in" className="text-charcoal font-medium underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
