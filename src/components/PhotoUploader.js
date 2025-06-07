import { useState, useRef } from 'react';

const PhotoUploader = ({ onUpload }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <button
        onClick={() => fileInputRef.current.click()}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Subir Foto
      </button>

      {preview && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Vista previa:</h3>
          <img 
            src={preview} 
            alt="Preview" 
            className="max-w-full h-auto rounded-md border border-gray-300"
          />
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;