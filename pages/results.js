import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import NOTFOUND from '../public/404.png';
import logo from '../public/logo2.svg';
const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};

const SearchHeader = ({ onSearchChange, initialValue = '' }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchChange(inputValue);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 flex items-center justify-between border-b">
      <a href='/'>
        <Image src={logo} alt="Girman" width={150} height={50} />
      </a>
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-200 bg-white focus:bg-white focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

const getRandomColor = () => {
	const colors = [
		'bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400',
		'bg-purple-400', 'bg-pink-400', 'bg-indigo-400', 'bg-teal-400'
	];
	return colors[Math.floor(Math.random() * colors.length)];
};


const UserCard = ({ user }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const avatarColor = useMemo(() => getRandomColor(), [user.id]);

  return (
    <Card className="w-full max-w-sm mx-auto bg-white rounded-lg overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-16 h-16 rounded-full overflow-hidden ${avatarColor}`}>
            {user.avatar ? (
              <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white">
                {user.first_name[0]}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold">{`${user.first_name} ${user.last_name}`}</h3>
            <p className="text-gray-500 flex items-center mt-1">
              <MapPin size={16} className="mr-1" /> {user.city || 'Mumbai'}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700 flex items-center">
              <Phone size={16} className="mr-2" /> {user.contact_number ? "+91-" + user.contact_number : "+919876543210"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Available on phone</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-black text-white hover:bg-gray-800">
                Fetch Details
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>User Details</DialogTitle>
                <DialogDescription>
                  Here are the details of the selected person.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-24 h-24 rounded-full overflow-hidden ${avatarColor}`}>
                    {user.avatar ? (
                      <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white">
                        {user.first_name[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{`${user.first_name} ${user.last_name}`}</h3>
                    <p className="text-gray-500 flex items-center mt-1">
                      <MapPin size={16} className="mr-1" /> {user.city || 'Mumbai'}
                    </p>
                  </div>
                </div>
                <p className="mb-2"><strong>Contact Number:</strong> {user.contact_number ? "+91-" + user.contact_number : "+919876543210"}</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};


const Results = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (router.isReady) {
      const { q } = router.query;
      if (q) {
        setSearchTerm(decodeURIComponent(q));
      }
    }
  }, [router.isReady, router.query]);

	useEffect(() => {
		const fetchUsers = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(`https://girman-bdt4.onrender.com/user?search=${debouncedSearchTerm}`);
				if (response.ok) {
					const data = await response.json();
	
					if (data.message === "No users found") {
						setUsers([]); 
					} else {
						setUsers(data);
					}
				} else {
					setUsers([]);
					console.error('Failed to fetch users');
				}
			} catch (error) {
				console.error('Error fetching users:', error);
			} finally {
				setIsLoading(false);
			}
		};
	
		if (debouncedSearchTerm) {
			fetchUsers();
		} else {
			setUsers([]);
			setIsLoading(false);
		}
	}, [debouncedSearchTerm]);
	

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
    router.push(`/results?q=${encodeURIComponent(value)}`, undefined, { shallow: true });
  }, [router]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (users.length === 0 && debouncedSearchTerm) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-[#B1CBFF] to-[#FFFFFF]">
        <SearchHeader onSearchChange={handleSearchChange} initialValue={searchTerm} />
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center h-[calc(100vh-100px)]">
          <div className=" p-8 rounded-lg text-center">
            <Image src={NOTFOUND} width={200} height={200} alt="No results" className="mx-auto mb-4" />
            <p className="text-xl font-semibold mb-2">No results found.</p>
            <p className="text-gray-600">Try adjusting your search to find what you're looking for.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#B1CBFF] to-[#FFFFFF]">
      <SearchHeader onSearchChange={handleSearchChange} initialValue={searchTerm} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;