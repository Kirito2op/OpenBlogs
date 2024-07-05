export default function FullScreenSpinner() {
  return (
    <div
      className="fixed inset-0 flex gap-2 items-center justify-center bg-black bg-opacity-75"
      style={{ zIndex: 999 }}
    >
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-blue-600 rounded-full animate-bounce"></div>
    </div>
  );
}
