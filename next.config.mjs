/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                hostname: "avatars.githubusercontent.com",
            },
            {
                hostname: "firebasestorage.googleapis.com",
            }
        ]
    }
};

export default nextConfig;
