/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // GitHub Pages doesn't support Next.js' default image optimizer.
    unoptimized: true,
  },
}

export default nextConfig
