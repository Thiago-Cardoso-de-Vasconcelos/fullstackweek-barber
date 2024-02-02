import { db } from '@/app/_lib/prisma';
import BarbershopInfo from './_components/barbershop-info';
import ServiceItem from './_components/service-item';

interface BarbershopDetailsPagesProps {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPagesProps) => {
  if (!params.id) {
    // TODO: redirercionar para home page
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    // TODO: redirercionar para home page
    return null;
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <div className='p-5 flex flex-col gap-3'>
        {barbershop.services.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};
export default BarbershopDetailsPage;
