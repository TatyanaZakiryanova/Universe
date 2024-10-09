'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col justify-center items-center pt-52 gap-1.5">
      <h2 className="text-3xl font-bold">Something went wrong!</h2>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        className="py-2 px-4 bg-customButton text-white border-none rounded-lg cursor-pointer transition-all duration-300 hover:bg-customButtonHover hover:-translate-y-1"
      >
        Try again
      </button>
    </div>
  );
}
