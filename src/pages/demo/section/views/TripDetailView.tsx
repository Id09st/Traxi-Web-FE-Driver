import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Stack,
  Button,
  Divider,
  Container,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
// routes
// api
import { _socials, _tours } from 'src/_mock';
import { getDetailTrip } from 'src/api/Trip/Trip';
// components
import LoadingScreen from 'src/components/loading-screen';
//

import TravelTourDetailsHeader from '../trip-list/trip-detail/TripDetailHeader';
import TravelTourDetailsReserveForm from '../trip-list/trip-detail/TripDetailForm';
import { Result, TripDetail } from 'src/types/trips';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

interface Type {
  tripId: string;
}

export default function TripDetailView({ tripId }: Type) {
  const [loading, setLoading] = useState(true);
  const [tripDetails, setTripDetails] = useState<TripDetail | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getDetailTrip(tripId)
      .then((data) => {
        setTripDetails(data);
        setStatus(data.Status);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching trip details:', error);
        setLoading(false);
      });
  }, [tripId]);

  if (status === 'Finished') {
    router.push(`${paths.democompletedtrip}?tripId=${tripDetails.TripId}`);
  } else if (loading || !tripDetails) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Container sx={{ overflow: 'hidden' }}>
        <Typography variant="h3" sx={{ mt: 3, mb: 5 }}>
          Thông tin chuyến đi
        </Typography>

        <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse">
          <Grid xs={12} md={5} lg={4}>
            <TravelTourDetailsReserveForm tour={tripDetails} />
          </Grid>
          <Grid xs={12} md={7} lg={8}>
            <TravelTourDetailsHeader tour={tripDetails} />
            <Divider sx={{ borderStyle: 'dashed', my: 5 }} />
          </Grid>
        </Grid>
      </Container>
      <Divider sx={{ my: 10 }} />
    </>
  );
}
