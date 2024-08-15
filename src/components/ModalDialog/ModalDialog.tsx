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
import { FC } from "react";
import { IProps } from "../../types/propsType";

const ModalDialog: FC<IProps> = ({
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
