'use client';
import { useParams } from 'next/navigation';

export default function CatPage() {
  const params = useParams<{ catId: string }>();
  const catId = params?.catId;

  return (
    <div>
      <h1>Cat ID: {catId}</h1>
    </div>
  );
}
