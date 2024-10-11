'use client';

import Button from '../ui/button';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col justify-center items-center pt-52 gap-1.5">
      <h2 className="text-3xl font-bold">Something went wrong!</h2>
      <p>{error.message}</p>
      <Button onClick={() => reset()} className="py-2 px-4">
        Try again
      </Button>
    </div>
  );
}
