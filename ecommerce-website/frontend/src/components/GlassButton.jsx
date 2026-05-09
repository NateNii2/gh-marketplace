export default function GlassButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-full bg-black text-white py-4 text-sm font-medium tracking-wide
                 hover:bg-black/90 transition active:scale-[0.98]"
    >
      {children}
    </button>
  );
}
