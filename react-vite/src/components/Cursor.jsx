import { useEffect, useRef } from 'react';

const Cursor = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let outerX = 0, outerY = 0;
    let targetX = 0, targetY = 0;
    let raf;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      // Inner dot follows immediately
      inner.style.left = `${targetX}px`;
      inner.style.top  = `${targetY}px`;
    };

    // Outer ring follows with lag (smooth lerp)
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      outerX = lerp(outerX, targetX, 0.13);
      outerY = lerp(outerY, targetY, 0.13);
      outer.style.left = `${outerX}px`;
      outer.style.top  = `${outerY}px`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // Hover detection on interactive elements
    const interactables = 'a, button, input, select, textarea, [role="button"], .tbtn, .lang-btn, .mic-btn, .call-btn, .scheme-card, .dash-card';

    const onOver = (e) => {
      if (e.target.closest(interactables)) document.body.classList.add('cur-hover');
    };
    const onOut = (e) => {
      if (e.target.closest(interactables)) document.body.classList.remove('cur-hover');
    };

    // Click feedback
    const onDown = () => document.body.classList.add('cur-click');
    const onUp   = () => document.body.classList.remove('cur-click');

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
      document.body.classList.remove('cur-hover', 'cur-click');
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="cursor-outer" />
      <div ref={innerRef} className="cursor-inner" />
    </>
  );
};

export default Cursor;
