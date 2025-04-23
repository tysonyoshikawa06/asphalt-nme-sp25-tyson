import Image from 'next/image';
import Navbar from './components/Navbar';
import Link from 'next/link';
import { FaLeaf, FaChartLine, FaCog } from 'react-icons/fa';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-screen-full mx-auto">
        {/* Hero Section */}
        <section className="mb-24 flex flex-col p-8 md:flex-row items-center bg-gradient-to-b from-white via-[rgba(25,183,83,0.1)] to-[rgba(25,183,83,0.3)]">
          <div className="md:w-1/2 p-4 text-left">
            <h1 className="text-7xl font-extrabold mb-8 animate-fade-in-down text-gray-800">
              <span className="poppins-extrabold">ASPHALT</span>
              <br />
              <div className="poppins-medium text-6xl">
                <span className="text-green-600">Smarter</span> Routes,
                <br />
                Greener <span className="text-green-600">Future</span>
              </div>
            </h1>
            <p className="text-xl text-gray-600 animate-fade-in-up">
              Driving change with data: Smarter transport, lower
              <br />
              emissions, lasting impact
            </p>
            <div className="flex space-x-4 mt-8">
              <Link href="/explore">
                <button className="bg-green-600 hover:bg-green-700 text-white poppins-bold tx-xl py-3 px-6 rounded-lg transform transition-all hover:scale-105">
                  Explore Routes
                </button>
              </Link>
              <Link href="/">
                <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white poppins-bold text-xl py-3 px-6 rounded-lg transform transition-all hover:scale-105">
                  About Us
                </button>
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 p-4">
            <div className="relative overflow-hidden rounded-lg transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1465447142348-e9952c393450?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9hZHxlbnwwfHwwfHx8MA%3D%3D"
                alt="Ithaca Commons"
                className="w-full h-[500px] object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </section>

        {/* Container for "Get Started" and Stepper Section */}
        <div className="flex flex-col md:flex-row items-center justify-center px-8 md:px-16 lg:px-24 mt-8 pb-40 bg-white text-black">
          {/* "Get Started" section */}
          <div
            id="get-started"
            className="p-4 text-left md:w-auto flex justify-center"
          >
            <div>
              <img
                className="w-[480px] h-[550px] rounded-lg"
                src="/images/image.png"
              ></img>
              <p
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                className="mt-4"
              ></p>
            </div>
          </div>

          {/* Stepper Section */}
          <section className="w-full md:w-auto ml-16">
            <h1 className="poppins-bold text-center text-[48px] font-bold mb-8">
              Explore Our Road Network
            </h1>
            <div className="relative max-w-4xl mx-auto">
              {/* Vertical Line */}
              <div className="absolute left-[33px] top-[34px] h-[calc(100%-68px)] w-px bg-gray-300"></div>

              {/* Step 1 */}
              <Link href="/">
                <div className="flex items-center mb-8 relative cursor-pointer">
                  {/* Number 1 */}
                  <div className="w-[67px] h-[68px] flex-shrink-0 bg-gray-700 rounded-md flex items-center justify-center text-lg font-semibold">
                    <span className="text-3xl poppins-bold text-white">1</span>
                  </div>

                  {/* Horizontal line to text */}
                  <div className="h-px w-[39px] bg-gray-300 absolute left-[67px] top-1/2 transform -translate-y-1/2"></div>
                  {/* Step content */}
                  <div className="ml-24">
                    <h2 className="poppins-semibold text-3xl hover:text-gray-500 transition-colors duration-300">
                      Visualize
                    </h2>
                    <p className="mt-2 text-xl poppins-medium text-gray-700 transition-colors duration-300">
                      Gain a comprehensive view of the transportation
                      infrastructure in your area.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Step 2 */}
              <Link href="/">
                <div className="flex items-center mb-8 relative cursor-pointer">
                  {/* Number 2 */}
                  <div className="w-[67px] h-[68px] flex-shrink-0 bg-gray-700 rounded-md flex items-center justify-center text-lg font-semibold">
                    <span className="text-3xl poppins-bold text-white">2</span>
                  </div>

                  {/* Horizontal line to text */}
                  <div className="h-px w-[39px] bg-gray-300 absolute left-[67px] top-1/2 transform -translate-y-1/2"></div>

                  {/* Step content */}
                  <div className="ml-24">
                    <h2 className="poppins-semibold text-3xl hover:text-gray-500 transition-colors duration-300">
                      Analyze
                    </h2>
                    <p className="mt-2 text-xl poppins-medium text-gray-700 transition-colors duration-300">
                      Identify bottlenecks, alternative routes, and
                      opportunities for optimization.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Step 3 */}
              <Link href="/">
                <div className="flex items-center mb-8 relative cursor-pointer">
                  {/* Number 3 */}
                  <div className="w-[67px] h-[68px] flex-shrink-0 bg-gray-700 rounded-md flex items-center justify-center text-lg font-semibold">
                    <span className="text-3xl poppins-bold text-white">3</span>
                  </div>

                  {/* Horizontal line to text */}
                  <div className="h-px w-[39px] bg-gray-300 absolute left-[67px] top-1/2 transform -translate-y-1/2"></div>

                  {/* Step content */}
                  <div className="ml-24">
                    <h2 className="poppins-semibold text-3xl hover:text-gray-500 transition-colors duration-300">
                      Optimize
                    </h2>
                    <p className="mt-2 text-xl poppins-medium text-gray-700 transition-colors duration-300">
                      Plan the most efficient, eco-friendly paths for your fleet
                      or personal commute.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </div>

        {/* Eco Section */}
        <section className="eco-section py-8">
          <div className="flex flex-col md:flex-row justify-between max-w-6xl mx-auto px-4 gap-12">
            <div className="bg-white p-6 rounded-xl shadow-[0_0_15px_rgba(0,0,0,.2)] transition-all duration-300 transform hover:-translate-y-2 w-full md:w-1/3">
              <FaChartLine className="text-green-600 text-4xl mb-3 mx-auto" />
              <h2 className="poppins-semibold text-3xl mb-3 text-center text-gray-800">
                Data-Driven
              </h2>
              <p className="text-gray-600 text-center">
                Our platform uses spatial data and operational patterns to
                inform smarter route planning
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-300 transform hover:-translate-y-2 w-full md:w-1/3">
              <FaLeaf className="text-green-600 text-4xl mb-3 mx-auto" />
              <h2 className="poppins-semibold text-3xl mb-3 text-center text-gray-800">
                Sustainable
              </h2>
              <p className="text-gray-600 text-center">
                Our platform minimizes fuel consumption and emissions through
                intelligent routing
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-300 transform hover:-translate-y-2 w-full md:w-1/3">
              <FaCog className="text-green-600 text-4xl mb-3 mx-auto" />
              <h2 className="poppins-semibold text-3xl mb-3 text-center text-gray-800">
                Customizable
              </h2>
              <p className="text-gray-600 text-center">
                Our tools can be tailored to your workflow to ensure seamless
                integration
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(25, 183, 83, 0.3) 0%, rgba(22,163,74,0.2) 30%, rgba(255,255,255,0) 60%)',
              transform: 'scale(1.02)',
              height: '102%',
              top: '-1%',
            }}
          ></div>
          <div className="max-w-4xl mx-auto text-center relative">
            <h2 className="text-5xl poppins-bold mb-4 text-gray-800">
              Start <span className="text-green-600">Optimizing</span> Your
              Routes Today
            </h2>
            <p className="mb-8 text-gray-800">
              Join the growing number of organizations using Asphalt to reduce
              their carbon footprint.
            </p>
            <Link href="/contact">
              <button className="bg-green-600 hover:bg-green-700 text-white poppins-bold py-3 px-8 rounded-2xl text-base transition-colors duration-300">
                Get Started
              </button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 text-gray-600 py-12">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-gray-800 text-lg font-bold mb-4">Asphalt</h3>
              <p className="text-sm">
                Optimizing routes for a sustainable future.
              </p>
            </div>
            <div>
              <h4 className="text-gray-800 font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/explore"
                    className="hover:text-gray-800 transition-colors"
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-gray-800 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-gray-800 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-800 font-semibold mb-4">Contact Us</h4>
              <p className="text-sm">Email: info@asphalt.com</p>
              <div className="mt-4 space-x-4">
                <a href="#" className="hover:text-gray-800 transition-colors">
                  Twitter
                </a>
                <a href="#" className="hover:text-gray-800 transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-gray-800 transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-center">
              © {new Date().getFullYear()} Asphalt. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

// Add these styles to your global.css
/*
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 1s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out;
}
*/
