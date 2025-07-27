"use client";

import type { ReactNode } from 'react';
import { useLoading } from '@/hooks/useLoading';
import { LoadingSphere } from '@/components/home/LoadingSphere';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

interface AppClientLayoutProps {
  children: ReactNode;
}

export function AppClientLayout({ children }: AppClientLayoutProps) {
  const { isLoading } = useLoading();

  if (isLoading) {
    return <LoadingSphere />;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
