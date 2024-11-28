import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma'; // Adjust path
import SearchBar from './SearchBar';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.query || '';

  const restaurants = await prisma.restaurant.findMany({
    where: {
      name: { contains: query as string, mode: 'insensitive' },
    },
  });

  return { props: { initialResults: restaurants } };
};

const Home = ({ initialResults }: { initialResults: any[] }) => (
  <div>
    <SearchBar initialResults={initialResults} />
  </div>
);

export default Home;
