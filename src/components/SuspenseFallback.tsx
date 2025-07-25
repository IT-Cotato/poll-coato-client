export default function SuspenseFallback() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-violet-500 font-sans">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-violet-500 rounded-full animate-spin mb-4" />
      <span className="text-lg font-semibold">로딩중...</span>
    </div>
  );
}
