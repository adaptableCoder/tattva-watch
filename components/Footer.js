const Footer = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 py-6 lg:py-8">
          {/* Logo */}
          <div className="order-1 lg:order-none lg:w-1/4">
            <div className="text-xl sm:text-2xl font-bold text-white text-center lg:text-left">
              <span className="text-orange-500">Tattva</span>Watch
            </div>
          </div>

          {/* Navigation Links */}
          <div className="order-3 lg:order-none lg:w-1/2">
            <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 text-sm sm:text-base">
              <a href="#" className="text-white/70 hover:text-orange-500 transition-colors duration-200 hover:scale-105 transform">
                About
              </a>
              <a href="#" className="text-white/70 hover:text-orange-500 transition-colors duration-200 hover:scale-105 transform">
                Privacy
              </a>
              <a href="#" className="text-white/70 hover:text-orange-500 transition-colors duration-200 hover:scale-105 transform">
                Terms
              </a>
              <a href="#" className="text-white/70 hover:text-orange-500 transition-colors duration-200 hover:scale-105 transform">
                Contact
              </a>
            </nav>
          </div>

          {/* Copyright */}
          <div className="order-2 lg:order-none lg:w-1/4">
            <div className="text-white/60 text-xs sm:text-sm text-center lg:text-right">
              © 2025 TattvaWatch
              <span className="hidden sm:inline">. All rights reserved</span>
              <span className="block sm:hidden mt-1">All rights reserved</span>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-white/10 text-center">
          <p className="text-white/60 text-xs sm:text-sm italic py-3 sm:py-4">
            "Where cinema meets consciousness"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
