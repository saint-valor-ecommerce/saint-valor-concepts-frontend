import OtpPage from "../_components/OtpPage";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div className="min-h-screen bg-ivory" />}>
        <OtpPage />
      </Suspense>
    </div>
  );
};

export default page;
