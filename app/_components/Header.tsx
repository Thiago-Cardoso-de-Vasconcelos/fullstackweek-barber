'use client';

import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';

const Herder = () => {
  const { data } = useSession();

  const handleLoginclick = async () => {
    await signIn();
  };

  return (
    <Card>
      <CardContent className='p-5 justify-between flex flex-row items-center'>
        <Image src='/logo.png' alt='FSW Barber' height={18} width={120} />
        
        <Button variant="outline" size="icon" className="h-8 w-8">
          <MenuIcon size={18} />
        </Button>

      </CardContent>
    </Card>
  );
};

export default Herder;
