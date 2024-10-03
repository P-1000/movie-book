import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTheater } from '../../services/theaterService'; 

const AddTheaterComponent = () => {
  const [theaterDetails, setTheaterDetails] = useState({
    name: '',
    location: '',
    facilities: [],
    screens: [{ name: '', capacity: '', facilities: [] }], 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTheaterDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleScreenChange = (index, e) => {
    const { name, value } = e.target;
    const updatedScreens = [...theaterDetails.screens];
    updatedScreens[index][name] = value;
    setTheaterDetails((prev) => ({ ...prev, screens: updatedScreens }));
  };

  const addScreen = () => {
    setTheaterDetails((prev) => ({
      ...prev,
      screens: [...prev.screens, { name: '', capacity: '', facilities: [] }],
    }));
  };

  const handleAddTheater = async (e) => {
    e.preventDefault();
    try {
      await addTheater(theaterDetails); 
      navigate('/a/theaters'); 
    } catch (error) {
      console.error('Failed to add theater:', error);
    }
  };

  return (
    <div className='flex text-white items-center justify-center w-full'>
      <div className="min-h-screen border bg-zinc-900 border-white/60 rounded-2xl w-full px-32 max-w-4xl items-center justify-center p-6">
        <h1 className="text-3xl text-white font-bold mb-6">Add Theater</h1>
        <form onSubmit={handleAddTheater} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Theater Name</label>
            <input
              type="text"
              name="name"
              value={theaterDetails.name}
              onChange={handleChange}
              className="mt-1 p-3 bg-gray-700/50 border rounded-lg w-full"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={theaterDetails.location}
              onChange={handleChange}
              className="mt-1 p-3 bg-gray-700/50 border rounded-lg w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Facilities</label>
            <input
              type="text"
              name="facilities"
              onChange={(e) => setTheaterDetails({ ...theaterDetails, facilities: e.target.value.split(',') })}
              className="mt-1 p-3 bg-gray-700/50 border rounded-lg w-full"
              placeholder="Comma-separated values"
            />
          </div>

          <h2 className="text-2xl font-semibold mt-6">Screens</h2>
          {theaterDetails.screens.map((screen, index) => (
            <div key={index} className="border p-4 rounded-xl mt-4">
              <div>
                <label className="block text-sm font-medium">Screen Name</label>
                <input
                  type="text"
                  name="name"
                  value={screen.name}
                  onChange={(e) => handleScreenChange(index, e)}
                  className="mt-1 p-3 bg-gray-700/50 border rounded-lg w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={screen.capacity}
                  onChange={(e) => handleScreenChange(index, e)}
                  className="mt-1 p-3 bg-gray-700/50 border rounded-lg w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Facilities</label>
                <input
                  type="text"
                  name="facilities"
                  onChange={(e) => {
                    const updatedScreens = [...theaterDetails.screens];
                    updatedScreens[index].facilities = e.target.value.split(',');
                    setTheaterDetails({ ...theaterDetails, screens: updatedScreens });
                  }}
                  className="mt-1 p-3 bg-gray-700/50 border rounded-lg w-full"
                  placeholder="Comma-separated values"
                />
              </div>
            </div>
          ))}
          
          <button type="button" onClick={addScreen} className="mt-4 gap-10 mx-3 bg-blue-600 text-white px-4 py-2 rounded-md">
            Add Screen
          </button>

          <button type="submit" className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md">
            Add Theater
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTheaterComponent;
