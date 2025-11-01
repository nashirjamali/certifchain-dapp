import { DefaultLayout } from '@/components/layout/DefaultLayout';

export default function Home() {
  return (
    <DefaultLayout>
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">CertiChain</h1>
      </div>
    </DefaultLayout>
  );
}
