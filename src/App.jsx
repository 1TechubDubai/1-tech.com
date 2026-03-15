import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx'; // Ensure this points to your Services.jsx file
import Contact from './pages/Contact.jsx';
import GeminiChatbot from './components/GeminiChatBot.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
import DigitalTransformation from './pages/Advisory.jsx';
import BlogsMain from './pages/BlogsMain.jsx';
import BlogPage from './pages/BlogPage.jsx';
import ClientPortfolio from './pages/ClientPortfolio.jsx';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

function App() {
  // useEffect(()=>{
  //   console.log("Gemini API Key:", apiKey);
  // },[])
  return (
    <BrowserRouter>
      <GeminiChatbot apiKey={apiKey} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/advisory' element={<DigitalTransformation/>} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/client-success-stories' element={<ClientPortfolio />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
        <Route path='/terms-of-service' element={<TermsOfService/>} />
        <Route path='/blogs' element={<BlogsMain/>} />
        <Route path='/blogs/:id' element={<BlogPage/>} />
        {/* Catch-all route: redirect any invalid route to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;