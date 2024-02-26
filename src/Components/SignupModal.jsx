import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';



const SignupModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 7; // Adjusted to match the total number of steps

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
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
        return <StepTwo nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <StepThree nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <StepFour nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <StepFive nextStep={nextStep} prevStep={prevStep} />;

      case 6:
        return <StepSix nextStep={nextStep} prevStep={prevStep} />;


      case 7:
        return <StepSeven nextStep={nextStep} prevStep={prevStep} />;
      default:
        return null;
    }
  };

  const getStepName = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return "Signup";
      case 2:
        return "Select a banner";
      case 3:
        return "Write something about you";
      case 4:
        return "Do you have social media profiles";

      case 5:
        return "Attributes";

      case 6:
        return "Password";

      case 7:
        return "Gallery Pictures (Upload at least 5) ";
      default:
        return "Unknown Step";
    }
  };

  return (
<div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-transparent bg-opacity-80 px-4">
  <div className="bg-[#2d2d2d] border-gray-600 w-full max-w-[900px] h-[800px] md:h-[700px] p-4 rounded-xl shadow-lg flex flex-col overflow-x-auto">
    <div className="flex justify-end">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6 text-gray-400 cursor-pointer"
        onClick={onClose}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </div>
    <div className="flex justify-center text-white">
      <h2 className="text-2xl mb-4">
        {getStepName(step)} {step}/{totalSteps}
      </h2>
    </div>
    {renderStep()}
    <div className="flex justify-center mt-auto">
      {step !== 1 && (
        <button
          onClick={prevStep}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded inline-flex items-center mr-2"
        >
          Back
        </button>
      )}
      {step !== totalSteps ? (
        <button
          onClick={nextStep}
          className="bg-[#21c55e] hover:bg-[#388153] hover:duration-300 text-white font-bold py-2 px-6 rounded inline-flex items-center"
        >
          Continue
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className="bg-[#21c55e] hover:bg-[#388153] text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          Finish
        </button>
      )}
    </div>
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
      backgroundColor: 'transparent',
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
          <label  className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">Select Language:</label>
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
        <label  className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">E-Mail</label>

          <input
            type="email"
            className="w-full bg-transparent hover:border-gray-300 rounded-md border-2 border-[#555] text-white py-2 px-4 focus:outline-none placeholder-white" // Add placeholder color here
            required
            placeholder='jane.doe@live.com'
          />

        </div>


        <div className='py-2 px-2 relative mt-2 '>
        <label  className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">Stage Name</label>

          <input
            type="text"
            className="w-full bg-transparent placeholder-white hover:border-gray-300 rounded-md border-2 border-[#555] text-white    py-2 px-4  focus:outline-none "
            required
            placeholder='Stage Name'
          />
        </div>



        <div className='py-2 px-2 relative mt-2 '>
        <label  className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">First Name</label>

          <input
            type="text"
            className="w-full bg-transparent placeholder-white hover:border-gray-300 rounded-md border-2 border-[#555] text-white    py-2 px-4  focus:outline-none "
            required
            placeholder='Jane'
          />
        </div>


        <div className='py-2 px-2 relative mt-2 '>
        <label  className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">Last Name</label>

          <input
            type="text"
            className="w-full bg-transparent placeholder-white hover:border-gray-300 rounded-md border-2 border-[#555] text-white    py-2 px-4  focus:outline-none "
            required
            placeholder='Doe'
          />
        </div>
        <div className='py-2 px-2 relative mt-2'>
        <label  className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1"> Birthday</label>

          <input
            type="date"

            className="w-full bg-transparent placeholder-white hover:border-gray-300 rounded-md border-2 border-[#555] text-white py-2 px-4 focus:outline-none"
            style={{ background: 'transparent', color: 'white', width: '100%', height: '45px', WebkitAppearance: 'none' }} // Adjust width and height, and remove default appearance for iOS
            placeholder="Select Date" // Placeholder text for iOS
          />

          <style>
            {`
      /* Set placeholder color */
      ::-webkit-input-placeholder {
        color: white;
      }

      /* Style the date picker */
      input[type="date"] {
        -webkit-appearance: none; /* Remove default arrow button in Safari */
        appearance: none;
        padding: 10px; /* Adjust padding for better appearance */
        background-color: #3c3c3c; /* Set background color */
        border: 2px solid #555; /* Set border */
        border-radius: 5px; /* Set border radius */
        color: white; /* Set text color */
      }

      /* Style the date picker icon */
      input[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(1); /* Invert the color of the icon to white */
      }
    `}
          </style>
        </div>






        <div className='relative py-2 px-2 mt-2'>
        <label  className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">Gender</label>

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
          <label  className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">Division</label>

            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={division}
              styles={customStyles}
              placeholder="Choose Your Division" // Apply custom styles here
            />


          </div>

          <div className='relative py-2 px-2 mt-2'>
          <label  className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">Country</label>


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
          <label  className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">City</label>

            <Select
              id="city"
              className="w-full"
              options={city}
              styles={customStyles}
              placeholder="Choose Your City"
            />

          </div>

          <div className='py-2 px-2 relative mt-2 '>
          <label  className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1"> Copun Code</label>

            <input
              type="text"
              className="w-full bg-transparent placeholder-white hover:border-gray-300 rounded-md border-2 border-[#555] text-white    py-2 px-4  focus:outline-none "
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

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleUploadButtonClick = () => {
    // Trigger click event on file input
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    // Simulate upload process (you would replace this with your actual upload logic)
    uploadFile(file);
  };

  const uploadFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      // Simulate upload progress
      simulateUploadProgress(file);
    };
    reader.readAsDataURL(file);
  };

  const simulateUploadProgress = (file) => {
    const totalSize = file.size;
    let loaded = 0;
    const interval = setInterval(() => {
      loaded += 10000; // Simulate progress by adding 10KB each interval
      const progress = Math.min((loaded / totalSize) * 100, 100);
      setUploadProgress(progress);
      if (progress === 100) {
        clearInterval(interval);
      }
    }, 100); // Simulate progress every 100 milliseconds
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
    setUploadProgress(0);
  };

  return (
    <div className="grid gap-6 mb-6 md:grid-cols-1">
      <div>
        <div className="flex items-center justify-center w-full">


          <label htmlFor="image_upload" className=" bg-[#3e3e3e]  cursor-pointer bg-gray border-2 border-[#555] rounded-2xl w-full pb-4">
            <div className='flex justify-center'>
              <img className='w-40' src="/cloud.png" alt="" />
            </div>
            <span className="text-center block text-[#fff] text-lg px-2"> Select a data to upload or drop it here</span>
            <div className='flex justify-center mt-5'>
              <button type="button" onClick={handleUploadButtonClick} className='bg-[#444] px-12 rounded-lg border-2 border-[#555] py-2 text-white'>Upload</button>
            </div>
            <input id="image_upload" className="hidden" type="file" ref={fileInputRef} onChange={handleFileInputChange} />
          </label>

        </div>



        <div className='flex justify-center mt-5'>
          <button className='bg-[#444] px-12 rounded-lg border-2 border-[#555] py-2 text-white'>
            Unsplash Library

          </button>
        </div>
      </div>


      <div className='grid grid-cols-12 items-center md:-mt-12 gap-4'>
        <div className='col-span-12 md:col-span-3 lg:col-span-3'>
          <img src={uploadedImage} className=" " />

        </div>
        <div className='col-span-12 md:col-span-3 lg:col-span-3'>
          {uploadProgress > 0 && (
            <div className='flex space-x-4'>
              <div className="w-full">
                <div className="bg-[#444] h-4 rounded-lg overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
              <p className="text-center  text-white">{Math.round(uploadProgress)}% </p>
              <div>
                <button onClick={handleDeleteImage} className=' text-white'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

                </button>
              </div>
            </div>
          )}
        </div>


      </div>
    </div>

  );
};


