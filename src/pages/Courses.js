import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import RevealSection from '../components/RevealSection';
import CountUp from '../components/CountUp';
import ComingSoonModal from '../components/ComingSoonModal';
import { courses } from '../data/courses';
import { trustBadges } from '../data/trustBadges';

const WHY_CHOOSE_POINTS = [
  'Founded by ICAR-NAARM Alumnus',
  '100,000+ Students & Growing',
  'Practical Training & Real-World Exposure',
  'Lifetime Access & Community Support',
  'Helping Farmers Become Agripreneurs',
];

export default function Courses() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <>
      <Navbar />

      <main className="bg-page-bg pt-24 sm:pt-36">
        <RevealSection className="max-w-6xl mx-auto px-6 text-center py-12">
          <h1 className="text-3xl lg:text-5xl font-extrabold mb-4">Our Popular Courses</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn in-demand agricultural skills from basics to advanced level.
          </p>
        </RevealSection>

        <RevealSection className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {courses.map(({ title, description, image, icon: Icon }) => (
              <div
                key={title}
                className="relative bg-white rounded-2xl shadow transition-transform hover:-translate-y-2"
              >
                <div className="rounded-t-2xl overflow-hidden">
                  <img src={image} alt={title} className="w-full h-36 object-cover" />
                </div>
                <span className="absolute -top-4 left-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow">
                  <Icon size={18} />
                </span>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{description}</p>
                  <Button
                    as="button"
                    variant="text"
                    onClick={() => setShowComingSoon(true)}
                  >
                    View Course &rarr;
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent font-semibold uppercase tracking-wide mb-2">About Agri Monk</p>
              <h2 className="text-3xl font-extrabold mb-6">Why Choose Agri Monk?</h2>
              <ul className="space-y-3 text-gray-600">
                {WHY_CHOOSE_POINTS.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-accent font-bold">&#10003;</span>
                    {point}
                  </li>
                ))}
              </ul>
              <Button as="a" href="#" variant="primary" className="mt-8">
                Know Our Story
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow p-8 grid grid-cols-2 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold text-primary">
                  <CountUp end={100} suffix="K+" />
                </h3>
                <p className="text-gray-500 text-sm">Happy Students</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary">
                  <CountUp end={250} suffix="+" />
                </h3>
                <p className="text-gray-500 text-sm">Expert Videos</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary">
                  <CountUp end={35} suffix="+" />
                </h3>
                <p className="text-gray-500 text-sm">Courses</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary">
                  <CountUp end={12} suffix="+" />
                </h3>
                <p className="text-gray-500 text-sm">States Reached</p>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="bg-founder-bg py-10">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center text-white">
            {trustBadges.map(({ label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon size={22} className="text-accent" />
                <p className="text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </RevealSection>
      </main>

      <Footer />

      <ComingSoonModal open={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </>
  );
}
