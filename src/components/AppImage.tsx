import { useState, CSSProperties } from 'react';

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

  const imgClass = `${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`;

  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => {
          setLoaded(true);
          onLoad?.();
        }}
        onError={onError}
        className={`absolute inset-0 h-full w-full object-cover ${imgClass}`}
        style={style}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => {
        setLoaded(true);
        onLoad?.();
      }}
      onError={onError}
      className={imgClass}
      style={style}
    />
  );
}
