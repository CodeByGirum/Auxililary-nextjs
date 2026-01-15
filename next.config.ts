import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    env: {
        // Expose GEMINI_API_KEY as API_KEY to match previous Vite config
        // WARNING: This exposes the key to the client side. Ensure this is intended.
        API_KEY: process.env.GEMINI_API_KEY,
    },
    // Ensure we can import from outside app directory if needed (e.g. pages/components)
    experimental: {
        // appDir is enabled by default in 15+
    }
};

export default nextConfig;
