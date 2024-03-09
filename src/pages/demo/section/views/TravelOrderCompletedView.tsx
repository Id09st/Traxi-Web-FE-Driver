// next
import NextLink from 'next/link';
// @mui
import { Container, Typography, Stack, Button } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import LoadingScreen from 'src/components/loading-screen';

// _mock
import { _tours } from 'src/_mock';
//
import { useEffect, useState } from 'react';
import { getDetailTrip } from 'src/api/Trip/Trip';
import { TripDetail } from 'src/types/trips';
import TravelOrderCompletedSummary from 'src/pages/demo/section/trip-list/complete-trip/TravelOrderCompletedSummary';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

interface Type {
  tripId: string;
}

interface Result {
  TripId: string;
  BookingDate: string;
  Status: string;
  UpDate: string;
  CustomerId: string;
  DriverId: string | null;
  TripDetail: TripDetail;
}

export default function TravelOrderCompletedView({ tripId }: Type) {
  const isMdUp = useResponsive('up', 'md');
  const [loading, setLoading] = useState(true);
  const [tripDetails, setTripDetails] = useState<Result | null>(null);

  useEffect(() => {
    setLoading(true);
    getDetailTrip(tripId)
      .then((data) => {
        setTripDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching trip details:', error);
        setLoading(false);
      });
  }, [tripId]);

  if (loading || !tripDetails) {
    return <LoadingScreen />;
  }

  return (
    <Container
      sx={{
        pt: 5,
        pb: { xs: 8, md: 15 },
        gap: 10,
        display: 'grid',
        alignItems: 'flex-start',
        gridTemplateColumns: { md: 'repeat(2, 1fr)' },
      }}
    >
      {isMdUp && (
        <Image
          alt="cover"
          src={
            tripDetails?.TripDetail?.Vehicle?.ImgURL ??
            'https://img.upanh.tv/2024/03/09/vecteezy_car-icon-car-icon-vector-car-icon-simple-sign_5576332.jpg'
          }
          ratio="3/4"
          sx={{ borderRadius: 2 }}
        />
      )}

      <Stack spacing={5}>
        <Typography variant="h2">Hoàn thành 🎉</Typography>

        {/* <TravelOrderCompletedInfo tripDetails={tripDetails} /> */}

        <TravelOrderCompletedSummary tripDetails={tripDetails} />

        <Stack spacing={2.5} direction={{ xs: 'column', md: 'row' }} justifyContent="center">
          <Button
            component={NextLink}
            href={paths.demotriplist}
            variant="outlined"
            size="large"
            color="inherit"
            startIcon={<Iconify icon="carbon:chevron-left" />}
          >
            Trở về
          </Button>
          <Button
            component={NextLink}
            href={paths.demohistory}
            variant="contained"
            size="large"
            color="inherit"
            startIcon={<Iconify icon="carbon:package" />}
          >
            Lịch sử cuốc
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
