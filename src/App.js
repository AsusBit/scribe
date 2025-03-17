import './App.css';
import ScribeButton from './components/ScribeButton';
import PreviewSection from './components/PreviewSection';
import TutorialBox from './components/TutorialBox';
import logo from './assets/Logo.svg'
import gh from './assets/github.svg'
import { useState } from 'react';
import { Analytics } from "@vercel/analytics/react"


function App() {
  // use percentage to avoid scale displacement
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true)
  const [Err, setErr] = useState(<></>);

  // this function checks if file is an image, saves the file if it is, alerts user if it is not
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    } else {
      alert('Please select an image file');
    }
  };

  // this is a replacement function to scroll down when user clicks on the Get Startedd button
  const scrollToUpload = (e) => {
    e.preventDefault();
    const uploadSection = document.getElementById('upload');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // made to fix the bug where a user can leave to the PreviewSection without uploading an image
  const handleProceed = () => {
    if (selectedFile !== null){
      setShowPreview(true);
      setErr(<></>)
    } else {
      setErr(<p className='text-[#f00]'>You have to upload your image first!</p>)
    }
  }

  return (
    <div className='overflow-clip max-w-[100%] max-h-[100%]'>

      {/* intro */}
      <div className='flex flex-col justify-center items-center my-[18rem] space-y-5 duration-100 ease-in-out'>
        <h1 className="text-4xl sm:text-7xl font-bold text-scribe-gray font-book">Write Once, Invite All</h1>
        <p className='text-[1rem] sm:text-xl text-scribe-gray mt-10'>Making invitations easier than ever.</p>
        <a 
          href='#upload' 
          onClick={scrollToUpload}
          className={`font-book bg-scribe-green font-bold shadow-[2px_2px_0px_0px_#000] text-scribe-yellow w-[8rem] rounded h-[4rem] transition-all duration-50 active:shadow-none active:translate-y-1 justify-center items-center flex active:translate-x-1`}
        >
          Get Started
        </a>

      </div>

      <Analytics/>

      {/* Show tutorial box when preview is visible */}
      {showTutorial && <TutorialBox showTutorial={showTutorial} setShowTutorial={setShowTutorial}/>}

      {/* Upload Section */}
      {!showPreview && <form onSubmit={(e)=>e.preventDefault()} id="upload" className='flex flex-col justify-center items-center my-[20rem]'>
  {Err}
        <div id='upload' className='bg-scribe-ivory w-fit p-1 sm:w-[40rem] h-[20rem] space-y-5 rounded justify-center items-center flex flex-col'>

          <p className='text-scribe-gray font-book font-bold text-center text-2xl sm:text-4xl'>Upload Your Image</p>
          <div className='flex space-x-2 items-center justify-center' >
          <input 
            
            type='file' 
            accept='.png,.jpg,.jpeg' 
            onChange={handleFileSelect} 
            required  
            className={`file:font-book file:border-0 file:bg-scribe-brown file:font-bold   file:text-scribe-yellow file:w-[8rem] file:rounded file:h-[4rem] file:transition-all file:duration-50 file:active:shadow-none file:cursor-pointer file:mr-4`}
          />
          </div>
          <ScribeButton 
            size='lg' 
            title={"Upload & Process"} 
            fun={handleProceed}
          />
        </div>
      </form>}

      {showPreview && <PreviewSection uploadedFile={selectedFile} handleFileSelect={handleFileSelect}/>}

      {/* Footer */}
      <footer className='bg-scribe-green min-h-[18rem] relative items-end justify-center flex'>
        <img src={logo} className='absolute max-w-[5rem] sm:max-w-[10rem] left-1 top-1/2 -translate-y-1/2'></img>
        <div className='flex flex-col justify-center items-center relative h-[18rem] w-[20rem]'>
          <a href='https://www.github.com/AsusBit/' target="_blank" rel="noopener noreferrer">
            <img src={gh} className='w-[7rem] h-[7rem]'></img>
          </a>
          <p className='text-scribe-brown font-book absolute bottom-0'>© 2025 Hamzah AlNofli. All rights reserved.</p>
        </div>

      </footer>
    </div>
  );
}

export default App;
