import React from 'react';
import logo from '../public/logo2.svg'
import Image from 'next/image'

const Header = () => {
  return (
    <header>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between border-white-600">
        <div>
          <Image 
            src={logo}
            alt="Girman Technologies" 
          />
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-blue font-medium underline">SEARCH</a></li>
            <li><a href="https://www.girmantech.com" className="text-black font-medium hover:underline">WEBSITE</a></li>
            <li><a href="https://www.linkedin.com/company/girmantech/" className="text-black font-medium hover:underline">LINKEDIN</a></li>
            <li><a href="mailto:contact@girmantech.com" className="text-black font-medium hover:underline">CONTACT</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};


export default Header;