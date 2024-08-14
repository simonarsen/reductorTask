import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
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

  return (
    <Box>
      <Dialog open={isOpenModal} sx={{ width: "100%" }}>
        <DialogTitle>{modalText}</DialogTitle>
        <DialogContent>
          {!isDelete ? (
            <form action="">
              <TextField
                label="Node Name"
                fullWidth
                value={value}
                onChange={(e) => handleSetValue(e)}
              />
            </form>
          ) : (
            <Typography>Do you want to delete {item.name}</Typography>
          )}
        </DialogContent>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" onClick={() => handleClick(item)}>
            {modalText}
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ModalDialog;
