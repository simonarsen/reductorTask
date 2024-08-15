import { ChangeEvent } from "react";
import { ModalTextType } from "../components/Layout/Layout";
import { ItemType } from "./itemType";

export interface IProps {
    item: ItemType;
    modalText: ModalTextType;
    isOpenModal: boolean;
    value: string;
    newItem?: ItemType;
    handleOpenModal?: (item: ItemType, txt: ModalTextType) => void;
    handleSetValue: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleCloseModal: () => void;
    handleClick: (item: ItemType) => void;
}