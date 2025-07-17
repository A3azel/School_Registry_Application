import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({
  show = false,
  school = null,
  onClose = () => {},
  onConfirm = () => {},
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show) {
      setLoading(false);
    }
  }, [show]);

  if (!school) return null;

  const isDeactivation = school.active;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(school.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isDeactivation ? "Deactivate School" : "Activate School"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to{" "}
        <strong>{isDeactivation ? "deactivate" : "activate"}</strong> the
        school: <strong>{school.name}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant={isDeactivation ? "danger" : "success"}
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading
            ? isDeactivation
              ? "Deactivating..."
              : "Activating..."
            : isDeactivation
            ? "Deactivate"
            : "Activate"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
