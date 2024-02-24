import React, { useEffect, useState } from 'react';
import Select from 'react-select';



const SignupModal = ({ onClose }) => {





  const [step, setStep] = useState(1);
  const totalSteps = 7;

  const nextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne nextStep={nextStep} />;
      case 2:
        return <StepTwo nextStep={nextStep} />;
      // Add cases for other steps as needed
      default:
        return null;
    }
  };


  return (
    <div className="absolute py-4 mt-8 top-0 left-0 w-full flex items-center justify-center bg-transparent bg-opacity-80 px-4  ">
<div className="backdrop-blur-lg bg-white bg-opacity-5 border-gray-600 w-[1150px] p-8 rounded shadow-lg px-4">
        <div className='flex justify-center text-white border-b-2 '>
          <h2 className="text-2xl font-bold mb-4"> Welcome Step {step}/{totalSteps}</h2>

        </div>
        {renderStep()}
        {step !== totalSteps ? (
          <div className="flex justify-center space-x-4 0 mt-10">
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 duration-300 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              Cancel
            </button>
            <button
              onClick={nextStep}
              className="bg-[#3772ff] hover:bg-[#5e3894] duration-300 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-2"
            >
              Continue
            </button>

          </div>
        ) : (
          <>

            <div className='flex justify-center mt-10'>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const languages = [
  { value: 'EN', label: 'English' },
  { value: 'FR', label: 'French' },
  { value: 'GR', label: 'Germen' },
];

const gender = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'division', label: 'Division' },
];

const division = [
  { value: 'photographer', label: 'Photographer' },
  { value: 'model', label: 'Model' },
  { value: 'designer', label: 'Designer' },
  { value: 'makeup', label: 'Makeup Artist' },

  { value: 'stylist', label: 'Stylist' },

];

const city = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },


];





