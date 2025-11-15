import React, { useState } from 'react';

import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import CreateEditPostPage from './pages/CreateEditPost.jsx';
import PostDetailPage from './pages/PostDetailPage.jsx';
import UserProfilePage from'./pages/UserProfile.jsx';


// ⬇️ ADD THIS IMPORT
import { Toaster } from 'react-hot-toast';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            setSelectedPost={setSelectedPost}
            searchQuery={searchQuery}
          />
        );
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'register':
        return <RegisterPage setCurrentPage={setCurrentPage} />;
      case 'create':
        return <CreateEditPostPage setCurrentPage={setCurrentPage} />;
      case 'edit':
        return (
          <CreateEditPostPage
            setCurrentPage={setCurrentPage}
            editPost={selectedPost}
          />
        );
      case 'postDetail':
        return (
          <PostDetailPage
            post={selectedPost}
            setCurrentPage={setCurrentPage}
            setSelectedPost={setSelectedPost}
          />
        );
      case 'profile':
        return (
          <UserProfilePage
            setCurrentPage={setCurrentPage}
            setSelectedPost={setSelectedPost}
          />
        );
      default:
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            setSelectedPost={setSelectedPost}
            searchQuery={searchQuery}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        {/* ✅ Toaster added here at root level */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />

        <div className="min-h-screen">
          <Navbar
            onSearch={handleSearch}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          {renderPage()}

          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
