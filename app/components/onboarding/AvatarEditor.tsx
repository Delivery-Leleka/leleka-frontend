import React, { useState } from 'react';
import Cropper, { type Area } from 'react-easy-crop';

type Props = {
  src: string;
};

function AvatarEditor({ src }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  };
  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 p-4">
      <div className="flex h-[90vh] max-h-128 w-full max-w-sm flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex shrink-0 justify-between p-4">
          <button>Скасувати</button>
          <button>Зберегти</button>
        </div>

        <div className="relative min-h-0 flex-1">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropShape="round"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}

export default AvatarEditor;
