import { useState, useEffect, useRef, CSSProperties } from 'react';

type AppImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  style?: CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
};

export default function AppImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  style,
  onLoad,
  onError,
}: AppImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Cached/local images can finish loading before React attaches the
  // onLoad handler, which would otherwise leave the image stuck at opacity-0.
  // Check the `complete` flag on mount (and when src changes) to recover.
  useEffect(() => {
    setLoaded(false);
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
      onLoad?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  const imgClass = `${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`;

  if (fill) {
    return (
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={onError}
        className={`absolute inset-0 h-full w-full object-cover ${imgClass}`}
        style={style}
      />
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={handleLoad}
      onError={onError}
      className={imgClass}
      style={style}
    />
  );
}
