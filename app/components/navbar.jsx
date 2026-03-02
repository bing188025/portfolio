// @flow strict
import Link from "next/link";


function Navbar() {
  return (
    <nav className="navbar-glass sticky top-0 z-50">
      <div className="flex items-center justify-between py-4 px-2">
        <div className="flex flex-shrink-0 items-center">
          <Link href="/" className="navbar-logo text-2xl md:text-3xl font-extrabold tracking-tight">
            KENZAN UMEZAKI
          </Link>
        </div>

        <ul className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100" id="navbar-default">
          {[
            { label: "ABOUT", href: "/#about" },
            { label: "EXPERIENCE", href: "/#experience" },
            { label: "SKILLS", href: "/#skills" },
            { label: "EDUCATION", href: "/#education" },
            { label: "BLOGS", href: "/blog" },
            { label: "PROJECTS", href: "/#projects" },
          ].map((item) => (
            <li key={item.label}>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href={item.href}
              >
                <span className="navbar-link text-sm font-semibold tracking-wider">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Animated gradient bottom border */}
      <div className="navbar-border-glow"></div>
    </nav>
  );
};

export default Navbar;
