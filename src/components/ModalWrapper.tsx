import { Box, Button, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 280,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

type ModalComponentProps = {
  open: boolean;
  handleClose: () => void;
  content: ReactNode;
  useButton?: boolean;
};

const ModalWrapper = ({
  open,
  handleClose,
  content,
  useButton = false,
}: ModalComponentProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box flexGrow={1}>{content}</Box>
        {useButton && (
          <Button
            variant="contained"
            onClick={handleClose}
            fullWidth
            sx={{ marginTop: 2, alignSelf: "flex-end" }}
          >
            Закрыть
          </Button>
        )}
        {!useButton && (
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: "absolute", top: 0, right: 15 }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>
    </Modal>
  );
};

export default ModalWrapper;
