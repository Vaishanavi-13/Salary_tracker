export default function Pagination({
  currentPage,
  totalPages = 200,
  onPrev,
  onNext,
  onJump
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
      
      {/* Left Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className={`
            px-4 py-2 rounded font-medium border
            ${currentPage === 1
              ? "bg-msrtc-light text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-msrtc-light border-gray-300"}
          `}
        >
          ◀ Previous
        </button>

        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className={`
            px-4 py-2 rounded font-medium border
            ${currentPage === totalPages
              ? "bg-msrtc-light text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-msrtc-light border-gray-300"}
          `}
        >
          Next ▶
        </button>
      </div>

      {/* Page Indicator */}
      <div className="text-sm font-semibold text-gray-700">
        Sheet {currentPage} of {totalPages}
      </div>

      {/* Jump to Page */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Go to:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          placeholder="#"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = Number(e.target.value);
              if (value >= 1 && value <= totalPages) {
                onJump(value);
                e.target.value = "";
              }
            }
          }}
          className="w-20 border border-gray-300 rounded px-2 py-1
                     focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>

    </div>
  );
}