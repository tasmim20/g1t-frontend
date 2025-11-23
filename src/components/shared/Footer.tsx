import Image from "next/image";
import logo from "../../../public/assets/LogoName.png";

const Footer = () => {
  return (
    <footer className="bg-[#e6fdeb] border-t border-gray-200 pt-10 pb-6 mt-10">
      <div className="container mx-auto px-4">
        {/* Upper Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo / Brand */}
          <div className="flex flex-col items-start text-center sm:text-left">
            <Image src={logo} alt="Logo" width={100} />
            <p className=" text-gray-700 text-sm">
              Empowering your journey with reliable solutions and innovative
              services.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-gray-900 font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                <a
                  href="#home"
                  className="hover:text-gray-900 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-gray-900 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-gray-900 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-gray-900 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h4 className="text-gray-900 font-semibold mb-3">Contact Us</h4>
            <p className="text-gray-700 text-sm">123 Business Street</p>
            <p className="text-gray-700 text-sm">City, State, ZIP</p>
            <p className="text-gray-700 text-sm">Email: info@green1taxi.ch</p>
            <p className="text-gray-700 text-sm">Phone: +1 234 567 890</p>
          </div>

          {/* Social Media */}
          <div className="text-center sm:text-left">
            <h4 className="text-gray-900 font-semibold mb-3">Follow Us</h4>
            <div className="flex justify-center sm:justify-start gap-4 text-2xl">
              <a
                href="https://green1taxi.ch"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Website"
              >
                🌐
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Twitter"
              >
                🐦
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Facebook"
              >
                📘
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="LinkedIn"
              >
                🔗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-300 pt-4 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} green1taxi. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
