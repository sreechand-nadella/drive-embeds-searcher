
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Search, HardDrive, LogOut } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("googleToken");

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: HardDrive,
      current: location.pathname === "/dashboard",
    },
    {
      name: "Search",
      href: "/search",
      icon: Search,
      current: location.pathname === "/search",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("googleToken");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated && (
        <header className="fixed top-0 left-0 right-0 h-16 glass-morphism z-10 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
            >
              <span className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">DriveSearch</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  item.current
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>
      )}
      <main className={`${isAuthenticated ? "pt-20 px-4 sm:px-6 lg:px-8 pb-4" : ""}`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
