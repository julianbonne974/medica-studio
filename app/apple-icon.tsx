import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
        }}
      >
        <svg
          width="140"
          height="80"
          viewBox="0 0 140 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rectangle outline */}
          <rect
            x="2"
            y="2"
            width="136"
            height="76"
            stroke="#18181b"
            strokeWidth="3"
            fill="none"
          />

          {/* ECG line */}
          <path
            d="M 10 40 L 30 40 L 36 24 L 40 56 L 44 40 L 50 40 L 56 36 L 60 44 L 64 40 L 84 40 L 90 30 L 94 50 L 98 40 L 130 40"
            stroke="#059669"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
