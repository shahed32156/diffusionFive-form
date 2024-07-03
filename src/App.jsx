import { useRef, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

function App() {
  
  const calculateTimeLeft = () => {
    const difference = +new Date('2024-07-10') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      setTimeLeft(timeLeft);
      if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
        setIsFormValid(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const form = useRef();
  const [name, setName] = useState("");
  const [opinion, setOpinion] = useState("");

  const handleName = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;

    if (regex.test(value)) {
      setName(value);
    } else {
      Swal.fire({
        title: "Error",
        text: "Invalid name",
        icon: "error"
      });
    }
  };

  const handleOpinion = (e) => {
    setOpinion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length <= 3) {
      Swal.fire({
        title: "Error",
        text: "Name must be more than 3 characters",
        icon: "error"
      });
      return;
    }

    Swal.fire({
      title: "Success",
      text: "Successfully submitted",
      icon: "success"
    });

    emailjs
      .sendForm('service_792fs4e', 'template_u6xr62t', form.current, {
        publicKey: 'wG2TB6JzfeU6u3ZPq',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <>
      <form ref={form} onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4 min-h-[100vh] mx-3 py-6' action="">

        <div>
          <img className='w-[80px] h-[70px] mx-auto' src="./Images/logo.jpg" alt="" />
        </div>

        <div>
          <h1 className='text-3xl'><span className='text-purple-700 font-semibold'>Diffusion</span>Five</h1>
        </div>

        <div className='text-center'>
          <h2 className='font-semibold'>Form validity ends in:</h2>
          <div className='font-mono text-[14px] flex items-center'>
            <h1 className='py-2 px-2'>{timeLeft.days}days - </h1>
            <h1 className='py-2 px-2'>{timeLeft.hours}hr - </h1>
            <h1 className='py-2 px-2'>{timeLeft.minutes}min - </h1>
            <h1 className='py-2 px-2'>{timeLeft.seconds}sec</h1>
          </div>
        </div>

        <div>
          <p className='text-center text-[20px] -mt-3'>Are you willing to work with the DiffusionFive?</p>
        </div>

        <div>
          <input 
            className='w-[300px] h-[50px] pl-2 rounded border focus:outline-none'
            type="text" 
            placeholder='Enter your name'
            name='name' 
            value={name}
            required 
            onChange={handleName}
            disabled={!isFormValid}
          />
        </div>

        <div>
          <select 
            onChange={handleOpinion} 
            className='w-[300px] h-[50px] bg-transparent pl-2 rounded border focus:outline-none' 
            name="message" 
            id='opinion' 
            required 
            disabled={!isFormValid}
          >
            <option disabled selected value={opinion}>Select your opinion</option>
            <option value="Yes" className='text-[green] font-bold'>Yes</option>
            <option value="No" className='text-[red] font-bold'>No</option>
          </select>
        </div>

        <div>
          <p className='w-[313px]'>If anyone select <span className='text-[green] font-bold'>yes</span>, then he will be given <span className='text-[green] font-bold'>5-7 days</span> for their work and communication. If they can't prove themselves, they will be <span className='text-[red] font-bold'>dropped</span> from the team.</p>
        </div>

        <div className='flex items-center gap-2'>
          <input className='accent-black' type="checkbox" required disabled={!isFormValid} />
          <label>I agree to the Terms & Conditions</label>
        </div>

        <div>
          <button 
            className='bg-black px-4 py-2 rounded font-semibold text-purple-700'
            disabled={!isFormValid}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default App;
