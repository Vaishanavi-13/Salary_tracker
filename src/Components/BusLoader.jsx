export default function BusLoader() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">

      <div className="text-center">

        <img
          src="/img4.png"
          alt="bus"
          className="w-40 animate-pulse"
        />

        <p className="mt-4 text-lg font-semibold text-red-600">
          Loading...
        </p>

      </div>

    </div>
  );
}