import { useState } from 'react';
// @mui
import {
  Box,
  Link,
  Stack,
  Avatar,
  Popover,
  Checkbox,
  MenuItem,
  Typography,
  IconButton,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import CarCrashIcon from '@mui/icons-material/CarCrash';
// utils
import { fShortenNumber } from 'src/utils/formatNumber';
// types
import { Result } from 'src/types/trips';
// _mock
import { _socials } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

type Props = {
  tripDetails: Result;
};

export default function TravelTourDetailsHeader({ tripDetails }: Props) {
  const { TripId, BookingDate, Status, UpDate, CustomerId, DriverId, TripDetail } = tripDetails;

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          mb: 3,
        }}
      >
        <Image
          alt={TripId}
          src={TripDetail.Vehicle.ImgURL}
          sx={{
            height: 1,
            objectFit: 'cover',
            width: { sm: 150 },
          }}
        ></Image>
        <Typography variant="h3" sx={{ fontSize: '1rem' }}>
          {TripDetail.Vehicle.Mode} - {TripDetail.Vehicle.Type}
          <br />
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">
              <Icon style={{ position: 'relative', top: '6px', fontSize: 25 }} icon="raphael:car" />{' '}
              {TripDetail.Vehicle.LicensePlate}
            </Typography>
            <Typography sx={{ color: TripDetail.Vehicle.Color }} variant="h5">
              {TripDetail.Vehicle.Color}
              <CircleIcon sx={{ position: 'relative', top: '5px' }} />{' '}
            </Typography>
          </Stack>
        </Typography>
      </Stack>
    </>
  );
}
