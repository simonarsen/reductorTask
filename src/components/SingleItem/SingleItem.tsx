import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { FC, useState } from "react";

import styles from "./SingleItem.module.scss";
import ModalDialog from "../ModalDialog";
import { IProps } from "../../types/propsType";

const SingleItem: FC<IProps> = ({
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
              onClick={() => handleOpenModal && handleOpenModal(item, "Add")}
            />
          ) : (
            <div className={styles.icons}>
              <AddCircleOutlineIcon
                sx={{ color: "blue", cursor: "pointer" }}
                onClick={() => handleOpenModal && handleOpenModal(item, "Add")}
              />
              <ModeEditOutlinedIcon
                sx={{ color: "blue", cursor: "pointer" }}
                onClick={() =>
                  handleOpenModal && handleOpenModal(item, "Rename")
                }
              />
              <DeleteForeverIcon
                sx={{ color: "red", cursor: "pointer" }}
                onClick={() =>
                  handleOpenModal && handleOpenModal(item, "Delete")
                }
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
        {isOpenModal && newItem && (
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
