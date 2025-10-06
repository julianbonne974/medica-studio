import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
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
          width="28"
          height="16"
          viewBox="0 0 28 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rectangle outline */}
          <rect
            x="0.5"
            y="0.5"
            width="27"
            height="15"
            stroke="#18181b"
            strokeWidth="1"
            fill="none"
          />

          {/* ECG line */}
          <path
            d="M 2 8 L 6 8 L 7 4 L 8 12 L 9 8 L 11 8 L 12 7 L 13 9 L 14 8 L 18 8 L 19 5 L 20 11 L 21 8 L 26 8"
            stroke="#059669"
            strokeWidth="1.5"
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
