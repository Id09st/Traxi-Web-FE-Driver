// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import {
  Divider,
  Stack,
  Card,
  Typography,
  Box,
  Link,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PinDropIcon from '@mui/icons-material/PinDrop';
// routes
import { paths } from 'src/routes/paths';
// utils
import {
  fCurrency,
  fRoundToOneDecimal,
  fShortenNumber,
  truncateString,
} from 'src/utils/formatNumber';
// types
import { IVehicleInfo } from 'src/types/vehicle';
import { Trip, TripDetail } from 'src/types/trip';
import { ICustomerInfo } from 'src/types/customer';
import { BookingTrip } from 'src/api/Trip/BookingTrip';
// components
import Image from 'src/components/image';

import { useEffect, useState } from 'react';
import { getCustomerInfo } from 'src/api/Customer/Customer';
import { getDetailVehiclesByTrip } from 'src/api/Trip/Trip';
import { formatDate } from 'src/utils/formatTime';
import { useDriverInfo } from 'src/hooks/useDriverInfo';

// ----------------------------------------------------------------------

type Props = {
  trip: Trip;
  vertical?: boolean;
  CustomerId: string;
  BookingDate: string;
  tripDetails: TripDetail;
};

export default function TripItem({ trip, vertical }: Props) {
  const [customerInfo, setCustomerInfo] = useState<ICustomerInfo | null>(null);
  const [vehicleInfo, setVehicleInfo] = useState<IVehicleInfo | null>(null);
  const driverId = useDriverInfo();
  const router = useRouter();
  const { Id, BookingDate, Status, UpDate, CustomerId, DriverId, tripDetails } = trip;

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showErrorModal = (message: string) => {
    setErrorMessage(message);
    setIsErrorModalOpen(true);
  };

  useEffect(() => {
    if (CustomerId) {
      getCustomerInfo(CustomerId)
        .then((info) => {
          setCustomerInfo(info);
        })
        .catch((error) => {
          console.error('Failed to fetch customer info:', error);
        });
    }
  }, [CustomerId]);

  useEffect(() => {
    getDetailVehiclesByTrip(Id)
      .then((data) => {
        setVehicleInfo(data);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy thông tin xe:', error);
      });
  }, [Id]);

  const handleBookingTrip = async () => {
    try {
      const response = await BookingTrip({
        driverId: driverId,
        tripId: Id,
      });
      if (response.error) {
        showErrorModal(response.error);
      } else {
        router.push(`${paths.demotripdetail}?tripId=${Id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error booking trip:', error.message);
        showErrorModal(error.message);
      } else {
        console.error('Error booking trip:', error);
        showErrorModal('Đã xảy ra lỗi không xác định.');
      }
    }
  };

  return (
    <Card
      sx={{
        display: { sm: 'flex' },
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z24,
        },
        ...(vertical && {
          flexDirection: 'column',
        }),
      }}
    >
      {vehicleInfo && (
        <Box sx={{ flexShrink: { sm: 0 } }}>
          {vehicleInfo?.ImgURL ? (
            <Image
              alt={Id}
              src={vehicleInfo?.ImgURL}
              sx={{
                height: 1,
                objectFit: 'cover',
                width: { sm: 500 },
                ...(vertical && {
                  width: { sm: 1 },
                }),
              }}
            />
          ) : (
            <Image
              alt={Id}
              src="https://img.upanh.tv/2024/03/09/vecteezy_car-icon-car-icon-vector-car-icon-simple-sign_5576332.jpg"
              sx={{
                height: 1,
                objectFit: 'cover',
                width: { sm: 500 },
                ...(vertical && {
                  width: { sm: 1 },
                }),
              }}
            />
          )}
        </Box>
      )}

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack
          spacing={{
            xs: 3,
            sm: vertical ? 3 : 1,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {vehicleInfo && (
              <Typography variant="overline" sx={{ color: 'primary.main', fontSize: '1rem' }}>
                {vehicleInfo.Mode}
              </Typography>
            )}
            <Typography variant="h4">
              {tripDetails?.TotalPrice ? fCurrency(tripDetails.TotalPrice) : 'null'}
            </Typography>
          </Stack>
        </Stack>

        <>
          <div style={{ width: 266, height: 60, position: 'relative' }}>
            <div
              style={{
                width: 266,
                height: 60,
                left: 0,
                top: 0,
                position: 'absolute',
                background: '#F7F7F7',
                borderRadius: 8,
              }}
            />
            <div style={{ width: 248, height: 44, left: 11, top: 9, position: 'absolute' }}>
              <Typography
                style={{
                  left: 25,
                  top: 30,
                  position: 'absolute',
                  color: 'black',
                  fontSize: 12,
                  wordWrap: 'break-word',
                }}
              >
                {truncateString(tripDetails?.StartLocation, 30) ??
                  'Địa điểm bắt đầu không xác định'}
              </Typography>
              <div
                style={{
                  width: 18,
                  height: 18,
                  paddingTop: 3,
                  paddingLeft: 3,
                  paddingRight: 3,
                  left: 0,
                  top: 26,
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'inline-flex',
                }}
              >
                <PinDropIcon sx={{ width: '20px', height: '20px', color: '#F15252' }} />
              </div>
              <div
                style={{
                  width: 200,
                  height: 0,
                  left: 25,
                  top: 23,
                  position: 'absolute',
                  border: '1px #CCCCCC solid',
                }}
              />
              <Typography
                style={{
                  left: 25,
                  top: 2,
                  position: 'absolute',
                  color: 'black',
                  fontSize: 12,
                  wordWrap: 'break-word',
                }}
              >
                {truncateString(tripDetails?.EndLocation, 30) ?? 'Địa điểm kết thúc không xác định'}
              </Typography>
              <div style={{ width: 18, height: 28, left: 0, top: 0, position: 'absolute' }}>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    padding: 0.79,
                    left: 0,
                    top: 0,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                >
                  <MyLocationIcon sx={{ width: '20px', height: '20px', color: '#4C9FED' }} />
                </div>
              </div>
            </div>
          </div>
        </>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>{formatDate(BookingDate)}</Typography>
          <Typography variant="h4" style={{ color: '#4C9FED' }}>
            {tripDetails?.Distance ? `${tripDetails.Distance} km` : 'null'}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          {customerInfo && (
            <>
              <Avatar src={customerInfo.ImageURL} />
              <Typography variant="body2" sx={{ ml: 1, mr: 0.5 }}>
                {customerInfo.FulllName} - {customerInfo.Phone}
              </Typography>
            </>
          )}
        </Stack>
        <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="flex-end">
          <Button size="large" variant="contained" color="info" onClick={handleBookingTrip}>
            Nhận cuốc
          </Button>
        </Stack>
        <Divider
          sx={{
            borderStyle: 'dashed',
            display: { sm: 'none' },
            ...(vertical && {
              display: 'block',
            }),
          }}
        />
      </Stack>
      <Dialog
        open={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-description"
      >
        <DialogTitle id="error-dialog-title">Bạn không thể nhận thêm cuốc</DialogTitle>
        <DialogContent>
          <DialogContentText id="error-dialog-description">{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsErrorModalOpen(false);
              router.push(paths.demohistory);
            }}
            color="primary"
          >
            Lịch sử chuyến
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
