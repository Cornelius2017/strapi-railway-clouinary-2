/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'res.cloudinary.com']
  },
  i18n: {
    locales: ["ru", "en"],
    defaultLocale: "ru",
    localeDetection: false
  },
  trailingSlash: true,

  
}

module.exports = nextConfig
