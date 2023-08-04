import { PenLine } from 'lucide-react';
import Button from './components/Button';
import getCurrentUser from '../(backend)/helpers/getCurrentUser';
import LogoutButton from './components/logoutButton';
import ClientOnly from './components/ClientOnly';

const Home = async () => {
    const currentUser = await getCurrentUser();

  return (
    <ClientOnly>
          <div className="min-h-screen gap-4 flex flex-col justify-center items-center p-4">
      <div className="items-center justify-center text-white h-20 w-20 flex font-extrabold text-2xl rounded-full bg-neutral-950">
        <PenLine />N
      </div>
      <p className="font-extrabold text-xl">Notenext</p>
      <div className="flex flex-col gap-2 mt-2 bg-gray-100 p-4 rounded border border-gray-200 w-full max-w-[20rem]">
        <Button link="/notes-feed" text="Notes Feed" />
        {currentUser ? (
          <>
            <Button link="/note" text="Note " />
            <Button link="/profile" text="About me" />
            <LogoutButton />
          </>
        ) : (
          <>
            <Button link="/auth/login" text="Login" />
            <Button link="/auth/signup" text="SignUp" />
          </>
        )}
      </div>
    </div>
</ClientOnly>
  );
};


export default Home;