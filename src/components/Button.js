import { Link } from 'react-router-dom';

const VARIANT_CLASSES = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white',
};

export default function Button({
  as = 'a',
  to,
  href = '#',
  variant = 'primary',
  className = '',
  onClick,
  children,
}) {
  const classes = `inline-block px-6 py-3 rounded-xl font-semibold transition-transform duration-200 hover:-translate-y-0.5 ${VARIANT_CLASSES[variant]} ${className}`;

  if (as === 'link') {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (as === 'button') {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} className={classes} onClick={onClick}>
      {children}
    </a>
  );
}
