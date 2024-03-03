// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import TripListView from '../section/views/TripListView';
import ItemList from 'src/components/ItemList';

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
