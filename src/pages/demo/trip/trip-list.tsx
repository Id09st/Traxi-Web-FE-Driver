// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// components
import ItemList from 'src/components/ItemList';
// sections
import TripListView from '../section/views/TripListView';

// ----------------------------------------------------------------------

ElearningCoursesPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ElearningCoursesPage() {

  return (
    <>
      <TripListView />
      <ItemList />
    </>
  );
}
