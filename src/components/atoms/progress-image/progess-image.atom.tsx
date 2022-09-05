import React, { useMemo, useState } from 'react';

type ImageProps = {
  src: string;
  className?: string;
};

const ProgressiveImage: React.FC<ImageProps> = ({
  src,
  className,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);

  useMemo(() => {
    if (typeof window === 'undefined') return;
    setLoading(true);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoading(false);
    };
  }, [src]);

  return (
    <img
      {...rest}
      src={src}
      className={`${className} ${loading ? 'blur-sm' : ''}`}
      alt={src}
      loading="lazy"
    />
  );
};

export default React.memo(ProgressiveImage);
