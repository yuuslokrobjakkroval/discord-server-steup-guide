import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', background: '#161A13' }}>
      <svg width="140" height="140" viewBox="0 0 64 64" fill="none">
        <path d="m12 27 20-10 20 10-20 10-20-10Z" fill="#BAFF40" />
        <path d="m12 36 20 10 20-10M12 45l20 10 20-10" stroke="#BAFF40" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>,
    size,
  );
}
