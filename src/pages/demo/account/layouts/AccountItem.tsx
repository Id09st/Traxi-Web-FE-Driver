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

type Props = {
  tripsDriver: TripsDriver;
};

export default function AccountItem({ tripsDriver }: Props) {
  // Di chuyển các lời gọi Hooks ra ngoài bất kỳ khối lệnh điều kiện nào
  const [loading, setLoading] = useState(true);
  const [tripDetails, setTripDetails] = useState<TripDetail | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!tripsDriver) return; // Sử dụng điều kiện bên trong useEffect thay vì bao quanh việc gọi useEffect

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
  }, [tripsDriver]);

  if (!tripsDriver) {
    return <div>Loading or error message...</div>;
  }

  let statusColor = 'inherit';
  switch (tripsDriver.Status) {
    case 'Driving':
      statusColor = 'orange';
      break;
    case 'Finished':
      statusColor = 'green';
      break;
    default:
      break;
  }

  const handleNavigation = () => {
    if (status && tripDetails?.TripId) {
      const path = status === 'Driving' ? paths.demotripdetail : paths.democompletedtrip;
      router.push(`${path}?tripId=${tripDetails.TripId}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleNavigation();
    }
  };

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
              'https://img.upanh.tv/2024/03/09/vecteezy_car-icon-car-icon-vector-car-icon-simple-sign_5576332.jpg'
            }
          />
          <TextMaxLine variant="overline" line={1}>
            {tripDetails?.Vehicle?.Mode ?? 'null'}
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
