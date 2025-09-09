// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: "/Users/natali/osio_website_vercel"
  eslint: {
    // Предупреждение: Это позволяет сборкам успешно завершаться даже при ошибках ESLint.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;