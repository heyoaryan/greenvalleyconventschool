import { useEffect, useRef, useState } from 'react';

type PreloaderProps = {
  isTransitioning: boolean;
  onFinish: () => void;
};

export default function Preloader({ isTransitioning, onFinish }: PreloaderProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate(0px, 0px) scale(1)');
  const [hasStartedExit, setHasStartedExit] = useState(false);

  useEffect(() => {
    if (!isTransitioning || hasStartedExit) return;
    setHasStartedExit(true);

    const logoEl = logoRef.current;
    const targetEl = document.getElementById('site-logo');

    if (logoEl && targetEl) {
      const sourceRect = logoEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const deltaX =
        targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2);
      const deltaY =
        targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2);
      const scale = targetRect.width / sourceRect.width || 0.4;

      requestAnimationFrame(() => {
        setTransform(`translate(${deltaX}px, ${deltaY}px) scale(${scale})`);
      });

      const timeout = setTimeout(onFinish, 900);
      return () => clearTimeout(timeout);
    }

    const fallbackTimeout = setTimeout(onFinish, 500);
    return () => clearTimeout(fallbackTimeout);
  }, [isTransitioning, onFinish, hasStartedExit]);

  return (
    <div
      className={`fixed inset-0 z-[120] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div
        ref={logoRef}
        style={{
          transform,
          transformOrigin: 'center',
        }}
        className={`flex flex-col items-center gap-5 transition-transform duration-700 ease-in-out ${
          isTransitioning ? 'drop-shadow-xl' : ''
        }`}
      >
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full shadow-2xl bg-white flex items-center justify-center overflow-hidden animate-preloader-pulse border-4 border-green-100">
          <img
            src="/logo/logo.png"
            alt="Green Valley Convent School Logo"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
          />
        </div>
        <div className="text-center">
          <p className="text-xl sm:text-2xl font-bold text-green-700 tracking-wide uppercase">
            Green Valley
          </p>
          <p className="text-sm sm:text-base text-gray-500 tracking-[0.3em]">
            CONVENT SCHOOL
          </p>
        </div>
      </div>
    </div>
  );
}