const StepOne = ({ nextStep }) => {



  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setImage(imageUrl);
    setFile(selectedImage);
  };

  const handleImageUpload = () => {
    console.log('Uploading image...');
  };

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      const formattedCountries = data.map(country => ({
        label: country.name.common,
        value: country.cca2,
      }));
      setCountries(formattedCountries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleCountryChange = selectedOption => {
    setSelectedCountry(selectedOption);
  };
  const fetchCities = async (countryCode) => {
    if (!countryCode) return; // Exit if no country code is provided

    try {
      // Fetch cities for the selected country
      const response = await fetch(`YOUR_CITY_API_ENDPOINT?countryCode=${countryCode}`);
      const data = await response.json();
      setCities(data); // Assuming data is an array of cities
    } catch (error) {
      console.error(`Error fetching cities for ${countryCode}:`, error);
      // Optionally, you can set cities to an empty array or handle the error differently
    }
  };


  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };


  const [selectedOption, setSelectedOption] = useState(null);
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent', // Set background transparent
      borderBottom: '2px solid #fff', // Initially set border bottom transparent
      borderColor: 'transparent', // Set other borders transparent
      paddingRight: '2px', // Add padding-right
      borderRadius: '0px', // Remove border radius
      '&:hover': {
        borderBottomColor: '#fff', // Adjust border bottom color on hover
      },
      '&:focus-within': {
        borderBottomColor: 'transparent', // Remove focus border color
      },
    }),
    
    
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3772ff' : '#333',
      '&:hover': {
        backgroundColor: 'rgba(18, 53, 255, 0.24)', // Light purple with opacity
      },
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#fff', // Adjust text color to white
    }),
    input: (provided, state) => ({
      ...provided,
      color: '#fff', // Adjust input text color to white
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#333',
      color: '#fff' // Adjust dropdown menu background color
    }),
  };


  return (
    <div className='grid grid-cols-12 gap-4 mt-5 '>
      <div className='col-span-12 md:col-span-6 w-full'>


        <div className='relative py-2 px-2'>
          <label htmlFor="language" className="block text-md font-medium text-white">Select Language:</label>

          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={languages}
            styles={customStyles} 
            placeholder="" 
          />


        </div>




        <div className='py-1 px-2'>
          <label htmlFor="language" className="block text-md font-medium text-white">Email</label>

          <input
            type="email"
            className="w-full bg-transparent border-b-2 text-white    py-2 px-4  focus:outline-none focus:border-white"
            required
          />
        </div>


        <div className='py-1 px-2'>
          <label htmlFor="language" className="block text-md font-medium text-white">Stage name</label>

          <input
            type="text"
            className="w-full bg-transparent border-b-2 text-white    py-2 px-4  focus:outline-none focus:border-white"
            required
          />
        </div>


        <div className='py-1 px-2'>
          <label htmlFor="language" className="block text-md font-medium text-white">First name</label>

          <input
            type="text"
            className="w-full bg-transparent border-b-2 text-white    py-2 px-4  focus:outline-none focus:border-white"
            required
          />
        </div>


        <div className='py-1 px-2'>
          <label htmlFor="language" className="block text-md font-medium text-white">Last name</label>

          <input
            type="text"
            className="w-full bg-transparent border-b-2 text-white    py-2 px-4  focus:outline-none focus:border-white"
          />
        </div>

        <div className='py-1 px-2'>
          <label htmlFor="language" className="block text-md font-medium text-white">Birthday</label>

          <input
            type="date"
            className="w-full bg-transparent border-b-2 text-white    py-2 px-4  focus:outline-none focus:border-white"
            style={{ color: 'white' }} // Set text color to white
          />

          {/* Style the date picker icon */}
          <style>
            {`
          /* Target the date picker icon */
          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1); // Invert the color of the icon to white
          }
        `}
          </style>
        </div>


        <div className='py-1 px-2 relative'>
          <label htmlFor="gender" className="block text-md font-medium text-white">Gender</label>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={gender}
            styles={customStyles} 
            placeholder="" // Apply custom styles here
          />
        
        </div>


        <div className='py-1 px-2'>
          <label htmlFor="language" className="block text-md font-medium text-white">Do you have a coupon code?</label>

          <input
            type="text"
            className="w-full bg-transparent border-b-2 text-white    py-2 px-4  focus:outline-none focus:border-white"
          />
        </div>



      </div>


      <div className='col-span-12 flex items-center justify-center md:col-span-6 w-full'>




        <div className='w-full'>
          <div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="relative">
                    <img
                      src={image || 'https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78='}
                      alt="Large avatar"
                      className="w-20 h-20 border-2 border-[#3772ff] rounded-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0">
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />

                    </div>
                  </div>
                </label>

              </div>
            </div>

          </div>

          <div className=' relative py-2 px-2'>
            <label htmlFor="language" className="block text-md font-medium text-white">Division</label>


            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={division}
              styles={customStyles} 
              placeholder="" // Apply custom styles here
            />

          
          </div>

          <div className='relative py-1 px-2'>
            <label htmlFor="country" className="block text-md font-medium text-white">Country</label>
            <Select
              id="country"
              className="w-full"
              options={countries}
              value={selectedCountry}
              onChange={handleCountryChange}
              styles={customStyles}
              placeholder="" 
            />
         
          </div>

          <div className='relative py-2 px-2'>
            <label htmlFor="city" className="block text-md font-medium text-white">City</label>
            <Select
              id="city"
              className="w-full"
              options={city}
              styles={customStyles}
              placeholder="" 
            />
           
          </div>


          <div className="flex items-start mb-5 py-1 px-2">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                defaultValue=""
                className={`w-4 h-4 border  accent-[#3772ff]  `}
                required=""
                onClick={handleCheckboxChange}
              />
            </div>
            <label

              className="ms-2 text-md font-medium  text-white cursor-pointer"
              onClick={handleCheckboxChange}
            >
            </label>
            <div className='ms-2 text-md font-medium  text-white '>
              I accept the{" "}
              <span className="text-[#3772ff] hover:underline cursor-pointer">MaroozeTerms</span> and{" "}
              <span className="text-[#3772ff] cursor-pointer hover:underline">
                Conditions
              </span>
              ,{" "}
              <span className="text-[#3772ff] cursor-pointer hover:underline">
                GDPR
              </span>{" "}
              ,{" "}
              <span className="text-[#3772ff] cursor-pointer hover:underline">
                Netiquette
              </span>
            </div>

          </div>
        </div>


      </div>








    </div >
  );
};

const StepTwo = ({ nextStep }) => {
  return (
    <div className='grid grid-cols-12 '>
      <div className='col-span-12 md:col-span-6'>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
        />
      </div>


      <div className='col-span-12 md:col-span-6'>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default SignupModal;
