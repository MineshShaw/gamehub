import Head from 'next/head';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl">Page Not Found</p>
    </div>
  );
}
