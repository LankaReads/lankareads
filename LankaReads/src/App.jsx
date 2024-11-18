import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Books from './pages/books/Books';
import Contact from './pages/contact/Contact';
import Authors from './pages/authors/Authors';
import Blogs from './pages/Blogs/Blogs';
import Register from './pages/Register/Register';
import Payment from './pages/payment/Payment';
import OpenPage from './pages/OpenPage/OpenPage';
import Delivery from './pages/delivery/Delivery';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';
import OpenCartSelection from './pages/OpenCartSelection/OpenCartSelection';
import MultipleDelivery from './pages/multipleDelivery/MultipleDelivery';
import BookDoc from './pages/BookDoc/BookDoc';
import MultipleBookDoc from './pages/multipleBookDoc/MultipleBookDoc';  
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import AdminBooks from './pages/AdminBooks/AdminBooks';
import AdminDelivery from './pages/AdminDelivery/AdminDelivery';
import AdminSubscription from './pages/AdminSubscription/AdminSubscription';
import AdminUsers from './pages/AdminUsers/AdminUsers';
import AdminBlogs from './pages/AdminBlogs/AdminBlog';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function App() {
  const navigate = useNavigate(); // useNavigate hook

  return (
    <ThemeProvider>
      <CartProvider>
        <div className='app-container'>
          <Routes>
            <Route path="/" element={<Home navigate={navigate} />} />
            <Route path="/home" element={<Home navigate={navigate} />} />
            <Route path="/about" element={<About navigate={navigate} />} />
            <Route path="/books" element={<Books navigate={navigate} />} />
            <Route path="/contact" element={<Contact navigate={navigate} />} />
            <Route path="/authors" element={<Authors navigate={navigate} />} />
            <Route path="/blogs" element={<Blogs navigate={navigate} />} />
            <Route path="/register" element={<Register navigate={navigate} />} />
            <Route path="/openpage/:bookId" element={<OpenPage navigate={navigate} />} />
            <Route path="/opencartselection/:bookId" element={<OpenCartSelection navigate={navigate}/>} />
            <Route path="/payment" element={<Payment navigate={navigate} />} />
            <Route path="/bookdoc" element={<BookDoc navigate={navigate} />} />
            <Route path="/multiplebookdoc" element={<MultipleBookDoc navigate={navigate} />} /> {/* New route */}
            <Route path="/delivery" element={<Delivery navigate={navigate} />} />
            <Route path="/multipledelivery" element={<MultipleDelivery navigate={navigate} />} />
            <Route path="/admindashboard" element={<AdminDashboard navigate={navigate} />} />
            <Route path="/adminbooks" element={<AdminBooks navigate={navigate} />} />
            <Route path="/admindelivery" element={<AdminDelivery navigate={navigate} />} />
            <Route path="/adminsubscription" element={<AdminSubscription navigate={navigate} />} />
            <Route path="/adminusers" element={<AdminUsers navigate={navigate} />} />
            <Route path="/adminblogs" element={<AdminBlogs navigate={navigate} />} />
            <Route path="*" element={<div>Page Not Found</div>} /> {/* Catch-all route */}
          </Routes>
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
