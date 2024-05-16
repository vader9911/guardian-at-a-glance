// components/UserStats.js
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function UserStats() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (session) {
      fetchUserStats(session.accessToken);
    }
  }, [session]);

  async function fetchUserStats(accessToken) {
    const response = await fetch('https://www.bungie.net/Platform/Destiny2/2/Account/4611686018439374266/Character/2305843009264964663/Stats/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-API-Key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY,
      },
    });
    const data = await response.json();
    setStats(data);
  }

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div>
      {stats ? <pre>{JSON.stringify(stats, null, 2)}</pre> : <p>No stats available</p>}
    </div>
  );
}
