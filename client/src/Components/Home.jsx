import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate()
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Agri-Tech</h1>
          <nav>
            <a href="#features" className="px-2 text-lg hover:text-green-200">Features</a>
            <a href="#services" className="px-2 text-lg hover:text-green-200">Services</a>
            <a href="#testimonials" className="px-2 text-lg hover:text-green-200">Testimonials</a>
            <a href="#contact" className="px-2 text-lg hover:text-green-200">Contact</a>
            <Link to='/ulogin' className="px-2 text-lg hover:text-green-200">Login</Link>

          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-green-100 text-green-900 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4">Transforming Agriculture with Technology</h2>
          <p className="text-xl mb-8">Revolutionizing agriculture with AI-driven tools to boost yields, reduce costs, and ensure sustainable growth.</p>
          <button onClick={()=>navigate('/ulogin')} className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-500 transition duration-300">
            Explore Now
          </button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-orange-200">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">AI Crop Monitoring</h3>
              <p>Next-gen crop health detection using smart sensors and predictive analytics.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Digital Farm Dashboard</h3>
              <p>Manage your entire farm operations from a single intuitive platform.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Smart Water Systems</h3>
              <p>Automated irrigation that adapts to weather and soil data to maximize efficiency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-green-100 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Agri-Advisory</h3>
              <p>Tailored expert guidance on smart farming methods to boost yield and operational efficiency.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Intelligent Soil Insights</h3>
              <p>Advanced AI-based soil diagnostics to determine the ideal crop and fertilizer mix.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Agri-Market Connect</h3>
              <p>Direct access to trusted buyers and agri-markets for better profits and faster deals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-orange-200">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Hear From Our Farmers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic">"Since adopting AgriTech’s platform, our output has skyrocketed and operations are smoother than ever."</p>
              <h4 className="text-xl font-bold mt-4">- Ravi Kumar, Telangana</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic">"AgriTech’s AI tools help us track field health in real-time. It’s like having a personal agronomist!"</p>
              <h4 className="text-xl font-bold mt-4">- Sumanthi Reddy, Andhra Pradesh</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic">"Our water bills dropped 40% thanks to AgriTech’s automated irrigation – it’s truly revolutionary."</p>
              <h4 className="text-xl font-bold mt-4">- Harish Babu, Karnataka</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic">"We sell directly to buyers now – no middlemen. AgriTech made it fast and fair."</p>
              <h4 className="text-xl font-bold mt-4">- Anita Devi, Bihar</h4>
            </div>
          </div>
        </div>
      </section>
{/* 
      // Contact Form 
      <section id="contact" className="bg-green-100 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <form className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
            <div className="mb-4">
              <label className="block text-left text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md" type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="mb-4">
              <label className="block text-left text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md" type="email" id="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="mb-4">
              <label className="block text-left text-gray-700 font-bold mb-2" htmlFor="message">Message</label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md" id="message" name="message" placeholder="Your Message" rows="4" required></textarea>
            </div>
            <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-500 transition duration-300" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-green-600 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 AgriTech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
