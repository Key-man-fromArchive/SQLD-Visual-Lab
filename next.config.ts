import type { NextConfig } from 'next'

// @TASK P0-T0.3 - Next.js WASM 지원 설정
const nextConfig: NextConfig = {
  // Turbopack (Next.js 16 기본) - 빈 설정으로 경고 해소
  turbopack: {},
  // webpack fallback (빌드 시 sql.js 등 Node.js 모듈 대응)
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    }
    return config
  },
}

export default nextConfig
