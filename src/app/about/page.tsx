import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white m-0">
      <Navbar />
      <div className="max-w-full mx-auto">
        {/* Section 1 */}
        <section className="flex flex-col md:flex-row justify-center p-[49px] pt-[97px]">
          <div className="w-full md:w-1/2">
            <h1 className="poppins-bold text-5xl text-gray-900">
              Lorem
              <div className="asphalt-green pt-[5px]">Lorem Ipsum</div>
            </h1>
            <p className="poppins-regular text-xl text-gray-700 pr-[90px] pt-[30px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. <br />
              <br />
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa.
            </p>
          </div>

          <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
            <img
              src="/images/temp_image1.png"
              alt="Temporary Image"
              className="max-w-full h-auto"
            />
          </div>
        </section>

        {/* Section 2 */}
        <section className="flex flex-col md:flex-row justify-center p-[49px] pt-[97px]">
          <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
            <img
              src="/images/temp_image2.png"
              alt="Temporary Image"
              className="max-w-full h-auto"
            />
          </div>

          <div className="w-full md:w-1/2 p-[49px]">
            <h1 className="poppins-bold text-5xl text-gray-900">
              Lorem <span className="asphalt-green">Ipsum</span> Dolor
            </h1>
            <p className="poppins-regular text-xl text-gray-700 pt-[30px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. <br />
              <br />
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default AboutPage;
