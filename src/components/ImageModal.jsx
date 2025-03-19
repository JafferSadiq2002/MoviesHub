

const ImageModal = ({ src, onClose }) => {
  if (!src) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <img src={src} alt="Movie Poster" className="max-w-full max-h-full" />
    </div>
  );
};

export default ImageModal;
