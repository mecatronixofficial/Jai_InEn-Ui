export default function Loading() {
  return (
    <div className="min-h-[60vh] grid place-items-center bg-cream-50">
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-cream-200" />
          <div className="absolute inset-0 rounded-full border-4 border-gold border-t-transparent animate-spin" />
        </div>
        <p className="text-[11px] uppercase tracking-widest-x text-maroon-800 font-semibold">
          Loading…
        </p>
      </div>
    </div>
  );
}
