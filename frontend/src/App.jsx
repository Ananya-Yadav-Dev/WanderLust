import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { FlashProvider } from './contexts/FlashContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FlashMessage from './components/common/FlashMessage';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './pages/Home';
import ListingDetails from './pages/ListingDetails';
import NewListing from './pages/NewListing';
import EditListing from './pages/EditListing';
import CategoryPage from './pages/CategoryPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FlashProvider>
          <BrowserRouter>
            <Navbar />
            <div className="container">
              <FlashMessage />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listings" element={<Navigate to="/" replace />} />
                <Route path="/listings/:id" element={<ListingDetails />} />
                <Route path="/listings/category/:category" element={<CategoryPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/listings/new" element={<NewListing />} />
                  <Route path="/listings/:id/edit" element={<EditListing />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </FlashProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App
