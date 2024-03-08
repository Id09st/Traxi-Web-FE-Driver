import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography, Button, Box } from '@mui/material';
// config
import { NAV } from 'src/config-global';
// _mock
import { _courses } from 'src/_mock';
// api
import { getActiveTrips } from 'src/api/Trip/Trip';
// types
import { Trip } from 'src/types/trip';
// components
import Iconify from 'src/components/iconify';
import TripList from '../trip-list/TripList';
import TripListFilter from '../trip-list/TripListFilters';
//

// ----------------------------------------------------------------------

export default function TripListView() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const fetchedTrips = await getActiveTrips();
      setTrips(fetchedTrips);
      setLoading(false);
    };
    fakeLoading();
  }, []);

  const handleMobileOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };
  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            py: 5,
          }}
        >
          <Typography variant="h2">Danh sách cuốc xe</Typography>

          <Button
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="carbon:filter" width={18} />}
            onClick={handleMobileOpen}
            sx={{
              display: { md: 'none' },
            }}
          >
            Filters
          </Button>
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }}>
          <TripListFilter mobileOpen={mobileOpen} onMobileClose={handleMobileClose} />

          <Box
            sx={{
              flexGrow: 1,
              pl: { md: 8 },
              width: { md: `calc(100% - ${NAV.W_DRAWER}px)` },
            }}
          >
            <TripList trips={trips} loading={loading} />
          </Box>
        </Stack>
      </Container>
    </>
  );
}
