import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Grid Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-center md:text-left">

          {/* LEFT SECTION */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Recipe<span className="text-green-500">Garage</span>
            </h2>

            <p className="mt-3 text-sm text-slate-400 max-w-sm leading-relaxed">
              RecipeGarage is a platform where food lovers can discover,
              share, and explore delicious recipes from around the world.
              Cook, create, and inspire others with your unique dishes.
            </p>
          </div>

          {/* MIDDLE SECTION */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-6 text-white">
              Contact
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-green-500" />
                <a
                  href="mailto:maheshgite2811@gmail.com"
                  className="hover:underline hover:text-white"
                >
                  maheshgite2811@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-3 text-white">
              Connect
            </h3>

            <div className="flex gap-4">

              <a
                href="https://github.com/Mahesh-Gite-28"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-slate-800 hover:bg-green-500 hover:text-black transition"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/mahesh-gite"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-slate-800 hover:bg-green-500 hover:text-black transition"
              >
                <FaLinkedin size={18} />
              </a>

            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 text-center md:text-left">
          <p>© {new Date().getFullYear()} RecipeGarage. All rights reserved.</p>

          <p>
            Built by{" "}
            <span className="font-medium text-white">
              Mahesh Gite
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;