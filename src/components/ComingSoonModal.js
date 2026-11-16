import { X, Sparkles } from 'lucide-react';

export default function ComingSoonModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-xl max-w-sm w-full p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <span className="inline-flex w-14 h-14 rounded-full bg-primary/10 text-primary items-center justify-center mb-4">
          <Sparkles size={26} />
        </span>
        <h3 className="text-xl font-bold mb-2">Courses Launching Soon!</h3>
        <p className="text-gray-600">
          We&rsquo;re putting the finishing touches on our courses. Check back
          soon, or follow us on Instagram for updates.
        </p>
      </div>
    </div>
  );
}
