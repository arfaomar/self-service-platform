import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "img.clerk.com",
                pathname: "/**",
            },
        ],
    },
    output: "standalone",
};

export default nextConfig;
