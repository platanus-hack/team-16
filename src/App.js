import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import Auth from './components/Auth';
import Playground from './pages/Playground';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastProvider } from "./components/ui/toast";
import { Button } from './components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar";
import Home from './pages/Home';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Función para obtener las iniciales del nombre
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Router>
      <ToastProvider>
        <div className="min-h-screen bg-background">
          {/* Navbar */}
          <nav className="border-b px-4 py-3">
            <div className="mx-auto flex justify-between items-center">


                <Link to="/" className="text-lg font-semibold flex justify-center items-center">
                  <img
                    className="dark:invert  mr-2"
                    src="/LOGO.png"
                    alt="Scrapester logo"
                    width={40}
                    height={30}
                  />
                  Scrapester
                </Link>

              <div className="flex items-center gap-4">
                {user ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="relative h-10 w-10 rounded-full"
                        >
                          <Avatar className="h-10 w-10 border border-black">
                            <AvatarImage 
                              src={user.photoURL} 
                              alt={user.displayName || "Usuario"} 
                            />
                            <AvatarFallback>
                              {getInitials(user.displayName)}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="flex items-center justify-start gap-2 p-2">
                          <div className="flex flex-col space-y-1 leading-none">
                            {user.displayName && (
                              <p className="font-medium">{user.displayName}</p>
                            )}
                            <p className="w-[200px] truncate text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/playground" className="w-full cursor-pointer">
                            Playground
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                        <a 
                          href="https://docs.scrapester.lol/quickstart" 
                          className="w-full cursor-pointer"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Docs
                        </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600 cursor-pointer"
                          onClick={() => auth.signOut()}
                        >
                          Cerrar Sesión
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <Link to="/login">
                    <Button variant="default" className="gap-2">
                      <svg 
                        className="h-5 w-5" 
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" 
                          fill="#4285F4"
                        />
                        <path 
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" 
                          fill="#34A853"
                        />
                        <path 
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" 
                          fill="#FBBC05"
                        />
                        <path 
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" 
                          fill="#EA4335"
                        />
                      </svg>
                      Iniciar Sesión
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </nav>

          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/login"
              element={
                user ? <Navigate to="/playground" replace /> : <Auth />
              }
            />

            <Route
              path="/playground"
              element={
                <ProtectedRoute user={user} loading={loading}>
                  <Playground />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </ToastProvider>
    </Router>
  );
}

export default App;