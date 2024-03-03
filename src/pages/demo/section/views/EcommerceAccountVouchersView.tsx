import { add } from 'date-fns';
import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Button,
  Divider,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
// _mock
import _mock from 'src/_mock';
//
import EcommerceAccountLayout from '../../account/layouts/EcommerceAccountLayout';
import { getDetailTripByDriver } from 'src/api/Trip/Trip';
import { TripsDriver } from 'src/types/trips';
import EcommerceAccountVoucherItem from '../../account/layouts/EcommerceAccountVoucherItem';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function EcommerceAccountVouchersView() {
  const [tripsDriver, setTripsDriver] = useState<TripsDriver[] | null>(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const data = await getDetailTripByDriver('87820505-E6AB-4D90-A5AD-120F6626201F');
        setTripsDriver(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch trip details:', error);
      }
    };

    fetchTripDetails();
  }, ['87820505-E6AB-4D90-A5AD-120F6626201F']);

  return (
    <EcommerceAccountLayout>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Lịch sử cuốc
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        {tripsDriver &&
          tripsDriver.map((tripsDriver) => (
            <EcommerceAccountVoucherItem key={tripsDriver.Id} tripsDriver={tripsDriver} />
          ))}
      </Box>
    </EcommerceAccountLayout>
  );
}
