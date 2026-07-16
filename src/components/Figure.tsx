import React, { useState, useEffect, useCallback } from 'react';

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
}

const Figure: React.FC<FigureProps> = ({ src, alt, caption }) => {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  return (
    <>
      <figure className="my-8">
        <img
          src={src}
          alt={alt}
          onClick={() => setOpen(true)}
          className="rounded-lg cursor-zoom-in w-full object-contain transition-opacity hover:opacity-90"
        />
        {caption && (
          <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
            {caption}
          </figcaption>
        )}
      </figure>

      {open && (
        <div
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl max-h-[90vh] flex flex-col items-center"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute -top-10 right-0 text-white/70 hover:text-white text-3xl leading-none"
            >
              &times;
            </button>
            <img
              src={src}
              alt={alt}
              className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
            {caption && (
              <p className="mt-4 text-sm text-white/60 italic text-center">
                {caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Figure;
