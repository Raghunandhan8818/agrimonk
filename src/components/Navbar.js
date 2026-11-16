import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2, PlayCircle, Link2 } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/#about' },
  { label: 'Courses', to: '/courses' },
  { label: 'Blog', to: '/#blog' },
  { label: 'Services', to: '/#services' },
  { label: 'Contact Us', to: '/#contact' },
];

const INSTAGRAM_URL = 'https://instagram.com/agrimonk.in';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: INSTAGRAM_URL, icon: InstagramIcon },
  { label: 'Facebook', href: '#', icon: Share2 },
  { label: 'YouTube', href: '#', icon: PlayCircle },
  { label: 'LinkedIn', href: '#', icon: Link2 },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="hidden sm:flex items-center justify-between bg-ink text-white text-xs px-6 py-2">
        <p>Empowering Farmers. Building Agripreneurs. Growing India.</p>
        <div className="flex items-center gap-3">
          <span className="text-gray-400">Follow Us:</span>
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-gray-300 hover:text-white"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>

      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="leading-tight">
            <span className="block text-2xl font-extrabold text-primary">AGRI MONK</span>
            <span className="block text-xs text-gray-500">Learn &middot; Implement &middot; Earn</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
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

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-semibold transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary-dark"
          >
            <InstagramIcon size={18} />
            @agrimonk.in
          </a>

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
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-semibold w-fit"
            >
              <InstagramIcon size={18} />
              @agrimonk.in
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
