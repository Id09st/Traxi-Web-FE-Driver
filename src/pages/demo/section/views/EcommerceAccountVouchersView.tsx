import { useEffect, useState } from 'react';
import { add } from 'date-fns';
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
// types
import { TripsDriver } from 'src/types/trips';
// api
import { getDetailTripByDriver } from 'src/api/Trip/Trip';
// components
import EcommerceAccountLayout from '../../account/layouts/EcommerceAccountLayout';
import EcommerceAccountVoucherItem from '../../account/layouts/EcommerceAccountVoucherItem';

export default function EcommerceAccountVouchersView() {
  const [tripsDriver, setTripsDriver] = useState<TripsDriver[] | null>(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserInfo = () => {
      const userInfoString = localStorage.getItem('USER_INFO');
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        setUserId(userInfo.id);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const data = await getDetailTripByDriver(userId);
        setTripsDriver(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch trip details:', error);
      }
    };

    fetchTripDetails();
  }, [userId]);

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
          tripsDriver.map(
            (
              trip // Đổi tên biến để tránh shadowing
            ) => <EcommerceAccountVoucherItem key={trip.Id} tripsDriver={trip} />
          )}
      </Box>
    </EcommerceAccountLayout>
  );
}
