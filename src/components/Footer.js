import { Link } from 'react-router-dom';
import { Share2, PlayCircle, Link2 } from 'lucide-react';
import Button from './Button';
import InstagramIcon from './icons/InstagramIcon';
import { footerServices } from '../data/footerServices';
import { footerSupportLinks } from '../data/footerSupportLinks';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Services', to: '/#services' },
  { label: 'Contact', to: '/#contact' },
  { label: 'Consultation', to: '/#contact' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/agrimonk.in', icon: InstagramIcon },
  { label: 'Facebook', href: '#', icon: Share2 },
  { label: 'YouTube', href: '#', icon: PlayCircle },
  { label: 'LinkedIn', href: '#', icon: Link2 },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div>
          <h3 className="text-xl font-bold mb-1">AGRI MONK</h3>
          <p className="text-xs text-gray-500 mb-3">Learn &middot; Implement &middot; Earn</p>
          <p className="text-gray-400 mb-4">
            Empowering farmers with knowledge and modern solutions for a better
            and sustainable future.
          </p>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-gray-400 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Our Services</h4>
          <ul className="space-y-2">
            {footerServices.map((service) => (
              <li key={service} className="text-gray-400">
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            {footerSupportLinks.map((link) => (
              <li key={link}>
                <Button as="a" href="#" variant="text" className="!text-gray-400 hover:!text-white">
                  {link}
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-400">hello@agrimonk.in</p>
          <p className="text-gray-400">@agrimonk.in</p>
          <p className="text-gray-400">Bengaluru, India</p>
        </div>
      </div>

      <p className="text-center text-accent mt-12 font-medium">We make agriculture cool.</p>
    </footer>
  );
}
