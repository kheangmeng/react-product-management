import { ImageIcon, TrashIcon } from "lucide-react"
import { type ChangeEvent, useState } from "react";

interface ImageUploadProp {
  value?: string;
  onRemove?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
}

export function ImageUpload(props: ImageUploadProp) {
  const [imgUrl, setImgUrl] = useState(props.value);

  return (
    imgUrl
      ? <div className="flex flex-col items-center gap-6 text-sm text-orange-500">
          <img src={imgUrl} alt="img upload" />
          <button
            type="button"
            className="border rounded py-1 px-2 flex items-center gap-2"
            onClick={() => {
              URL.revokeObjectURL(imgUrl);
              setImgUrl('');
              if(props.onRemove) props.onRemove();
            }}
          >
            <TrashIcon />
            <span>REMOVE</span>
          </button>
        </div>
      :
        <>
          <label htmlFor="img-upload" className="border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-surface-container-low transition-colors cursor-pointer group">
            <div className="w-16 h-16 mb-4 rounded-full bg-surface-container-high flex items-center justify-center group-hover:scale-110 transition-transform">
              <ImageIcon className="text-secondary text-3xl" />
            </div>
            <p className="font-label-md text-label-md text-primary mb-1">
              Click to upload or drag and drop
            </p>
            <p className="font-body-md text-sm text-secondary">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </label>
          <input
            type="file"
            hidden
            id="img-upload"
            onChange={(e) => {
              const temp = e.target.files?.[0] || null;
              if (temp) {
                const fileUrl = URL.createObjectURL(temp);
                setImgUrl(fileUrl);
                if(props.onChange) props.onChange(e, fileUrl);
              }
            }}
          />
        </>
  )
}
