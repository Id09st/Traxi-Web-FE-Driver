// next
import Head from 'next/head';
// layouts
import SimpleLayout from 'src/layouts/simple';

// sections
import DemoLoginBackgroundView from '../section/auth/views/LoginView';
// ----------------------------------------------------------------------

LoginBackgroundPage.getLayout = (page: React.ReactElement) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------

export default function LoginBackgroundPage() {
  return (
    <>
      <DemoLoginBackgroundView />
    </>
  );
}
