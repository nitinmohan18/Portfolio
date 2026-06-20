import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-ignore
  allowedDevOrigins: ["10.222.132.200", "10.222.132.200:3000", "192.168.1.20", "192.168.1.20:3000", "10.187.194.200", "10.187.194.200:3000"],
};

export default nextConfig;
