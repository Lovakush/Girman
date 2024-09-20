import Header from '../components/header.jsx';
import Logo from '../components/logo.jsx';
import SearchBar from '../components/searchbar.jsx'

export default function Home() {
  return (
    <div className='bg-gradient-to-t from-[#B1CBFF] to-[#FFFFFF] h-screen'>
      <Header/>
      <Logo/>
      <SearchBar/>
    </div>
  );
}

//  #FFFFFF
//  #B1CBFF