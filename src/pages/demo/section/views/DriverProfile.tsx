import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
// @mui
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Typography, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
// assets
import { countries } from 'src/assets/data';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';
//
import EcommerceAccountLayout from '../../account/layouts/AccountLayout';
import { useDriverInfo } from 'src/hooks/useDriverInfo';
import { getDriverInfo } from 'src/api/Driver/Driver';

// ----------------------------------------------------------------------

export default function DriverProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const driverId = useDriverInfo();

  const [driverData, setDriverData] = useState({
    fullName: '',
    phone: '',
    address: '',
    degreeId: '',
  });

  useEffect(() => {
    if (driverId) {
      getDriverInfo(driverId)
        .then((data) => {
          const { result } = data;
          if (result) {
            // Cập nhật state với toàn bộ dữ liệu driver
            setDriverData({
              fullName: result.FullName,
              phone: result.Phone,
              address: result.Address,
              degreeId: result.DegreeId,
            });
          }
        })
        .catch((error) => {
          console.error('Failed to fetch driver info:', error);
        });
    }
  }, [driverId]);

  return (
    <EcommerceAccountLayout>
      <Box
        rowGap={2.5}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      >
        <TextField
          id="outlined-read-only-input"
          label="Họ và Tên"
          value={driverData.fullName}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Số điện thoại"
          value={driverData.phone} // Sử dụng giá trị từ state driverData
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Địa chỉ"
          value={driverData.address} // Sử dụng giá trị từ state driverData
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Bằng lái"
          value={driverData.degreeId} // Sử dụng giá trị từ state driverData
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>

      <Stack spacing={3} sx={{ my: 5 }}>
        <Typography variant="h5"> Change Password </Typography>

        {/* <Stack spacing={2.5}>
          <RHFTextField
            name="oldPassword"
            label="Old Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name="newPassword"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name="confirmNewPassword"
            label="Confirm New Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack> */}
      </Stack>
    </EcommerceAccountLayout>
  );
}
