import { differenceInCalendarDays } from 'date-fns';
import NextLink from 'next/link';
// @mui
import { Stack, Typography } from '@mui/material';
// utils
import { formatDate } from 'src/utils/formatTime';
// components
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import { TripDetail, TripsDriver } from 'src/types/trips';
import { useEffect, useState } from 'react';
import { getDetailTrip } from 'src/api/Trip/Trip';
import { fCurrency } from 'src/utils/formatNumber';
import { paths } from 'src/routes/paths';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

type Props = {
  tripsDriver: TripsDriver;
};

export default function EcommerceAccountVoucherItem({ tripsDriver }: Props) {
  console.log('1', tripsDriver);
  const [loading, setLoading] = useState(true);
  const [tripDetails, setTripDetails] = useState<TripDetail | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  const handleNavigation = () => {
    if (status === 'Driving') {
      router.push(`${paths.demotripdetail}?tripId=${tripDetails?.TripId}`);
    } else if (status === 'Finished') {
      router.push(`${paths.democompletedtrip}?tripId=${tripDetails?.TripId}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleNavigation();
    }
  };

  useEffect(() => {
    setLoading(true);
    getDetailTrip(tripsDriver.Id)
      .then((data) => {
        setTripDetails(data.TripDetail);
        setStatus(data.Status);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching trip details:', error);
        setLoading(false);
      });
  }, [tripsDriver.Id]);

  // Sửa lỗi lồng biểu thức ba ngôi
  let statusColor = 'inherit';
  if (tripsDriver.Status === 'Driving') {
    statusColor = 'orange';
  } else if (tripsDriver.Status === 'Finished') {
    statusColor = 'green';
  }

  return (
    <div
      onClick={handleNavigation}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
    >
      <Stack
        direction="row"
        sx={{
          borderRadius: 1,
          overflow: 'hidden',
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <Stack
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 120,
            height: 120,
            flexShrink: 0,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Image
            src={
              tripDetails?.Vehicle?.ImgURL ??
              'https://static.vecteezy.com/system/resources/previews/005/576/332/original/car-icon-simple-sign-free-vector.jpg'
            }
          />
          <TextMaxLine variant="overline" line={1}>
            {tripDetails?.Vehicle?.Mode ?? 'Loại xe null'}
          </TextMaxLine>
        </Stack>

        <Stack sx={{ p: 2.5, pb: 0 }}>
          <Typography
            sx={{
              color: statusColor,
              fontWeight: 'bold',
            }}
          >
            {tripsDriver.Status}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, mb: 1 }}>
            {formatDate(tripDetails?.StartTime ?? '')}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>{fCurrency(tripDetails?.TotalPrice ?? 0)}</Typography>
        </Stack>
      </Stack>
    </div>
  );
}
