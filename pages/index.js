import Header from '../components/header.jsx';
import Logo from '../components/logo.jsx';
import SearchBar from '../components/searchbar.jsx';

export default function Home() {
  return (
    <div className='bg-gradient-to-t from-[#B1CBFF] to-[#FFFFFF] min-h-screen h-auto'>
      <Header />
      <Logo />
      <div className="container mx-auto px-4">
        <SearchBar />
      </div>
    </div>
  );
}
