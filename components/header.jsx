import React from 'react';
import logo from '../public/logo2.svg'
import Image from 'next/image'


function connect(){
  window.open("https://mail.google.com/mail/u/0/#inbox/FMfcgzQVzXgdMnRTQcZNwngdxZxQLjvh?compose=GTvVlcSHwsJSnpDCjsgFqFlDNfmqkvZKfmVPMpRkKFMWFnKrzmVHXZbMttVbPpdPdfnnljFnDsvjw&projector=1&messagePartId=0.1", '_blank');
}

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
            <button onClick={connect}className="text-black font-medium hover:underline">CONTACT</button>
          </ul>
        </nav>
      </div>
    </header>
  );
};


export default Header;