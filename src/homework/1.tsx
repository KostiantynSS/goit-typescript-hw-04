
import React, { useEffect, useRef } from 'react';

// Опишіть Props
interface Props{
  children:React.ReactElement,
  onContentEndVisible:()=>void
}
class Options{

  constructor(  public rootMargin: string,
    public threshold: number,
    public root:Element|null){}
}
// interface IntersectionObserverInit {
//   root?: Element | null;
//   rootMargin?: string;
//   threshold?: number;
// }
export function Observer({ children, onContentEndVisible }: Props) {
  // Вкажіть правильний тип для useRef зверніть увагу, в який DOM елемент ми його передаємо
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип
    const options:Options= new Options('0px',1.0,null)
    // const options:IntersectionObserverInit = {
    //   rootMargin: '0px',
    //   threshold: 1.0,
    //   root: null,
    // };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return ():void => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