const StepThree = ({ nextStep }) => {



  return (
    <div className="grid gap-6 mb-6 md:grid-cols-1">
      <div className='py-2 px-2 relative mt-2 '>

        <textarea
          rows="8" // You can adjust the number of rows as needed
          className="w-full bg-[#3c3c3c] hover:border-gray-300 rounded-2xl border-2 border-[#555] text-white py-2 px-4 focus:outline-none placeholder-white" // Add placeholder color here
          required
        />

      </div>



    </div>

  );
};


const StepFour = ({ nextStep }) => {
  const [inputValues, setInputValues] = useState(["", "", "", ""]);

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-6 space-y-1 md:max-w-[360px]">
        <div className="relative">
          <input
            type="text"
            className="w-full rounded-lg placeholder-white border-2 py-2 bg-transparent border-[#555] text-white pl-12"
            placeholder="Facebook"
            value={inputValues[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
          />
          <img className="absolute top-2 left-1 w-12" src="/facebook.png" alt="Facebook Icon" />
        </div>
        <div className="relative">
          <input
            type="text"
            className="w-full rounded-lg placeholder-white border-2 py-2 bg-transparent border-[#555] text-white pl-12"
            placeholder="Linkedin"
            value={inputValues[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
          />
          <img className="absolute top-2 left-1 w-12" src="/linkedin.png" alt="Linkedin Icon" />
        </div>
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="flex md:justify-end">
          <div className="space-y-1 w-full md:max-w-[360px] mt-8 md:mt-0">
            <div className="relative">
              <input
                type="text"
                className="w-full placeholder-white rounded-lg border-2 py-2 bg-transparent border-[#555] text-white pl-12"
                placeholder="Instagram"
                value={inputValues[2]}
                onChange={(e) => handleInputChange(2, e.target.value)}
              />
              <img className="absolute top-2 left-1 w-12" src="/instagram.png" alt="Instagram Icon" />
            </div>
            <div className="relative">
              <input
                type="text" 
                className="w-full placeholder-white  rounded-lg border-2 py-2  bg-transparent border-[#555] text-white pl-12"
                placeholder="Pinterest"
                value={inputValues[3]}
                onChange={(e) => handleInputChange(3, e.target.value)}
              />
              <img className="absolute top-2 left-1 w-12" src="/pintrest.png" alt="Pinterest Icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};





const StepFive = ({ nextStep }) => {


  const [selectedOption, setSelectedOption] = useState(null);
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
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


  const [rangeValue, setRangeValue] = useState(0);

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };



  return (
    <>
      <div className='grid grid-cols-12'>

        <div className='col-span-12 flex items-center justify-center md:col-span-6 w-full'>




          <div className='w-full'>
            <div>


            </div>

            <div className='relative py-2 px-2 mt-2'>
            <label  className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">Languages</label>

              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={languages}
                styles={customStyles}
                placeholder="Choose  Language" // Apply custom styles here
              />


            </div>





            <div className='py-2 px-2 relative mt-2'>
              <label className="block text-sm text-white absolute top-1 z-2 -mt-2 ml-2">Experience</label>

              <div className='flex items-center mt-5 space-x-4 '>
                <input
                  type='range'
                  className="rounded-lg overflow-hidden  appearance-none bg-[#444]  h-4 w-[330px]"
                  value={rangeValue}
                  onChange={handleRangeChange}
                />

                <span className='text-white'>{rangeValue}</span>
              </div>
            </div>



            <div className='relative py-2 px-2 mt-2'>
            <label  className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">Coaching</label>

              <Select
                id="city"
                className="w-full"
                options={city}
                styles={customStyles}
                placeholder="Select coaching methods"
              />

            </div>

            <div className='mt-5 px-2.5'>
              <label className="inline-flex items-center me-5 cursor-pointer">
                <input
                  type="checkbox"
                  defaultValue=""
                  className="sr-only peer"
                  defaultChecked=""
                />
                <div className="relative w-9 h-5 bg-[#444] rounded-full peer  peer-focus:ring-none peer-focus:ring-none  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-[#21c55e]" />
                <span className="ms-3 text-sm font-medium text-white">
                  Collaborations

                </span>
              </label>

            </div>

            <div className='mt-1 px-2.5'>
              <label className="inline-flex items-center me-5 cursor-pointer">
                <input
                  type="checkbox"
                  defaultValue=""
                  className="sr-only peer"
                  defaultChecked=""
                />
                <div className="relative w-9 h-5 bg-[#444] rounded-full peer  peer-focus:ring-none peer-focus:ring-none  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-[#21c55e]" />
                <span className="ms-3 text-sm font-medium text-white">
                  Travel

                </span>
              </label>

            </div>




          </div>


        </div>

      </div>


    </>
  );
};





const StepSix = ({ nextStep }) => {








  return (
    <>
      <div className='grid grid-cols-12'>

        <div className='col-span-12 flex items-center justify-center md:col-span-6 w-full'>


          <div className='w-full'>
            <div className='py-2 px-2 relative mt-2  '>
            <label  className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1"> Verification Code
              </label>

              <input
                type="email"
                className="w-full bg-transparent hover:border-gray-300 rounded-md border-2 border-[#555] text-white py-2 px-4 focus:outline-none placeholder-white" // Add placeholder color here
                required
                placeholder=' Code sent via E-Mail              '
              />

            </div>

            <div className='py-2 px-2 relative mt-2  w-full'>
            <label  className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">  Password

              </label>

              <input
                type="email"
                className="w-full bg-transparent hover:border-gray-300 rounded-md border-2 border-[#555] text-white py-2 px-4 focus:outline-none placeholder-white" // Add placeholder color here
                required
                placeholder='  Select a strong password
              '
              />

            </div>
            <div className='py-2 px-2 relative mt-2  w-full'>
            <label  className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">   Confirm Password


              </label>

              <input
                type="email"
                className="w-full bg-transparent hover:border-gray-300 rounded-md border-2 border-[#555] text-white py-2 px-4 focus:outline-none placeholder-white" // Add placeholder color here
                required
                placeholder=' Enter the same Password            '
              />

            </div>
          </div>





        </div>

      </div>


    </>
  );
};



const StepSeven = ({ nextStep }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState([]);

  const fileInputRef = useRef(null);

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files);

    // Limit upload to maximum 5 images
    if (uploadedImages.length + newImages.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }

    const updatedImages = [...uploadedImages, ...newImages];
    setUploadedImages(updatedImages);

    // Initialize progress and success state for new images
    const initialProgress = newImages.map(() => 0);
    const initialSuccess = newImages.map(() => false);
    setUploadProgress((prevProgress) => [...prevProgress, ...initialProgress]);
    setUploadSuccess((prevSuccess) => [...prevSuccess, ...initialSuccess]);

    // Simulate upload progress for each new image
    newImages.forEach((file, index) => {
      simulateUploadProgress(file, index);
    });
  };

  const simulateUploadProgress = (file, index) => {
    const totalSize = file.size;
    let loaded = 0;
    const interval = setInterval(() => {
      loaded += 10000; // Simulate progress by adding 10KB each interval
      const progress = Math.min((loaded / totalSize) * 100, 100);

      setUploadProgress((prevProgress) => {
        const updatedProgress = [...prevProgress];
        updatedProgress[index] = progress;
        return updatedProgress;
      });

      if (progress === 100) {
        clearInterval(interval);
        setUploadSuccess((prevSuccess) => {
          const updatedSuccess = [...prevSuccess];
          updatedSuccess[index] = true;
          return updatedSuccess;
        });
      }
    }, 100); // Simulate progress every 100 milliseconds
  };

  const handleDeleteImage = (index) => {
    setUploadedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });

    setUploadProgress((prevProgress) => {
      const updatedProgress = [...prevProgress];
      updatedProgress.splice(index, 1);
      return updatedProgress;
    });

    setUploadSuccess((prevSuccess) => {
      const updatedSuccess = [...prevSuccess];
      updatedSuccess.splice(index, 1);
      return updatedSuccess;
    });
  };

  return (
    <div className="grid gap-6 mb-6 md:grid-cols-1">
      <div>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="image_upload" className="bg-[#3e3e3e] cursor-pointer bg-gray border-2 border-[#555] rounded-2xl w-full pb-4">
            <div className="flex justify-center">
              <img className="w-40" src="/cloud.png" alt="" />
            </div>
            <span className="text-center block text-[#fff] text-lg px-2">Select a data to upload or drop it here</span>
            <div className="flex justify-center mt-5">
              <button type="button" onClick={handleUploadButtonClick} className="bg-[#444] px-12 rounded-lg border-2 border-[#555] py-2 text-white">Upload</button>
            </div>
            <input id="image_upload" className="hidden" type="file" ref={fileInputRef} onChange={handleFileInputChange} multiple />
          </label>
        </div>
        <div className="flex justify-center mt-5">
          <button className="bg-[#444] px-12 rounded-lg border-2 border-[#555] py-2 text-white">
            Unsplash Library
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 items-center md:-mt-12 gap-4">
        {uploadedImages.map((image, index) => (
          <div key={index} className="col-span-12 md:col-span-2 lg:col-span-3">
            <img src={URL.createObjectURL(image)} className="" alt={`Uploaded image ${index}`} />
            <div className="flex space-x-4 items-center mt-2">
              <div className="w-full">
                <div className="bg-[#444] h-4 rounded-lg overflow-hidden">
                  <div className={`bg-${uploadSuccess[index] ? "green" : "gray"}-500 h-full`} style={{ width: `${uploadSuccess[index] ? "100" : uploadProgress[index]}%` }}></div>
                </div>
              </div>
              <p className="text-center text-white">{uploadSuccess[index] ? "100%" : `${Math.round(uploadProgress[index])}%`}</p>
              <button onClick={() => handleDeleteImage(index)} className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default SignupModal;
