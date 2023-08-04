'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import axios from 'axios'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import * as EmailValidator from 'email-validator';
import passwordValidator from 'password-validator';
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { ArrowLeftCircle } from 'lucide-react';
import BackButtonWithTitle from '../../components/BackButton';

const Signup = () => {
  const router = useRouter();

  const [user, setUser] = React.useState(
    {
      name: "",
      email: "",
      phone: "",
      password:""
    }
  )
   
    const [loading, setLoading] = useState(false);


  const handleSignup = async () => {
    try {
            setLoading(true);
            const response = await axios.post('/api/auth/register',user);
            console.log("Signup success", response.data);
            router.push("/auth/login");
            toast.success("You are registered")
           
    } catch (error:any) {
            toast.error(error.message==="Request failed with status code 400"?"User exists":"Signup failed");
            console.log("Signup failed", error.message);
    } finally {

              setLoading(false);
          
        }
  }
  
  const [message,setMessage] = useState('Please create an account')

  
  useEffect(() => {
  const validatePassword = () => {
  const schema = new passwordValidator();
  schema
   .is().min(6)            // Minimum length 6
   .is().max(100)          // Maximum length 100
   .has().uppercase()      // Must have uppercase letters
   .has().lowercase()      // Must have lowercase letters
   .has().digits()         // Must have digits
   .has().symbols()        // Must have special symbols
   .has().not().spaces();  // Should not have spaces

return schema.validate(user.password);
  };
           user.name.length > 0
          ? user.name.length > 5 && user.name.length < 10
          ? user.email.length > 0
          ? EmailValidator.validate(user.email)
          ? user.phone.length > 0
          ? user.phone.length > 8
          ? user.password.length > 0
          ? validatePassword()
          ? setMessage('Everything looks good')
          : setMessage('Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, one special symbol, and no spaces.')
          : setMessage('Enter Password')
          : setMessage('Enter valid Phone number')
          : setMessage('Enter Phone number')
          : setMessage('Invalid email')
          : setMessage('Enter your Email')
          : setMessage('Name should be > 5 characters and < 10')
          : setMessage('Please create an account')

    }, [user]);
  

    const handlePhoneChange = (value: string | undefined) => {
    setUser({ ...user, phone: value || ''});
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-md shadow-md w-96">

        <BackButtonWithTitle link='/' text='SignUp'/>
               <p className={`p-2 text-xs text-left  my-4 text-white opacity-80
         ${message === "Everything looks good" ? "bg-green-700"
            : message == "Please create an account" ? "hidden" : "bg-red-500"}`}>{message}</p>
        <input
          type="text"
          placeholder="Name"
          value={user.name.length<4?user.name.replace(/\s/g, ''):user.name}
          onChange={(e) => setUser({...user, name:e.target.value})}
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
            onChange={(e) => setUser({...user, email:e.target.value})}
          className="w-full border border-gray-300 rounded-md p-2 mb-2 "
        />
        <PhoneInput
          type="text"
          placeholder="Phone"
          defaultCountry={'IN'}
          value={user.phone}
          onChange={handlePhoneChange}
          className="w-full border border-gray-300 rounded-md  p-2  mb-2"
        />
        <input
          type="password"
          placeholder="password"
          value={user.password}
            onChange={(e) => setUser({...user, password:e.target.value})}
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
        />
        <button
          onClick={handleSignup}
          className={`w-full bg-neutral-800 text-white py-2 px-4 rounded-md hover:bg-neutral-900 disabled:opacity-50`}
          disabled={message === "Everything looks good" ? false:true} >
       {loading?'Processing..': 'Create Account'}
        </button>
        <button
          onClick={() => signIn('google')}
          className={`w-full bg-neutral-800 text-white py-2 px-4 rounded-md hover:bg-neutral-900 disabled:opacity-50 mt-2`} >
         Continue with Google 
        </button>
       <p className='mt-2'>Already an user?  <Link href={'/auth/login'} className='underline'>Login</Link> </p>
    
    </div>
    </div>
  );
};

export default Signup;