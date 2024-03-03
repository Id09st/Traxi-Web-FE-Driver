// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections

import { useRouter } from 'next/router';
import TravelOrderCompletedView from '../section/views/TravelOrderCompletedView';

// ----------------------------------------------------------------------

TravelOrderCompletedPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function TravelOrderCompletedPage() {
  const router = useRouter();
  const { tripId } = router.query;
  return (
    <>
      <TravelOrderCompletedView tripId={tripId as string} />
    </>
  );
}
