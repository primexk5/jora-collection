import { useId } from 'react'

const PALETTES = {
  noir: { body: '#262626', edge: '#141414', sheen: '#454545', hardware: '#c9a66b', line: '#6b6b6b' },
  navy: { body: '#263145', edge: '#131926', sheen: '#3a4a68', hardware: '#c9a66b', line: '#5b6a85' },
  silver: { body: '#c9cbce', edge: '#9b9ea3', sheen: '#e8e9eb', hardware: '#1b2233', line: '#8b8e93' },
  cream: { body: '#ece5d8', edge: '#c9bfab', sheen: '#f8f4ec', hardware: '#c9a66b', line: '#bfb39b' },
  blush: { body: '#e5c2ca', edge: '#c79ea8', sheen: '#f4dfe4', hardware: '#c9a66b', line: '#c09aa4' },
  red: { body: '#e8185a', edge: '#b00f42', sheen: '#ff5b88', hardware: '#f6f6f7', line: '#a30d3d' },
  gold: { body: '#c9a66b', edge: '#a17c42', sheen: '#e6cfa2', hardware: '#1b2233', line: '#9c7840' },
}

function Monogram({ y = 0, fill = '#c9a66b', size = 40 }) {
  return (
    <text
      x="200"
      y={y}
      textAnchor="middle"
      fontFamily="Marcellus, Georgia, serif"
      fontSize={size}
      fill={fill}
      opacity="0.92"
    >
      J
    </text>
  )
}

export default function BagArt({
  variant = 'handbag',
  palette = 'noir',
  className = '',
  monogram = true,
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const colors = PALETTES[palette] ?? PALETTES.noir
  const gradientId = `bag-${uid}`
  const gradient = `url(#${gradientId})`

  const shapes = {
    handbag: (
      <g>
        <path
          d="M156 194 C156 142 244 142 244 194"
          stroke={colors.edge}
          strokeWidth="11"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="156" cy="194" r="5" fill={colors.hardware} />
        <circle cx="244" cy="194" r="5" fill={colors.hardware} />
        <rect x="112" y="192" width="176" height="124" rx="24" fill={gradient} />
        <path
          d="M136 192 H264 Q288 192 288 216 V238 Q288 250 276 250 H124 Q112 250 112 238 V216 Q112 192 136 192 Z"
          fill={colors.edge}
          opacity="0.92"
        />
        <path d="M130 200 H270" stroke={colors.line} strokeWidth="1.5" strokeDasharray="5 6" opacity="0.55" />
        <circle cx="200" cy="250" r="10" fill={colors.hardware} />
        <circle cx="200" cy="250" r="3.4" fill={colors.edge} />
        {monogram && <Monogram y="302" fill={colors.hardware} size="34" />}
      </g>
    ),
    tote: (
      <g>
        <path
          d="M152 172 C152 112 248 112 248 172"
          stroke={colors.edge}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M158 170 C158 120 242 120 242 170"
          stroke={colors.sheen}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
        <rect x="112" y="168" width="176" height="16" rx="8" fill={colors.edge} />
        <path
          d="M120 184 H280 L294 306 Q295 318 283 318 H117 Q105 318 106 306 Z"
          fill={gradient}
        />
        <path d="M128 208 H272" stroke={colors.line} strokeWidth="1.5" strokeDasharray="5 6" opacity="0.5" />
        <path d="M134 318 L138 300" stroke={colors.edge} strokeWidth="2" opacity="0.4" />
        <path d="M266 318 L262 300" stroke={colors.edge} strokeWidth="2" opacity="0.4" />
        {monogram && <Monogram y="272" fill={colors.hardware} size="42" />}
      </g>
    ),
    crossbody: (
      <g>
        <path
          d="M140 212 C116 118 284 118 260 212"
          stroke={colors.edge}
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
        <rect x="128" y="210" width="144" height="110" rx="20" fill={gradient} />
        <path
          d="M128 240 Q128 210 158 210 H242 Q272 210 272 240 V252 H128 Z"
          fill={colors.edge}
          opacity="0.95"
        />
        <rect x="188" y="247" width="24" height="11" rx="4" fill={colors.hardware} />
        <path d="M142 272 H258" stroke={colors.line} strokeWidth="1.5" strokeDasharray="5 6" opacity="0.45" />
        {monogram && <Monogram y="305" fill={colors.hardware} size="30" />}
      </g>
    ),
    clutch: (
      <g>
        <path
          d="M148 222 C148 184 252 184 252 222"
          stroke={colors.hardware}
          strokeWidth="3.5"
          fill="none"
          strokeDasharray="6 5"
          strokeLinecap="round"
        />
        <rect x="80" y="220" width="240" height="94" rx="24" fill={gradient} />
        <path
          d="M80 248 L200 298 L320 248 V236 Q320 220 304 220 H96 Q80 220 80 236 Z"
          fill={colors.edge}
          opacity="0.95"
        />
        <path d="M98 230 H302" stroke={colors.line} strokeWidth="1.5" strokeDasharray="5 6" opacity="0.45" />
        <circle cx="200" cy="298" r="7" fill={colors.hardware} />
        <circle cx="200" cy="298" r="2.5" fill={colors.edge} />
      </g>
    ),
    backpack: (
      <g>
        <path
          d="M136 200 C106 226 108 294 142 312"
          stroke={colors.edge}
          strokeWidth="13"
          fill="none"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M264 200 C294 226 292 294 258 312"
          stroke={colors.edge}
          strokeWidth="13"
          fill="none"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M172 174 C172 132 228 132 228 174"
          stroke={colors.edge}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <rect x="126" y="168" width="148" height="148" rx="36" fill={gradient} />
        <path
          d="M146 194 Q200 176 254 194"
          stroke={colors.line}
          strokeWidth="2"
          strokeDasharray="5 5"
          opacity="0.55"
          fill="none"
        />
        <rect x="146" y="236" width="108" height="72" rx="20" fill={colors.edge} opacity="0.92" />
        <path d="M162 256 H238" stroke={colors.line} strokeWidth="1.5" strokeDasharray="4 5" opacity="0.5" />
        <rect x="188" y="250" width="24" height="9" rx="4" fill={colors.hardware} />
        <circle cx="200" cy="286" r="5" fill={colors.hardware} />
        {monogram && <Monogram y="226" fill={colors.hardware} size="28" />}
      </g>
    ),
    travel: (
      <g>
        <path
          d="M150 210 C150 156 250 156 250 210"
          stroke={colors.edge}
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M162 210 C162 172 238 172 238 210"
          stroke={colors.sheen}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.55"
        />
        <rect x="72" y="208" width="256" height="98" rx="46" fill={gradient} />
        <rect x="94" y="212" width="16" height="90" rx="8" fill={colors.edge} opacity="0.5" />
        <rect x="290" y="212" width="16" height="90" rx="8" fill={colors.edge} opacity="0.5" />
        <path d="M116 240 H284" stroke={colors.line} strokeWidth="1.5" strokeDasharray="5 6" opacity="0.45" />
        <circle cx="124" cy="306" r="5" fill={colors.hardware} />
        <circle cx="276" cy="306" r="5" fill={colors.hardware} />
        {monogram && <Monogram y="274" fill={colors.hardware} size="38" />}
      </g>
    ),
  }

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0.05" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor={colors.sheen} />
          <stop offset="0.48" stopColor={colors.body} />
          <stop offset="1" stopColor={colors.edge} />
        </linearGradient>
      </defs>
      {shapes[variant] ?? shapes.handbag}
    </svg>
  )
}
