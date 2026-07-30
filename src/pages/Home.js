import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import RevealSection from '../components/RevealSection';
import CountUp from '../components/CountUp';
import { useScrollToHash } from '../hooks/useScrollToHash';
import { aboutCards } from '../data/aboutCards';

export default function Home() {
  useScrollToHash();

  return (
    <>
      <Navbar />

      <main className="bg-page-bg pt-28">
        <section className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6">
              We Make <span className="text-accent">Agriculture Cool.</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              New-age agriculture consulting for corporate professionals,
              entrepreneurs, engineers and anyone who wants to enter farming
              and build profitable agricultural ventures.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button as="a" href="#" variant="primary">
                Book Consultation
              </Button>
              <Button as="link" to="/courses" variant="outline">
                Explore Courses
              </Button>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1200&auto=format&fit=crop"
              alt="Agri Monk consultant standing in a modern greenhouse"
              className="w-full rounded-3xl object-cover"
            />
          </div>
        </section>

        <RevealSection
          as="div"
          className="max-w-6xl mx-auto px-6 mt-16 bg-white rounded-3xl shadow-lg grid grid-cols-2 lg:grid-cols-4 gap-8 p-10"
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
            <p className="text-gray-500">
              For professionals, entrepreneurs &amp; beginners
            </p>
          </div>
        </RevealSection>

        <RevealSection id="about" className="max-w-6xl mx-auto px-6 py-28">
          <p className="text-accent font-semibold uppercase tracking-wide mb-2">
            About Agri Monk
          </p>
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-10">
            Agriculture is changing.{' '}
            <span className="text-accent">So are we.</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                Agri Monk India is a new-age agriculture consulting company
                helping people enter modern agriculture in a smart, profitable
                and practical way.
              </p>
              <p>
                We help corporate professionals, engineers, entrepreneurs,
                first-generation farmers and agriculture enthusiasts
                understand and explore modern agricultural opportunities.
              </p>
              <p>
                Whether you want to start farming, invest in agriculture,
                build an agribusiness, or simply learn cool modern farming
                concepts, Agri Monk helps simplify the journey.
              </p>
              <p className="font-semibold text-primary">
                Because agriculture today is not just farming. It is
                business. It is innovation. It is opportunity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {aboutCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl overflow-hidden bg-white shadow"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-32 object-cover"
                  />
                  <p className="p-3 font-medium text-sm">{card.title}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </main>

      <Footer />
    </>
  );
}
