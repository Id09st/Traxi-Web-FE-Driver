import { memo } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps, Link } from '@mui/material';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  single?: boolean;
}

function Logo({ single = false, sx }: LogoProps) {
  const theme = useTheme();

  // Sử dụng PRIMARY_MAIN cho màu sắc chính nếu cần

  // Cập nhật SVG mới vào đây
  const updatedLogo = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="140"
      height="60"
      version="1.1"
      viewBox="100 -18 240 250"
    >
      <g fill="#1e88e5">
        <path d="M94.38,50.18l-.08,119.6H72.94V71.54h-49V50.18Z"></path>
        <path d="M161.7,114.44a27.78,27.78,0,0,0,9.1-2.57,32.57,32.57,0,0,0,18.55-29.51,33.25,33.25,0,0,0-9.28-23,31.33,31.33,0,0,0-22.42-9.43H104.18V71.39h53.47a10.57,10.57,0,0,1,7.59,3.08,11.46,11.46,0,0,1,3.19,7.89,10.89,10.89,0,0,1-6.39,10,9.7,9.7,0,0,1-4.39,1l-53.47.17v21.28h21.09a20.85,20.85,0,0,1,17.87,10.29l.5,1,11.3,22.47L165.74,170h23.61l-10.8-21.44Z"></path>
        <path d="M319.88,170.72H295.93l-4.81-9.4-1-2-19.78-38.68-3.06-6L258.8,98l-11.46,22.45a52.38,52.38,0,0,1,11.46-1c.64,0,1.31,0,1.95,0,.85,0,1.7.1,2.55.18,1,.08,2,.18,3,.31l14.42,28.38a33.93,33.93,0,0,0-9.19-5.23,2.77,2.77,0,0,1-.26-.1c-.49-.18-1-.36-1.47-.52s-.92-.3-1.41-.43a31.8,31.8,0,0,0-16.41-.65,35,35,0,0,0-14.52,6.42c-.05,0-.1.07-.16.1l-.1.08a2.65,2.65,0,0,0-.31.23,21.92,21.92,0,0,0-1.9,1.62l-4.56,5-.26.33a7.73,7.73,0,0,0-.49.64,13.92,13.92,0,0,0-.85,1.21c-.08.11-.15.24-.23.34a65.91,65.91,0,0,0-7,13.29H197.71l10.95-21.38L258.8,51l50.09,98.35c.43.8.85,1.62,1.26,2.44Z"></path>
        <path d="M443.55,50.18l-46.83,60.4,46.65,60.05h-27.3l-33-42.5-33,42.5H322.78l46.47-60-46.82-60.4h27.3L382.9,93l33.17-42.85h27.48Z"></path>
        <path d="M454.34,170.45V49.93h21.6V170.45Z"></path>
      </g>
    </svg>
  );

  return (
    <Link
      component={NextLink}
      href={paths.demotriplist}
      color="inherit"
      aria-label="go to homepage"
      sx={{ lineHeight: 0 }}
    >
      <Box
        sx={{
          width: single ? 64 : 140, // Cập nhật chiều rộng tùy theo logo
          height: single ? 64 : 60, // Cập nhật chiều cao tùy theo logo
          lineHeight: 0,
          cursor: 'pointer',
          display: 'inline-flex',
          ...sx,
        }}
      >
        {updatedLogo}
      </Box>
    </Link>
  );
}

export default memo(Logo);
