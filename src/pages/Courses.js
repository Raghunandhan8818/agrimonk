import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import RevealSection from '../components/RevealSection';
import CountUp from '../components/CountUp';
import { courses } from '../data/courses';
import { testimonials } from '../data/testimonials';
import { blogPosts } from '../data/blogPosts';

const TRUST_BADGES = [
  'ICAR-NAARM Alumnus',
  'Awarded by Govt. of India',
  'Featured in Top Agri Media',
  'Trusted by Farmers Across India',
];

const WHY_CHOOSE_POINTS = [
  'Founded by ICAR-NAARM Alumnus',
  '100,000+ Students & Growing',
  'Practical Training & Real-World Exposure',
  'Lifetime Access & Community Support',
  'Helping Farmers Become Agripreneurs',
];

export default function Courses() {
  return (
    <>
      <Navbar />

      <main className="bg-page-bg pt-28">
        <RevealSection className="max-w-6xl mx-auto px-6 text-center py-12">
          <h1 className="text-3xl lg:text-5xl font-extrabold mb-4">
            Our Popular Courses
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn in-demand agricultural skills from basics to advanced level.
          </p>
        </RevealSection>

        <RevealSection className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {courses.map((course) => (
              <div
                key={course.title}
                className="bg-white rounded-2xl shadow overflow-hidden transition-transform hover:-translate-y-2"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-36 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {course.description}
                  </p>
                  <Button
                    as="a"
                    href="#"
                    variant="primary"
                    className="!inline-block !p-0 !rounded-none !bg-transparent !text-primary !text-sm hover:!bg-transparent hover:!translate-y-0"
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
              <p className="text-accent font-semibold uppercase tracking-wide mb-2">
                About Agri Monk
              </p>
              <h2 className="text-3xl font-extrabold mb-6">
                Why Choose Agri Monk?
              </h2>
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
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center text-white text-sm font-medium">
            {TRUST_BADGES.map((badge) => (
              <p key={badge}>{badge}</p>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-extrabold text-center mb-10">
            What Our Learners Say
          </h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-2xl shadow p-6"
              >
                <p className="text-accent mb-3">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                <p className="text-gray-600 italic mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-extrabold mb-10">
            Agri Insights &amp; Knowledge
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post) => (
              <div
                key={post.title}
                className="bg-white rounded-2xl shadow overflow-hidden transition-transform hover:-translate-y-2"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-5">
                  <p className="text-accent text-xs font-semibold mb-1">
                    {post.category} &middot; {post.date}
                  </p>
                  <h3 className="font-bold mb-3">{post.title}</h3>
                  <Button
                    as="a"
                    href="#"
                    variant="primary"
                    className="!inline-block !p-0 !rounded-none !bg-transparent !text-primary !text-sm hover:!bg-transparent hover:!translate-y-0"
                  >
                    Read More &rarr;
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="bg-primary text-white py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl lg:text-3xl font-extrabold mb-3">
              Stay Updated with Agri Monk
            </h2>
            <p className="text-white/80 mb-6">
              Join our community and get the latest farming tips, courses,
              offers and agri news.
            </p>
            <form
              className="flex flex-wrap justify-center gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
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
      </main>

      <Footer />
    </>
  );
}
