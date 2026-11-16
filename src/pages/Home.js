import { useState } from 'react';
import { CheckCircle2, BookOpenCheck, UserCheck2, LifeBuoy, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import RevealSection from '../components/RevealSection';
import CountUp from '../components/CountUp';
import ComingSoonModal from '../components/ComingSoonModal';
import FloatingLeaves from '../components/FloatingLeaves';
import { useScrollToHash } from '../hooks/useScrollToHash';
import { aboutCards } from '../data/aboutCards';
import { whyChooseCards } from '../data/whyChooseCards';
import { courses } from '../data/courses';
import { services } from '../data/services';
import { workWithCards } from '../data/workWithCards';
import { modernAgricultureCards } from '../data/modernAgricultureCards';
import { founderCredentials } from '../data/founderCredentials';
import { trustBadges } from '../data/trustBadges';
import { testimonials } from '../data/testimonials';
import { blogPosts } from '../data/blogPosts';
import { ctaPoints } from '../data/ctaPoints';

const HERO_BADGES = [
  { label: 'Practical Learning', icon: BookOpenCheck, className: '-left-6 top-10' },
  { label: 'Expert Guidance', icon: UserCheck2, className: '-right-6 top-1/3' },
  { label: 'Lifetime Support', icon: LifeBuoy, className: '-left-6 bottom-16' },
];

const COMMUNITY_AVATARS = [
  '/assets/images/community-avatar-1.jpg',
  '/assets/images/community-avatar-2.jpg',
  '/assets/images/community-avatar-3.jpg',
];

export default function Home() {
  useScrollToHash();
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <>
      <Navbar />

      <main className="bg-page-bg pt-24 sm:pt-36">
        <section className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start pb-16 sm:pb-20">
          <FloatingLeaves />
          <div>
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6">
              We Make <span className="text-accent">Agriculture Cool.</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Modern agriculture consulting for corporate professionals,
              entrepreneurs, engineers, and anyone who wants to enter farming
              and build profitable agricultural ventures.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button as="a" href="#" variant="primary">
                Book Consultation
              </Button>
              <Button as="link" to="/courses" variant="outline">
                Explore Agriculture
              </Button>
            </div>
            <p className="flex items-start gap-2 text-sm text-gray-600 max-w-md">
              <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={18} />
              Helping people explore modern farming, agribusiness, hydroponics,
              mushroom farming, protected cultivation, and profitable
              agriculture opportunities.
            </p>
          </div>

          <div className="relative z-20">
            <img
              src="/assets/images/hero.jpg"
              alt="Agri Monk consultant standing in a modern greenhouse"
              className="w-full rounded-3xl object-cover"
            />

            {HERO_BADGES.map(({ label, icon: Icon, className }) => (
              <div
                key={label}
                className={`hidden sm:flex absolute ${className} bg-white rounded-xl shadow-lg px-4 py-3 items-center gap-2 text-sm font-medium`}
              >
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Icon size={16} />
                </span>
                {label}
              </div>
            ))}

            <div className="hidden sm:flex absolute -bottom-6 right-4 bg-white rounded-xl shadow-lg px-4 py-3 items-center gap-3">
              <div className="flex -space-x-3">
                {COMMUNITY_AVATARS.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="text-sm font-semibold">132K+ Community Across India</p>
            </div>
          </div>
        </section>

        <RevealSection
          as="div"
          className="max-w-6xl mx-auto px-6 relative z-10 -mt-6 sm:-mt-16 bg-white rounded-3xl shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-8 p-10"
        >
          <div>
            <h2 className="text-3xl font-bold text-primary mb-1">
              <CountUp end={132} suffix="K+" />
            </h2>
            <p className="text-gray-500">Followers</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-1">
              <CountUp end={2} suffix=".2M+" />
            </h2>
            <p className="text-gray-500">Monthly Views</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-1">Modern</h2>
            <p className="text-gray-500">
              Hydroponics &middot; Mushroom Farming &middot; Agribusiness
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-1">New Age</h2>
            <p className="text-gray-500">For professionals, entrepreneurs &amp; beginners</p>
          </div>
        </RevealSection>

        <RevealSection id="about" className="scroll-mt-24 sm:scroll-mt-32 max-w-6xl mx-auto px-6 py-28">
          <p className="text-accent font-semibold uppercase tracking-wide mb-2">About Agri Monk</p>
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-10">
            Agriculture is Changing. <span className="text-accent">So Are We.</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                Agri Monk India is a new-age agriculture consulting company
                helping people enter modern agriculture in a smart, profitable,
                and practical way.
              </p>
              <p className="font-medium text-gray-700">We help:</p>
              <ul className="grid grid-cols-2 gap-1 list-disc list-inside">
                <li>Corporate professionals</li>
                <li>Engineers</li>
                <li>Business owners</li>
                <li>First-generation farmers</li>
                <li>Young entrepreneurs</li>
                <li>Agriculture enthusiasts</li>
              </ul>
              <p>
                Whether you want to start farming, invest in agriculture, build
                an agribusiness, or simply learn cool modern farming concepts
                — Agri Monk helps simplify the journey.
              </p>
              <p className="font-semibold text-primary">
                Because agriculture today is not just farming. It is business.
                It is innovation. It is opportunity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {aboutCards.map((card) => (
                <div key={card.title} className="relative h-32 rounded-2xl overflow-hidden shadow">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <p className="absolute bottom-0 inset-x-0 p-3 text-white font-medium text-sm">
                    {card.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-accent font-semibold uppercase tracking-wide mb-2">Why Agri Monk</p>
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-10">Why People Choose Agri Monk</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseCards.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="bg-white rounded-2xl shadow p-8 transition-transform hover:-translate-y-2"
              >
                <span className="inline-flex w-12 h-12 rounded-full bg-primary/10 text-primary items-center justify-center mb-4">
                  <Icon size={22} />
                </span>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-accent font-semibold uppercase tracking-wide mb-2">
            Learn &middot; Implement &middot; Earn
          </p>
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-10">Our Popular Courses</h2>

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

          <div className="text-center mt-10">
            <Button as="link" to="/courses" variant="primary">
              View All Courses
            </Button>
          </div>
        </RevealSection>

        <RevealSection id="services" className="scroll-mt-24 sm:scroll-mt-32 max-w-6xl mx-auto px-6 py-20">
          <p className="text-accent font-semibold uppercase tracking-wide mb-2">What We Do</p>
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-10">Our Services</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="bg-white rounded-2xl shadow p-8 transition-transform hover:-translate-y-2"
              >
                <span className="inline-flex w-12 h-12 rounded-full bg-primary/10 text-primary items-center justify-center mb-4">
                  <Icon size={22} />
                </span>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="bg-founder-bg text-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-accent font-semibold uppercase tracking-wide mb-2">Who We Work With</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-10">
              Empowering People From Different Backgrounds
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {workWithCards.map(({ label, description, icon: Icon }) => (
                <div
                  key={label}
                  className="bg-white/10 rounded-2xl p-6 text-center transition-transform hover:-translate-y-2"
                >
                  <span className="inline-flex w-12 h-12 rounded-full bg-white/10 items-center justify-center mb-4">
                    <Icon size={22} />
                  </span>
                  <h3 className="font-semibold mb-2">{label}</h3>
                  <p className="text-sm text-gray-300">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-accent font-semibold uppercase tracking-wide mb-2">Modern Agriculture</p>
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-10">Explore Modern Agriculture</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modernAgricultureCards.map(({ title, description, image }) => (
              <div
                key={title}
                className="bg-white rounded-2xl shadow overflow-hidden transition-transform hover:-translate-y-2"
              >
                <div className="relative h-40">
                  <img src={image} alt={title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <p className="absolute bottom-0 inset-x-0 p-4 text-white font-bold">{title}</p>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <img
              src="/assets/images/founder.jpg"
              alt="Monish Gowda, founder of Agri Monk India"
              className="w-full rounded-3xl object-cover"
            />

            <div>
              <p className="text-accent font-semibold uppercase tracking-wide mb-2">Founder</p>
              <h2 className="text-3xl font-extrabold mb-2">Meet Monish Gowda</h2>
              <p className="text-gray-500 font-medium mb-6">
                Agripreneur | Agriculture Consultant | Business Strategist
              </p>

              <div className="space-y-4 text-gray-600 leading-relaxed mb-6">
                <p>
                  Monish Gowda founded Agri Monk India with a vision to
                  modernize the image of agriculture and help more people
                  confidently enter farming and agribusiness.
                </p>
                <p>
                  With a background in agribusiness management from
                  ICAR-NAARM and industry experience with DCM Shriram Ltd and
                  ITC Limited, he combines agriculture, business strategy, and
                  modern thinking to help people discover opportunities in
                  farming.
                </p>
              </div>

              <p className="italic font-semibold text-primary">
                &ldquo;Make agriculture exciting, practical, and profitable for
                the next generation.&rdquo;
              </p>
            </div>

            <div className="space-y-3">
              {founderCredentials.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-white rounded-xl shadow p-4 text-sm font-medium"
                >
                  <span className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon size={18} />
                  </span>
                  {label}
                </div>
              ))}
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

        <RevealSection className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-extrabold text-center mb-10">What People Say</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {testimonials.map(({ quote, name, role, avatar }) => (
              <div key={name} className="bg-white rounded-2xl shadow p-6">
                <div className="flex gap-1 text-accent mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-gray-500 text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="blog" className="scroll-mt-24 sm:scroll-mt-32 max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-extrabold mb-10">Agri Insights &amp; Knowledge</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post) => (
              <div
                key={post.title}
                className="bg-white rounded-2xl shadow overflow-hidden transition-transform hover:-translate-y-2"
              >
                <img src={post.image} alt={post.title} className="w-full h-32 object-cover" />
                <div className="p-5">
                  <p className="text-accent text-xs font-semibold mb-1">
                    {post.category} &middot; {post.date}
                  </p>
                  <h3 className="font-bold mb-3">{post.title}</h3>
                  <Button as="a" href="#" variant="text">
                    Read More &rarr;
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="bg-primary text-white py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl lg:text-3xl font-extrabold mb-3">Stay Updated with Agri Monk</h2>
            <p className="text-white/80 mb-6">
              Join our community and get the latest farming tips, courses,
              offers and agri news.
            </p>
            <form className="flex flex-wrap justify-center gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-5 py-3 rounded-xl text-gray-900 w-full sm:w-auto sm:min-w-[300px]"
              />
              <button
                type="submit"
                className="bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-transform hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </form>
          </div>
        </RevealSection>

        <RevealSection id="contact" className="scroll-mt-24 sm:scroll-mt-32 bg-founder-bg text-white py-24 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-6">
              Ready to Explore <span className="text-accent">Modern Agriculture?</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-10">
              Whether you want to start farming, learn modern agriculture, or
              explore agribusiness opportunities — Agri Monk is here to guide
              you.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 text-sm">
              {ctaPoints.map(({ label, icon: Icon }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <Icon size={20} className="text-accent" />
                  <p>{label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button as="a" href="#" variant="primary">
                Get Consultation
              </Button>
              <Button
                as="a"
                href="#"
                variant="outline"
                className="!border-white !text-white hover:!bg-white hover:!text-founder-bg"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </RevealSection>
      </main>

      <Footer />

      <ComingSoonModal open={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </>
  );
}
