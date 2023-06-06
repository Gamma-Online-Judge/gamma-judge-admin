import React from "react";
import { Button } from "react-bootstrap";
import './styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface SaveFooterProps {
  onSave?: () => Promise<void>;
  onDelete?: () => Promise<void>;
  onGet?: () => Promise<void>;
  isSaveDisabled?: boolean;
  isDeleteDisabled?: boolean;
}

export default function SaveFooter({ onSave = async () => undefined, onDelete = async () => undefined, onGet = async () => undefined, isSaveDisabled = false, isDeleteDisabled = false }: SaveFooterProps) {

  const [isGetting, setIsGetting] = React.useState(false);

  function handleSave() {
    toast.promise(
      onSave,
      {
        pending: 'Salvando...',
        success: 'Salvo com sucesso!',
        error: 'Erro ao salvar!',
      }
    );
  }

  function handleDelete() {
    toast.promise(
      onDelete,
      {
        pending: 'Deletando...',
        success: 'Deletado com sucesso!',
        error: 'Erro ao deletar!',
      }
    )
  }

  async function handleGet() {
    setIsGetting(true);
    try {
      await onGet();
    }
    catch {
      toast.error('Erro ao recuperar dadaos!');
    }
    finally {
      setIsGetting(false);
    }
  }


  return (
    <>
      <ToastContainer />
      <div className="save-footer">
        <div>
          <Button
            variant="danger"
            className="delete-button"
            onClick={handleDelete}
            disabled={isDeleteDisabled}
          >
            Delete
          </Button>
        </div>
        <div className="save-button-container">
          <Button
            variant="success"
            className="get-button"
            onClick={handleGet}
            disabled={isGetting}
          >
            {isGetting ? 'Recuperando dados...' : 'Recuperar dados'}
          </Button>

          <Button
            variant="primary"
            className="save-button"
            onClick={handleSave}
            disabled={isSaveDisabled}
          >
            Salvar
          </Button>
        </div>

      </div>
    </>
  );
}