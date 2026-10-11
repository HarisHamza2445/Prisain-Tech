export function SvgDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="chrome-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".35" stopColor="#b8c0d8" />
          <stop offset=".55" stopColor="#28324f" />
          <stop offset=".75" stopColor="#d9def0" />
          <stop offset="1" stopColor="#5f6886" />
        </linearGradient>
        <linearGradient id="shine-g" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="ps-clip">
          <path d="M24 5.5L42.5 14.75L24 24L5.5 14.75Z" />
        </clipPath>
      </defs>
      <symbol id="ps-mark" viewBox="0 0 48 48">
        <path fill="currentColor" d="M24 5.5L42.5 14.75L24 24L5.5 14.75Z" />
        <path fill="var(--px,#00F0FF)" d="M24 11.6L30.3 14.75L24 17.9L17.7 14.75Z" />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".62"
          d="M7 23.2L24 31.7L41 23.2"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".32"
          d="M7 31.4L24 39.9L41 31.4"
        />
      </symbol>
      <symbol id="i-chat" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5Zm0 2a7.5 7.5 0 1 1-3.9 13.9l-.3-.2-2.4.7.7-2.3-.2-.3A7.5 7.5 0 0 1 12 4.5Z"
        />
      </symbol>
    </svg>
  );
}
