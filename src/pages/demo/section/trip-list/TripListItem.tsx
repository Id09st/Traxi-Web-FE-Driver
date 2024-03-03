// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { Divider, Stack, Card, Typography, Box, Link, Avatar, Button } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PinDropIcon from '@mui/icons-material/PinDrop';
// routes
import { paths } from 'src/routes/paths';
// utils
import { fCurrency, fRoundToOneDecimal, fShortenNumber } from 'src/utils/formatNumber';
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

// ----------------------------------------------------------------------

type Props = {
  course: Trip;
  vertical?: boolean;
  CustomerId: string;
  BookingDate: string;
  tripDetails: TripDetail;
};

export default function TripItem({ course, vertical }: Props) {
  const [customerInfo, setCustomerInfo] = useState<ICustomerInfo | null>(null);
  const [vehicleInfo, setVehicleInfo] = useState<IVehicleInfo | null>(null);
  const router = useRouter();
  const { Id, BookingDate, Status, UpDate, CustomerId, DriverId, tripDetails } = course;

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
  }, []);

  const handleBookingTrip = async () => {
    try {
      const { tripId } = await BookingTrip({
        driverId: '9BB82256-FABB-4BEF-AAB6-59A242E10C5F',
        tripId: Id,
      });
      router.push(`${paths.demotripdetail}?tripId=${Id}`);
    } catch (error) {
      console.error('Error booking trip:', error);
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
          <Image
            alt={Id}
            src={vehicleInfo.ImgURL}
            sx={{
              height: 1,
              objectFit: 'cover',
              width: { sm: 500 },
              ...(vertical && {
                width: { sm: 1 },
              }),
            }}
          />
        </Box>
      )}

      {/* {bestSeller && (
          <Label
            color="warning"
            variant="filled"
            sx={{ top: 12, left: 12, position: 'absolute', textTransform: 'uppercase' }}
          >
            Best Seller
          </Label>
        )} */}

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
              {/* {priceSale > 0 && (
                  <Box
                    component="span"
                    sx={{ mr: 0.5, color: 'text.disabled', textDecoration: 'line-through' }}
                  >
                    {fCurrency(priceSale)}
                  </Box>
                )} */}
              {fCurrency(tripDetails.TotalPrice)}
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
            ></div>
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
                {tripDetails.EndLocation?.length > 30
                  ? `${tripDetails.EndLocation.slice(0, 30)}...`
                  : tripDetails.EndLocation ?? ''}{' '}
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
              ></div>
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
                {tripDetails.StartLocation?.length > 30
                  ? `${tripDetails.StartLocation.slice(0, 30)}...`
                  : tripDetails.StartLocation ?? ''}{' '}
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
            {fRoundToOneDecimal(tripDetails.Distance)} km
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
        {/* <Stack
            spacing={1.5}
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            divider={<Divider orientation="vertical" sx={{ height: 20, my: 'auto' }} />}
          ></Stack> */}
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
    </Card>
  );
}
