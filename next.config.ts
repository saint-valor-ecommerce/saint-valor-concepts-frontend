import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        {
          key: "Content-Security-Policy",
          value:
            process.env.NODE_ENV === "production"
              ? "default-src 'self'; script-src 'self' 'unsafe-inline' https://vercel.live https://accounts.google.com; style-src 'self' 'unsafe-inline' https://accounts.google.com; img-src 'self' data: blob: https://res.cloudinary.com https://lh3.googleusercontent.com; font-src 'self'; connect-src 'self' https://backend-qh97.onrender.com/ https://vercel.live wss://ws-us3.pusher.com https://accounts.google.com https://oauth2.googleapis.com https://freeipapi.com https://open.er-api.com; frame-src 'self' https://accounts.google.com;"
              : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://accounts.google.com; style-src 'self' 'unsafe-inline' https://accounts.google.com; img-src 'self' data: blob: https://res.cloudinary.com https://lh3.googleusercontent.com; font-src 'self'; connect-src 'self' https://backend-qh97.onrender.com/ https://accounts.google.com https://oauth2.googleapis.com https://freeipapi.com https://open.er-api.com; frame-src 'self' https://accounts.google.com;",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    },
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google profile pictures
      },
    ],
  },
};

export default nextConfig;
