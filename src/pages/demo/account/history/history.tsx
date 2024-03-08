// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// components
import ItemList from 'src/components/ItemList';
// sections
import EcommerceAccountVouchersView from '../../section/views/EcommerceAccountVouchersView';

// ----------------------------------------------------------------------

HistoryPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function HistoryPage() {
  return (
    <>
      <EcommerceAccountVouchersView />
    </>
  );
}
