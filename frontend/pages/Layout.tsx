'use client';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-20 pb-16 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}