// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// components
import ItemList from 'src/components/ItemList';
// sections
import DriverProfile from '../../section/views/DriverProfile';

// ----------------------------------------------------------------------

HistoryPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function HistoryPage() {
  return (
    <>
      <DriverProfile />
    </>
  );
}
