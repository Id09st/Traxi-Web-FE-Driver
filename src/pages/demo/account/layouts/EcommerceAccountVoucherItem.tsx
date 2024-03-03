import { differenceInCalendarDays } from 'date-fns';
// @mui
import { Stack, Typography } from '@mui/material';
// utils
import { formatDate } from 'src/utils/formatTime';
// components
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import { TripDetail, TripsDriver } from 'src/types/trips';
import { useEffect, useState } from 'react';
import { getDetailTrip } from 'src/api/Trip/Trip';
import { fCurrency } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

type Props = {
  tripsDriver: TripsDriver;
};

export default function EcommerceAccountVoucherItem({ tripsDriver }: Props) {
  // const dayLeft = differenceInCalendarDays(tripsDriver.BookingDate, new Date());
  const [loading, setLoading] = useState(true);
  const [tripDetails, setTripDetails] = useState<TripDetail | null>(null);
  const [status, setStatus] = useState<string | null>(null);

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

  return (
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
        <Image src={tripDetails?.Vehicle.ImgURL}></Image>

        <TextMaxLine variant="overline" line={1}>
          {tripDetails?.Vehicle.Mode}
        </TextMaxLine>
      </Stack>
      <Stack sx={{ p: 2.5, pb: 0 }}>
        {tripsDriver.Status}
        <Typography variant="body2" sx={{ mt: 0.5, mb: 1 }}>
          {/* {formatDate(tripDetails?.StartTime)} */}
          <Typography>Thu nhập:</Typography>
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography>{fCurrency(tripDetails?.TotalPrice)}</Typography>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function getIcon(type: string) {
  let icon;

  switch (type) {
    case 'shipping':
      icon = <Iconify icon="carbon:delivery" width={32} />;
      break;
    case 'category':
      icon = <Iconify icon="carbon:cut-out" width={32} />;
      break;
    default:
      icon = <Iconify icon="carbon:star" width={32} />;
  }
  return icon;
}
