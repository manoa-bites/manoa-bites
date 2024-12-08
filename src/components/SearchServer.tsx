import { prisma } from '@/lib/prisma';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react';

interface Props {
  query: string;
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function SearchResults({ query }: Props) {
  const restaurants = await prisma.restaurant.findMany({
    where: {
      name: { contains: query, mode: 'insensitive' },
    },
  });

  return (
    <ul>
      {restaurants.length > 0 ? (
        // eslint-disable-next-line max-len
        restaurants.map((restaurant: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => <li key={restaurant.id}>{restaurant.name}</li>)
      ) : (
        <li>No results found</li>
      )}
    </ul>
  );
}
