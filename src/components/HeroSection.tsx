// components/HeroSection.tsx
import Image from "next/image";
import car from "../../public/assets/car.png";

const HeroSection = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div
        className="w-full max-w-6xl flex flex-col md:flex-row items-center 
        justify-center md:justify-between gap-10 md:gap-16"
      >
        {/* Left Section - Form */}
        <div
          className="w-full md:w-1/2 flex flex-col justify-center space-y-4 
            text-center md:text-left"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-black">
            Your ride, just a tap away
          </h1>

          <div className="space-y-4 w-full max-w-sm mx-auto md:mx-0">
            {/* Pickup Now */}
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="text-lg font-semibold">Pickup now</span>
              <select className="p-2 border rounded-md text-sm">
                <option value="pickupNow">Pickup now</option>
                <option value="forMe">For me</option>
              </select>
            </div>

            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-medium">
                Pickup location
              </label>
              <input
                type="text"
                placeholder="Enter pickup location"
                className="w-full p-2 mt-1 border rounded-md text-sm"
              />
            </div>

            {/* Dropoff Location */}
            <div>
              <label className="block text-sm font-medium">
                Dropoff location
              </label>
              <input
                type="text"
                placeholder="Enter dropoff location"
                className="w-full p-2 mt-1 border rounded-md text-sm"
              />
            </div>

            <button className="w-full bg-[#54b0ba] text-white py-2 rounded-md mt-4 text-sm">
              See prices
            </button>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            alt="car"
            width={500}
            height={500}
            src={car}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
