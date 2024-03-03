// @mui
import { Typography, Stack, Divider } from '@mui/material';
// utils
import { fDate, formatDate } from 'src/utils/formatTime';
import { fCurrency, fRoundToOneDecimal } from 'src/utils/formatNumber';
// components
import Iconify, { IconifyProps } from 'src/components/iconify';
import { Result } from 'src/types/trips';

// ----------------------------------------------------------------------

type Props = {
  tripDetails: Result;
};

export default function TravelOrderCompletedSummary({ tripDetails }: Props) {
  const { BookingDate, TripDetail } = tripDetails;
  return (
    <Stack
      spacing={3}
      sx={{
        p: 5,
        borderRadius: 2,
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      <Typography variant="h5">Thông tin chuyến đi</Typography>

      <LineItem
        icon="line-md:my-location-loop"
        label="Khởi hành"
        value={TripDetail.StartLocation}
      />

      <LineItem icon="carbon:location" label="Điểm đến" value={TripDetail.EndLocation} />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <LineItem
        icon="game-icons:path-distance"
        label="Lộ trình"
        value={`${fRoundToOneDecimal(TripDetail.Distance)} km`}
      />

      <LineItem
        icon="carbon:calendar"
        label="Ngày hoàn thành chyến"
        value={formatDate(BookingDate)}
      />

      <LineItem
        icon="carbon:receipt"
        label="Tổng thu khách hàng"
        value={fCurrency(TripDetail.TotalPrice)}
      />

      <LineItem icon="carbon:purchase" label="Phương thức thanh toán" value="Tiền mặt" />
    </Stack>
  );
}

// ----------------------------------------------------------------------

type LineItemProps = {
  icon: IconifyProps;
  label: string;
  value: any;
};

function LineItem({ icon, label, value }: LineItemProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ typography: 'body2', color: 'text.secondary' }}
    >
      <Iconify icon={icon} width={24} sx={{ mr: 1 }} /> {label}
      <Typography
        variant="subtitle2"
        sx={{ color: 'text.primary', flexGrow: 1, textAlign: 'right' }}
      >
        {value}
      </Typography>
    </Stack>
  );
}
