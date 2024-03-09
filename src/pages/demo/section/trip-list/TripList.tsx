// @mui
import { Pagination, Stack } from '@mui/material';
// types
import { Trip, TripResult } from 'src/types/trip';
//
import TripItem from './TripListItem';
import TripItemSkeleton from './TripItemListSkeleton';

// ----------------------------------------------------------------------

type Props = {
  trips: Trip[];
  loading?: boolean;
};

export default function TripList({ trips, loading }: Props) {
  return (
    <>
      <Stack spacing={4}>
        {(loading ? [...Array(9)] : trips ?? []).map((trip, index) =>
          trip ? (
            <TripItem
              key={trip.Id}
              trip={trip}
              CustomerId={trip.CustomerId}
              BookingDate={trip.BookingDate}
              tripDetails={trip.tripDetails}
            />
          ) : (
            <TripItemSkeleton key={index} />
          )
        )}
      </Stack>

      {/* <Pagination
        count={10}
        color="primary"
        size="large"
        sx={{
          my: 10,
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
        }}
      /> */}
    </>
  );
}
