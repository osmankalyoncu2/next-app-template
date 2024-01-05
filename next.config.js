const { withNextVideo } = require('next-video\process')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // I don’t like strict mode
}

module.exports = withNextVideo(nextConfig)
