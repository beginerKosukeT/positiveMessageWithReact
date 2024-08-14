/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "res.cloudinary.com" }]
    },
    output: "export"
};
export default nextConfig;
