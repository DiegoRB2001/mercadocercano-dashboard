import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

const CustomModal = ({
  buttonContent = "Si",
  buttonColor = "default",
  buttonRadius = "md",
  isButtonIconOnly = false,
  buttonSize = "md",
  buttonClassName = "mb-5",
  onConfirm,
  disabled = false,
  modalMessage = "Mensaje por defecto",
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        color={buttonColor}
        size={buttonSize}
        radius={buttonRadius}
        isIconOnly={isButtonIconOnly}
        className={buttonClassName}
      >
        {buttonContent}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        isDismissable
        backdrop="opaque"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmación
              </ModalHeader>
              <ModalBody>
                <p>{modalMessage}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  isDisabled={disabled}
                >
                  No
                </Button>
                <Button
                  color="success"
                  type="submit"
                  onPress={async () => {
                    await onConfirm();
                    onClose();
                  }}
                  isLoading={disabled}
                >
                  Si
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
