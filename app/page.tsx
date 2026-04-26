import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Redirect to landing page by default
    if (pathname === '/') {
      router.push('/landing');
    }
  }, [pathname, router]);

  return null;
}