import { useState, useEffect } from 'react';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import Auth from './components/Auth';
import { ToastProvider } from "./components/ui/toast";
// import { Toaster } from "./components/ui/toaster";

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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        {user ? (
          <div className="p-8">
            <h1 className="text-2xl font-bold">Bienvenido, {user.email}</h1>
            <button
              onClick={() => auth.signOut()}
              className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <Auth />
        )}
      </div>
      {/* <Toaster /> */}
    </ToastProvider>
  );
}

export default App;