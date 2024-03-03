// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import EcommerceAccountVouchersView from '../../section/views/EcommerceAccountVouchersView';
import ItemList from 'src/components/ItemList';

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
