// next
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// api
import { getDetailTrip } from 'src/api/Trip/Trip';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import TripDetailView from '../section/views/TripDetailView';

// ----------------------------------------------------------------------

TravelTourPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function TravelTourPage() {
  const router = useRouter();
  const { tripId } = router.query;
  const [tripDetails, setTripDetails] = useState(null);

  useEffect(() => {
    const id = tripId as string;
    if (id) {
      getDetailTrip(id)
        .then((data) => {
          setTripDetails(data.result);
        })
        .catch((error) => {
          console.error('Error fetching trip details:', error);
        });
    }
  }, [tripId]);

  return (
    <>
      <TripDetailView tripId={tripId as string} />
    </>
  );
}
