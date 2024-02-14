import { db } from '@/app/_lib/prisma';
import BarbershopInfo from './_components/barbershop-info';
import ServiceItem from './_components/service-item';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface BarbershopDetailsPagesProps {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({params}: BarbershopDetailsPagesProps) => {
  const session = await getServerSession(authOptions); // EM SERVER COMPONENT TEM QUE USAR O getServerSession
  
  if(!params.id) { return null; }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if(!barbershop) { return null; }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <div className='p-5 flex flex-col gap-3'>
        {barbershop.services.map((service) => (
          <ServiceItem
            key={service.id}
            barbershop={barbershop}
            service={service}
            isAuthenticated={!!session?.user}
          />
        ))}
      </div>
    </div>
  );
};
export default BarbershopDetailsPage;
