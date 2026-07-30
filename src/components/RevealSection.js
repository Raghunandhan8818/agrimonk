import { useInView } from '../hooks/useInView';

export default function RevealSection({ as = 'section', id, className = '', children }) {
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const Tag = as;

  return (
    <Tag
      ref={ref}
      id={id}
      className={`transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
