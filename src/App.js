import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import Auth from './components/Auth';
import Playground from './pages/Playground';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastProvider } from "./components/ui/toast";
// import { Toaster } from "./components/ui/toaster";
import { Button } from './components/ui/button';
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

  return (
    <Router>
      <ToastProvider>
        <div className="min-h-screen bg-background">
          {/* Navbar */}
          {user && (
            <nav className="border-b px-4 py-3">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-lg font-semibold">
                  Mi App
                </Link>
                <div className="flex items-center gap-4">
                  <Link to="/playground">
                    <Button variant="outline">Playground</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => auth.signOut()}
                  >
                    Cerrar Sesión
                  </Button>
                </div>
              </div>
            </nav>
          )}

          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <div className="p-8">
                    <Home></Home>
                  </div>
                ) : (
                  <Auth />
                )
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
            {/* Ruta para manejar URLs no encontradas */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        {/* <Toaster /> */}
      </ToastProvider>
    </Router>
  );
}

export default App;