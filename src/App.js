import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import Auth from './components/Auth';
import Playground from './pages/Playground';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastProvider } from "./components/ui/toast";
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
          {/* Navbar - Ahora siempre visible */}
          <nav className="border-b px-4 py-3">
            <div className=" mx-auto flex justify-between items-center">
              <Link to="/" className="text-lg font-semibold">
                Scrapester
              </Link>
              <div className="flex items-center gap-4">
                {user ? (
                  <>
                    <Link to="/playground">
                      <Button variant="outline">Playground</Button>
                    </Link>
                    <Button
                      variant="destructive"
                      onClick={() => auth.signOut()}
                    >
                      Cerrar Sesión
                    </Button>
                  </>
                ) : (
                  <Link to="/login">
                    <Button variant="default">Iniciar Sesión</Button>
                  </Link>
                )}
              </div>
            </div>
          </nav>

          {/* Routes */}
          <Routes>
            {/* Ruta principal - Muestra Home para todos */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* Ruta de login */}
            <Route
              path="/login"
              element={
                user ? <Navigate to="/playground" replace /> : <Auth />
              }
            />

            {/* Ruta protegida del playground */}
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
      </ToastProvider>
    </Router>
  );
}

export default App;