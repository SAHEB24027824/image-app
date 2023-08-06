/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_APP_API_URL: process.env.NEXT_PUBLIC_APP_API_URL,
  },
    images: {
        domains:['localhost','imageapp.in']
      },
}

module.exports = nextConfig
