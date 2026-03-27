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
    // WASM 파일 처리
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }
    return config
  },
  // 정적 파일 헤더 설정 (WASM MIME type)
  async headers() {
    return [
      {
        source: '/:path*.wasm',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/wasm',
          },
        ],
      },
    ]
  },
}

export default nextConfig
