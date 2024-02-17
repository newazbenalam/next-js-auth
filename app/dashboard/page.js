"use client"

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { requireAuth, useAuth } from '../middleware/auth'; // Import requireAuth and useAuth hooks
export default function Dashboard({ user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Perform logout logic here, such as clearing authentication tokens
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* <h1>Welcome to the Dashboard, {user.username}!</h1> */}
      <button onClick={handleLogout} disabled={loading}>
        {loading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   // Apply authentication middleware to this page
//   await requireAuth(context.req, context.res);

//   // Simulate fetching user data from an API
//   const user = { username: 'admin' };

//   return {
//     props: { user },
//   };
// }