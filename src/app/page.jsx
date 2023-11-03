"use client";

import Content from "@/components/Content";
import MainLayout from "@/components/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <main>
        <div className="text-center">
          <Content />
        </div>
      </main>
    </MainLayout>
  );
}
