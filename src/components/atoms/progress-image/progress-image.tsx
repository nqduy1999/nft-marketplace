import type { FunctionComponent } from 'react';
import { memo, useEffect, useRef, useState } from 'react';

type ImageProps = {
  src: string;
  className?: string;
};

const ProgressiveImage: FunctionComponent<ImageProps> = ({
  src,
  className,
  ...rest
}) => {
  const [blur, setBlur] = useState(true);
  const loadingImage = useRef<any>();

  useEffect(() => {
    if (loadingImage.current.complete) {
      setBlur(false);
    }

    loadingImage.current.addEventListener('load', () => {
      setBlur(false);
    });
  }, []);

  return (
    <div className={`relative overflow-hidden ${blur ? 'blur' : 'unblur'}`}>
      <img
        {...rest}
        className={`w-full ${className}`}
        alt="real-image"
        ref={loadingImage}
        src={src}
      />
    </div>
  );
};

export default memo(ProgressiveImage);
