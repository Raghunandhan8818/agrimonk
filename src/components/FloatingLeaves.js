const LEAVES = [
  { left: '6%', size: 20, duration: 9, delay: 0, sway: 50, spin: 280, color: '#6b8f61' },
  { left: '24%', size: 15, duration: 12, delay: 2.5, sway: -40, spin: 200, color: '#8aaa78' },
  { left: '46%', size: 24, duration: 10, delay: 5, sway: 60, spin: 320, color: '#5a7a50' },
  { left: '66%', size: 14, duration: 8, delay: 1.5, sway: -30, spin: 250, color: '#7a9e6a' },
  { left: '85%', size: 18, duration: 11, delay: 4, sway: 45, spin: 190, color: '#4a6741' },
];

export default function FloatingLeaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {LEAVES.map((leaf, i) => (
        <svg
          key={i}
          viewBox="0 0 20 24"
          className="absolute animate-leaf-drift"
          style={{
            top: '-30px',
            left: leaf.left,
            width: leaf.size,
            height: leaf.size * 1.2,
            '--sway-x': `${leaf.sway}px`,
            '--spin': `${leaf.spin}deg`,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
          }}
        >
          <path d="M10 22 C5 15 1 9 10 2 C19 9 15 15 10 22Z" fill={leaf.color} opacity="0.7" />
        </svg>
      ))}
    </div>
  );
}
