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


  const getStepName = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return "Signup";
      case 2:
        return "Step Two";
      // Add names for other steps as needed
      default:
        return "Unknown Step";
    }
  };




  return (
    <div className="absolute py-4 mt-8 top-0 left-0 w-full flex items-center justify-center bg-transparent bg-opacity-80 px-4  ">
      <div className="bg-[#2d2d2d]  border-gray-600 w-[900px] p-4 rounded-xl shadow-lg px-4">
        <div className='flex justify-end'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-400 cursor-pointer" onClick={onClose}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>

        </div>
        <div className='flex justify-center text-white  '>
          <h2 className="text-2xl font-bold mb-4">
            {getStepName(step)}  {step}/{totalSteps}
          </h2>

        </div>
        {renderStep()}
        {step !== totalSteps ? (
          <div className="flex justify-center space-x-4 0 mt-10">

            <button
              onClick={nextStep}
              className="bg-[#21c55e] hover:bg-[#388153]   duration-300 text-white font-bold py-2 px-6 rounded inline-flex items-center mr-2"
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
      backgroundColor: '#3c3c3c',
      border: '2px solid #555',
      borderColor: state.isFocused ? '#555' : '#555',
      borderRadius: '5px',
      padding: '2px',
      boxShadow: state.isFocused ? '0 0 0 1px #555' : 'none', 
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#21c55e' : '#333',
      '&:hover': {
        backgroundColor: 'RGBA(33,171,83,0.5)', // Light purple with opacity
      },
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#fff', // Adjust text color to white
    }),
    input: (provided, state) => ({
      ...provided,
      color: '#fff',
      '&::placeholder': {
        color: '#fff !important', // Adjust placeholder color here
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#333',
      color: '#fff', // Adjust dropdown menu background color
      zIndex: 9999, // Set the z-index value as needed
    }),
  };
  

  return (
    <div className='grid grid-cols-12 gap-4 mt-5 '>
      <div className='col-span-12 md:col-span-6 w-full'>


        <div className='relative py-2 px-2'>
          <label htmlFor="language" className="block text-sm  text-white absolute top-1  z-10 -mt-2 ml-2">Select Language:</label>
          <Select
            onChange={setSelectedOption}
             defaultValue={selectedOption}
           options={languages}
            styles={customStyles}
            placeholder='Select Language'
            className=''
          />
        </div>





        <div className='py-2 px-2 relative mt-2 '>
          <label className="block text-sm  text-white absolute top-1 z-2 -mt-2 ml-2">E-Mail</label>

          <input
  type="email"
  className="w-full bg-[#3c3c3c] hover:border-gray-300 rounded-md border-2 border-[#555] text-white py-2 px-4 focus:outline-none placeholder-white" // Add placeholder color here
  required
  placeholder='jane.doe@live.com'
/>

        </div>


        <div className='py-2 px-2 relative mt-2 '>
          <label className="block text-sm  text-white absolute top-1 z-2 -mt-2 ml-2">Stage Name</label>

          <input
            type="text"
            className="w-full bg-[#3c3c3c] placeholder-white hover:border-gray-300 rounded-md border-2 border-[#555] text-white    py-2 px-4  focus:outline-none "
            required
            placeholder='Stage Name'
          />
        </div>



        <div className='py-2 px-2 relative mt-2 '>
          <label className="block text-sm  text-white absolute top-1 z-2 -mt-2 ml-2">First Name</label>

          <input
            type="text"
            className="w-full bg-[#3c3c3c] placeholder-white hover:border-gray-300 rounded-md border-2 border-[#555] text-white    py-2 px-4  focus:outline-none "
            required
            placeholder='Jane'
          />
        </div>


        <div className='py-2 px-2 relative mt-2 '>
          <label className="block text-sm  text-white absolute top-1 z-2 -mt-2 ml-2">Last Name</label>

          <input
            type="text"
            className="w-full bg-[#3c3c3c] placeholder-white hover:border-gray-300 rounded-md border-2 border-[#555] text-white    py-2 px-4  focus:outline-none "
            required
            placeholder='Doe'
          />
        </div>
        <div className='py-2 px-2 relative mt-2 '>
          <label className="block text-sm  text-white absolute top-1 z-2 -mt-2 ml-2"> Birthday</label>

          <input
            type="date"
            className="w-full bg-[#3c3c3c] placeholder-white hover:border-gray-300 rounded-md border-2 border-[#555] text-white    py-2 px-4  focus:outline-none "
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


        <div className='relative py-2 px-2 mt-2'>
          <label htmlFor="language" className="block text-sm  text-white absolute top-1  z-10 -mt-2 ml-2">Gender</label>

          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={gender}
            styles={customStyles}
            placeholder="Gender" // Apply custom styles here
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
                      src={image || 'https://i.pinimg.com/736x/8b/11/a8/8b11a86980c64720a41ec22332a83115.jpg'}
                      alt="Large avatar"
                      className="w-20 h-20  rounded-full object-cover"
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

          <div className='relative py-2 px-2 mt-2'>
            <label htmlFor="language" className="block text-sm  text-white absolute top-1  z-10 -mt-2 ml-2">Division</label>

            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={division}
              styles={customStyles}
              placeholder="Choose Your Division" // Apply custom styles here
            />


          </div>

          <div className='relative py-2 px-2 mt-2'>
            <label htmlFor="language" className="block text-sm  text-white absolute top-1  z-10 -mt-2 ml-2">Country</label>


            <Select
              id="country"
              className="w-full"
              options={countries}
              value={selectedCountry}
              onChange={handleCountryChange}
              styles={customStyles}
              placeholder="Choose Your Country"
            />

          </div>

          <div className='relative py-2 px-2 mt-2'>
            <label htmlFor="language" className="block text-sm  text-white absolute top-1  z-10 -mt-2 ml-2">City</label>

            <Select
              id="city"
              className="w-full"
              options={city}
              styles={customStyles}
              placeholder="Choose Your City"
            />

          </div>

          <div className='py-2 px-2 relative mt-2 '>
            <label className="block text-sm  text-white absolute top-1 z-2 -mt-2 ml-2"> Copun Code</label>

            <input
              type="text"
              className="w-full bg-[#3c3c3c] placeholder-white hover:border-gray-300 rounded-md border-2 border-[#555] text-white    py-2 px-4  focus:outline-none "
              placeholder=' i.e. IEDA4DLD'
            />
          </div>



          <div className="flex items-center mb-5 py-1 px-2">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                defaultValue=""
                className={`w-4 h-4 border  accent-[#21c55e]  `}
                required=""
                onClick={handleCheckboxChange}
              />
            </div>
            <label

              className="ms-2 text-sm font-medium  text-white cursor-pointer"
              onClick={handleCheckboxChange}
            >
            </label>
            <div className='ms-2 text-md  text-white '>
            I accept the 
            <span className='underline ms-2'> 
               MaroozeTerms and
              Conditions ,</span>
              <span className='underline'>GDPR, </span>
              <span className='underline'>Netiquette</span>
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
