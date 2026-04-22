import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

const POINTER_MEDIA_QUERY = '(hover: hover) and (pointer: fine)';

function CursorHalo() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const haloX = useSpring(x, { stiffness: 260, damping: 32, mass: 0.45 });
  const haloY = useSpring(y, { stiffness: 260, damping: 32, mass: 0.45 });
  const trailX = useSpring(x, { stiffness: 140, damping: 28, mass: 0.6 });
  const trailY = useSpring(y, { stiffness: 140, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(POINTER_MEDIA_QUERY);

    const updateEnabled = () => {
      setEnabled(media.matches && !reduceMotion);
    };

    updateEnabled();

    if (media.addEventListener) {
      media.addEventListener('change', updateEnabled);
      return () => media.removeEventListener('change', updateEnabled);
    }

    media.addListener(updateEnabled);
    return () => media.removeListener(updateEnabled);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const hideCursorHalo = () => setVisible(false);

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerleave', hideCursorHalo);
    document.addEventListener('visibilitychange', hideCursorHalo);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerleave', hideCursorHalo);
      document.removeEventListener('visibilitychange', hideCursorHalo);
    };
  }, [enabled, x, y]);

  if (!enabled) {
    return null;
  }

  const opacity = visible ? 1 : 0;

  return (
    <>
      <motion.div className="cursor-trail" style={{ left: trailX, top: trailY, opacity }} />
      <motion.div className="cursor-halo" style={{ left: haloX, top: haloY, opacity }} />
    </>
  );
}

export default CursorHalo;