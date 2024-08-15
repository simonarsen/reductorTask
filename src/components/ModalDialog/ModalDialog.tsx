import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC } from "react";
import { ModalTextType } from "../Layout/Layout";
import { ItemType } from "../../types/itemType";

interface ModalDialogProps {
  isOpenModal: boolean;
  value: string;
  modalText: ModalTextType;
  item: ItemType;
  handleSetValue: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCloseModal: () => void;
  handleClick: (item: ItemType) => void;
}

const ModalDialog: FC<ModalDialogProps> = ({
  value,
  isOpenModal,
  modalText,
  item,
  handleSetValue,
  handleCloseModal,
  handleClick,
}) => {
  const isDelete = modalText === "Delete";
  const isAdd = modalText === "Add";

  return (
    <Modal
      open={isOpenModal}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ minWidth: "500px", background: "white" }}>
        <DialogTitle>{modalText}</DialogTitle>
        <DialogContent>
          {!isDelete ? (
            <TextField
              label={isAdd ? "Node Name" : "New Node Name"}
              variant="filled"
              fullWidth
              value={value}
              onChange={(e) => handleSetValue(e)}
            />
          ) : (
            <Typography>
              Do you want to delete <b>{item.name}</b>
            </Typography>
          )}
        </DialogContent>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" onClick={() => handleClick(item)}>
            {modalText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDialog;
