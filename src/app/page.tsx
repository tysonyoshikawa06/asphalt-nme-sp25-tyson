import Image from 'next/image';
import Navbar from './components/Navbar';
import Link from 'next/link';
import Explore from './explore/page';
export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-full mx-auto  text-white">
        {/* Flex layout for larger text and image side-by-side */}
        <section className="mb-24 flex flex-col p-8 md:flex-row items-center bg-gradient-to-b from-gray-800 to-green-900">
          {/* Left side with much larger text */}
          <div className="md:w-1/2 p-4 text-left">
            <h1 className="text-7xl font-bold mb-8">
              Asphalt: Optimizing Routes, Minimizing Emissions
            </h1>
            <p style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Experience the future of sustainable transportation with our
              cutting-edge GIS-powered route planning solutions.
            </p>
            {/* Buttons below the text */}
            <div className="flex space-x-4 mt-4">
              <Link href="/explore">
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Explore Routes
                </button>
              </Link>
              <Link href="/">
                <button className="border border-white text-white font-bold py-2 px-4 rounded">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>

          {/* Right side with a larger image */}
          <div className="md:w-1/2 p-4">
            <img
              src="https://images.unsplash.com/photo-1465447142348-e9952c393450?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9hZHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Ithaca Commons"
              className="w-full h-[500px] rounded-md shadow-lg"
            />
          </div>
        </section>
        <section className="eco-section py-10 bg-white text-gray-900">
          <h2 className="text-center text-3xl font-bold mb-8">
            Using GIS for Eco-Friendly Paths
          </h2>
          <div className="flex justify-around space-x-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="font-semibold text-3xl mb-2">Real-Time Data</h2>
              <p>
                Our GIS platform integrates live traffic, weather, and
                infrastructure data to plan the most efficient routes.
              </p>
            </div>
            <div className="text-center">
              <h2 className="font-semibold text-3xl mb-2">
                Emissions Reduction
              </h2>
              <p>
                By optimizing routes, we help minimize fuel consumption and
                greenhouse gas emissions for a sustainable future.
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-semibold mb-2">Customizable </h2>
              <p>
                Tailor our route planning tools to your unique needs and
                preferences for maximum impact.
              </p>
            </div>
          </div>
        </section>

        {/* <div className="explore-section py-16">
          <h2 className="text-center text-3xl font-bold mb-8">Explore Our Road Network</h2>
          <div className="flex items-center justify-around max-w-4xl mx-auto">
            <div>
              <ol className="list-decimal pl-5 text-lg">
                <li><strong>Visualize:</strong> Gain a comprehensive view of the transportation infrastructure in your area.</li>
                <li><strong>Analyze:</strong> Identify bottlenecks, alternative routes, and opportunities for optimization.</li>
                <li><strong>Optimize:</strong> Plan the most efficient, eco-friendly paths for your fleet or personal commute.</li>
              </ol>
            </div>
            <div>
              <Image src="/map-image.png" alt="Map Visualization" width={300} height={400} />
            </div>
          </div>
        </div> */}
        {/* Container for "Get Started" and Stepper Section */}
        <div className="flex flex-col md:flex-row items-center justify-center mt-20 pb-40 bg-white text-black">
          {/* "Get Started" section */}
          <div
            id="get-started"
            className="p-4 text-left md:w-auto flex justify-center"
          >
            <div>
              <img className="h-[500px]" src="/images/image.png"></img>
              <p
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                className="mt-4"
              ></p>
            </div>
          </div>

          {/* Stepper Section */}
          <section className="w-full md:w-auto ml-16">
            <h1 className="text-center text-4xl font-bold mb-8">
              Explore Our Road Network
            </h1>
            <div className="relative max-w-4xl mx-auto">
              {/* Vertical Line */}
              <div className="absolute left-5 top-0 h-full w-px bg-gray-300"></div>

              {/* Step 1 */}
              <Link href="/">
                <div className="flex items-center mb-8 relative cursor-pointer">
                  {/* Number 1 */}
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-700 text-white rounded-md flex items-center justify-center text-lg font-semibold">
                    1
                  </div>

                  {/* Horizontal line to text */}
                  <div className="h-px w-16 bg-gray-300 absolute left-10 top-1/2 transform -translate-y-1/2"></div>

                  {/* Step content */}
                  <div className="ml-24">
                    <h2 className="text-3xl font-bold hover:text-gray-500 transition-colors duration-300">
                      Visualize
                    </h2>
                    <p
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                      className="mt-2 text-gray-700 transition-colors duration-300"
                    >
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
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-700 text-white rounded-md flex items-center justify-center text-lg font-semibold">
                    2
                  </div>

                  {/* Horizontal line to text */}
                  <div className="h-px w-16 bg-gray-300 absolute left-10 top-1/2 transform -translate-y-1/2"></div>

                  {/* Step content */}
                  <div className="ml-24">
                    <h2 className="text-3xl font-bold hover:text-gray-500 transition-colors duration-300">
                      Analyze
                    </h2>
                    <p
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                      className="mt-2 text-gray-700 transition-colors duration-300"
                    >
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
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-700 text-white rounded-md flex items-center justify-center text-lg font-semibold">
                    3
                  </div>

                  {/* Horizontal line to text */}
                  <div className="h-px w-16 bg-gray-300 absolute left-10 top-1/2 transform -translate-y-1/2"></div>

                  {/* Step content */}
                  <div className="ml-24">
                    <h2 className="text-3xl font-bold hover:text-gray-500 transition-colors duration-300">
                      Optimize
                    </h2>
                    <p
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                      className="mt-2 text-gray-700 transition-colors duration-300"
                    >
                      Plan the most efficient, eco-friendly paths for your fleet
                      or personal commute.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </div>
        {/* Contact Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-8">
              Ready to Optimize Your Routes?
            </h2>
            <p className="mb-8 text-lg">
              Join several other organizations already using Asphalt to reduce
              their carbon footprint.
            </p>
            <Link href="/contact">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300">
                Get Started Today
              </button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-12">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-white text-lg font-bold mb-4">Asphalt</h3>
              <p className="text-sm">
                Optimizing routes for a sustainable future.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/explore"
                    className="hover:text-white transition-colors"
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <p className="text-sm">Email: info@asphalt.com</p>
              <div className="mt-4 space-x-4">
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-gray-700">
            <p className="text-sm text-center">
              © {new Date().getFullYear()} Asphalt. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
