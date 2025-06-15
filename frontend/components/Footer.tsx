const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="flex justify-between w-full items-center">
          <p className="mt-6 max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left">
            Voltstore is an e-commerce website designed to provide consumers
            with a reliable online shopping experience with a wide range of
            products at low prices.
          </p>
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900">Contact Us</p>
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a
                  className="flex items-center justify-center gap-1.5 sm:justify-start"
                  href="mailto:contact@voltstore.com"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 shrink-0 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="flex-1 text-gray-700">
                    contact@voltstore.com
                  </span>
                </a>
              </li>

              <li>
                <a
                  className="flex items-center justify-center gap-1.5 sm:justify-start"
                  href="tel:+123456789"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 shrink-0 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="flex-1 text-gray-700">+1 (234) 567-89</span>
                </a>
              </li>

              <li className="flex items-start justify-center gap-1.5 sm:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 shrink-0 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <address className="flex-1 not-italic text-gray-700">
                  213 Lane, London, United Kingdom
                </address>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-100 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-500">All rights reserved.</p>
            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
              &copy; {new Date().getFullYear()} VoltStore, Inc.
            </p>
          </div>

          <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
            {/* Social Media Icons */}
            <li>
              <a
                href="https://facebook.com"
                rel="noreferrer"
                target="_blank"
                className="text-teal-700 transition hover:text-teal-700/75"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {/* Facebook SVG path example */}
                  <path d="M22 12a10 10 0 10-11.5 9.87v-7h-2v-3h2v-2c0-2 1-3 3-3h2v3h-2c-1 0-1 1-1 1v2h3l-1 3h-2v7A10 10 0 0022 12z" />
                </svg>
              </a>
            </li>
            {/* You can add Instagram, Twitter similarly */}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
