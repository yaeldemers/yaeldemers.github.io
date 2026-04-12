/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    // GitHub Pages doesn't support Next.js' default image optimizer.
    unoptimized: true,
    qualities: [75, 95],
  },
}

export default nextConfig
