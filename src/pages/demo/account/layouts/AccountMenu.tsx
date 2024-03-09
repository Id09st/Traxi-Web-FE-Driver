// next
import NextLink from 'next/link';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Link,
  Stack,
  Drawer,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import useActiveLink from 'src/hooks/useActiveLink';
// config
import { NAV } from 'src/config-global';
// routes
import { paths } from 'src/routes/paths';
// _mock
import _mock from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import useAuth from 'src/hooks/useAuth';
import { useDriverInfo } from 'src/hooks/useDriverInfo';
import { useEffect, useState } from 'react';
import { getDriverInfo } from 'src/api/Driver/Driver';

// ----------------------------------------------------------------------

const navigations = [
  {
    title: 'Tài khoản',
    path: paths.demoaccount,
    icon: <Iconify icon="fa:drivers-license-o" />,
  },
  {
    title: 'Danh sách công việc',
    path: paths.demotriplist,
    icon: <Iconify icon="solar:document-broken" />,
  },
  {
    title: 'Lịch sử cuốc',
    path: paths.demohistory,
    icon: <Iconify icon="ic:twotone-history" />,
  },
];

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
};

export default function AccountMenu({ open, onClose }: Props) {
  const isMdUp = useResponsive('up', 'md');
  const { logout } = useAuth();
  const driverId = useDriverInfo();

  const [driverData, setDriverData] = useState({
    fullName: '',
    phone: '',
    imageUrl: '',
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
              imageUrl: result.ImageUrl,
            });
          }
        })
        .catch((error) => {
          console.error('Failed to fetch driver info:', error);
        });
    }
  }, [driverId]);

  const renderContent = (
    <Stack
      sx={{
        flexShrink: 0,
        borderRadius: 2,
        width: 1,
        ...(isMdUp && {
          width: NAV.W_DRAWER,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        }),
      }}
    >
      <Stack spacing={2} sx={{ p: 3, pb: 2 }}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar src={driverData.imageUrl} sx={{ width: 64, height: 64 }} />
          <Stack spacing={0.5}>
            <TextMaxLine variant="subtitle1" line={1}>
              {driverData.fullName}
            </TextMaxLine>
            <TextMaxLine variant="body2" line={1} sx={{ color: 'text.secondary' }}>
              {driverData.phone}
            </TextMaxLine>
          </Stack>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        {navigations.map((item) => (
          <MenuItem key={item.title} item={item} />
        ))}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        <ListItemButton
          sx={{
            px: 1,
            height: 44,
            borderRadius: 1,
          }}
          onClick={logout}
        >
          <ListItemIcon>
            <Iconify icon="carbon:logout" />
          </ListItemIcon>
          <ListItemText
            primary="Đăng xuất"
            primaryTypographyProps={{
              typography: 'body2',
            }}
          />
        </ListItemButton>
      </Stack>
    </Stack>
  );

  return (
    <>
      {isMdUp ? (
        renderContent
      ) : (
        <Drawer
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: NAV.W_DRAWER,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type MenuItemProps = {
  item: {
    title: string;
    path: string;
    icon: React.ReactNode;
  };
};

function MenuItem({ item }: MenuItemProps) {
  const { active } = useActiveLink(item.path);

  return (
    <Link
      component={NextLink}
      key={item.title}
      href={item.path}
      color={active ? 'primary' : 'inherit'}
      underline="none"
    >
      <ListItemButton
        sx={{
          px: 1,
          height: 44,
          borderRadius: 1,
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            typography: 'body2',
            ...(active && {
              typography: 'subtitle2',
            }),
          }}
        />
      </ListItemButton>
    </Link>
  );
}
