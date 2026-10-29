export default function CurveDivider({ fill = '#1b2233', flip = false, className = '' }) {
  return (
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-12 w-full md:h-20 ${flip ? 'rotate-180' : ''} ${className}`}
    >
      <path
        d="M0 54C240 98 480 96 720 62C960 28 1200 6 1440 42V100H0V54Z"
        fill={fill}
      />
    </svg>
  )
}
