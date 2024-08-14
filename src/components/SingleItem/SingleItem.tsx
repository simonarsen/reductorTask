import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ChangeEvent, FC, useState } from "react";
import { ItemType } from "../../types/itemType";

import styles from "./SingleItem.module.scss";
import { ModalTextType } from "../Layout/Layout";
import ModalDialog from "../ModalDialog";

interface SingleItemProps {
  item: ItemType;
  modalText: ModalTextType;
  isOpenModal: boolean;
  value: string;
  newItem: ItemType;
  handleOpenModal: (item: ItemType, txt: ModalTextType) => void;
  handleSetValue: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCloseModal: () => void;
  handleClick: (item: ItemType) => void;
}

const SingleItem: FC<SingleItemProps> = ({
  item,
  modalText,
  isOpenModal,
  value,
  newItem,
  handleOpenModal,
  handleCloseModal,
  handleSetValue,
  handleClick,
}) => {
  const [isItemOpen, setIsItemOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsItemOpen(false);
  };

  const handleOpen = () => {
    setIsItemOpen(true);
  };

  return (
    <div className={styles.content}>
      <div key={item.id} className={styles.main}>
        <div className={styles.item}>
          {isItemOpen ? (
            <KeyboardArrowRightIcon
              onClick={handleClose}
              sx={{ cursor: "pointer" }}
            />
          ) : (
            <KeyboardArrowDownIcon
              onClick={handleOpen}
              sx={{ cursor: "pointer" }}
            />
          )}
          <span>{item.name}</span>
          {item.name === "events" ? (
            <AddCircleOutlineIcon
              sx={{ color: "blue", cursor: "pointer" }}
              onClick={() => handleOpenModal(item, "Add")}
            />
          ) : (
            <div className={styles.icons}>
              <AddCircleOutlineIcon
                sx={{ color: "blue", cursor: "pointer" }}
                onClick={() => handleOpenModal(item, "Add")}
              />
              <ModeEditOutlinedIcon
                sx={{ color: "blue", cursor: "pointer" }}
                onClick={() => handleOpenModal(item, "Rename")}
              />
              <DeleteForeverIcon
                sx={{ color: "red", cursor: "pointer" }}
                onClick={() => handleOpenModal(item, "Delete")}
              />
            </div>
          )}
        </div>
        {item.children.length && isItemOpen ? (
          item.children.map((child) => (
            <div style={{ paddingLeft: "20px" }} key={child.id}>
              <SingleItem
                key={child.id}
                item={child}
                modalText={modalText}
                isOpenModal={isOpenModal}
                value={value}
                newItem={newItem}
                handleOpenModal={handleOpenModal}
                handleSetValue={handleSetValue}
                handleCloseModal={handleCloseModal}
                handleClick={handleClick}
              />
            </div>
          ))
        ) : (
          <></>
        )}
        {isOpenModal && (
          <ModalDialog
            isOpenModal={isOpenModal}
            value={value}
            modalText={modalText}
            item={newItem}
            handleSetValue={handleSetValue}
            handleCloseModal={handleCloseModal}
            handleClick={handleClick}
          />
        )}
      </div>
    </div>
  );
};

export default SingleItem;
