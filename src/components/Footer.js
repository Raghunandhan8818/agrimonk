import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Services', to: '/#services' },
  { label: 'Contact', to: '/#contact' },
];

const OUR_SERVICES = [
  'Agriculture Consulting',
  'Farm Setup Assistance',
  'Agribusiness Guidance',
  'Agriculture Learning',
  'Agri Brand Promotions',
  'Startup Support',
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="text-xl font-bold mb-3">AGRI MONK INDIA</h3>
          <p className="text-gray-400">
            Empowering farmers with knowledge and modern solutions for a better
            and sustainable future.
          </p>
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
            {OUR_SERVICES.map((service) => (
              <li key={service} className="text-gray-400">
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-400">hello@agrimonk.in</p>
          <p className="text-gray-400">Bengaluru, Karnataka, India</p>
        </div>
      </div>

      <p className="text-center text-accent mt-12 font-medium">
        We make agriculture cool.
      </p>
    </footer>
  );
}
