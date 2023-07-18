import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import './styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Input } from "@mui/material";

export interface SaveFooterProps {
  onSave?: () => Promise<void>;
  onDelete?: () => Promise<void>;
  onImport?: (el: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  isSaveDisabled?: boolean;
  isDeleteDisabled?: boolean;
}

export default function SaveFooter({ onSave = async () => undefined, onDelete = async () => undefined, onImport = async (el: React.ChangeEvent<HTMLInputElement>) => undefined, isDeleteDisabled = false }: SaveFooterProps) {

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

  function handleImport(file: React.ChangeEvent<HTMLInputElement>) {
    toast.promise(
      () => onImport(file),
      {
        pending: 'Importando...',
        success: 'Importado com sucesso!',
        error: 'Erro ao importar!',
      }
    )
  }

  return (
    <div className="save-footer">
      <ToastContainer />
      <Container maxWidth="lg">
        <Row>

        <Col>
          <Button
            variant="danger"
            className="delete-button"
            onClick={handleDelete}
            disabled={isDeleteDisabled}
            >
            Delete
          </Button>
        </Col>
        <Col className="save-button-container">
          <Button
            variant="primary"
            className="save-button"
            onClick={handleSave}
            >
            Salvar
          </Button>
        </Col>
        <Col>
          <input
            type="file"
            className="delete-button"
            onChange={handleImport}
            >
          </input>
        </Col>
        </Row>
      </Container>
    </div>
  );
}