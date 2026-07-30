import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Services', to: '/#services' },
  { label: 'Contact', to: '/#contact' },
  { label: 'Courses', to: '/courses' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="leading-tight">
          <span className="block text-2xl font-extrabold text-primary">
            AGRI MONK INDIA
          </span>
          <span className="block text-xs text-gray-500">
            We Make Agriculture Cool.
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="font-medium text-gray-800 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Button as="link" to="/courses" variant="outline">
            Explore Courses
          </Button>
          <Button as="a" href="#" variant="primary">
            Book Consultation
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden text-2xl text-primary"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="lg:hidden flex flex-col gap-4 px-6 pb-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="font-medium text-gray-800 hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button as="link" to="/courses" variant="outline" onClick={() => setOpen(false)}>
            Explore Courses
          </Button>
          <Button as="a" href="#" variant="primary" onClick={() => setOpen(false)}>
            Book Consultation
          </Button>
        </div>
      )}
    </nav>
  );
}
