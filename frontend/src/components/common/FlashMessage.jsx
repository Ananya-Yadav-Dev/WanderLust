import { useFlash } from '../../hooks/useFlash';

const FlashMessage = () => {
  const { flash, clearFlash } = useFlash();

  if (!flash.message) return null;

  const alertClass = flash.type === 'error' ? 'alert-warning' : 'alert-success';

  return (
    <div className={`alert ${alertClass} alert-dismissible fade show col-6 offset-3`} role="alert">
      {flash.message}
      <button
        type="button"
        className="btn-close"
        onClick={clearFlash}
        aria-label="Close"
      ></button>
    </div>
  );
};

export default FlashMessage;
