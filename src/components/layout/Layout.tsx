
import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle, Menu, X, Cpu, Save, Home, Package, BarChart3, Settings } from "lucide-react";

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Components", path: "/components", icon: <Cpu className="h-5 w-5" /> },
    { name: "Builds", path: "/builds", icon: <Package className="h-5 w-5" /> },
    { name: "Configurator", path: "/configurator", icon: <Settings className="h-5 w-5" /> },
    { name: "Compare", path: "/compare", icon: <BarChart3 className="h-5 w-5" /> },
    { name: "Profile", path: "/profile", icon: <UserCircle className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Cpu className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">PCBuilder</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-1 py-2 px-1 transition-colors hover:text-primary relative ${
                    location.pathname === link.path
                      ? "text-primary font-medium"
                      : "text-foreground/70"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Auth Button (Desktop) */}
            <Link
              to="/auth"
              className="hidden md:flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md transition-colors hover:bg-primary/90"
            >
              <UserCircle className="h-5 w-5" />
              <span>Sign In</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-foreground p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background border-t overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
                      location.pathname === link.path
                        ? "bg-secondary text-primary font-medium"
                        : "text-foreground/70 hover:bg-secondary/50"
                    }`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ))}
                <Link
                  to="/auth"
                  className="flex items-center space-x-3 mt-4 p-3 bg-primary text-primary-foreground rounded-md"
                >
                  <UserCircle className="h-5 w-5" />
                  <span>Sign In</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 pt-20 mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto px-4 py-6"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Cpu className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">PCBuilder</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Build your perfect PC with our easy-to-use configurator tool. Compare components,
                save builds, and make informed decisions.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Contact Us</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Have questions about PC building or our service?
              </p>
              <a
                href="mailto:contact@pcbuilder.com"
                className="text-sm text-primary hover:underline"
              >
                contact@pcbuilder.com
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-center text-muted-foreground">
              © {new Date().getFullYear()} PCBuilder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
