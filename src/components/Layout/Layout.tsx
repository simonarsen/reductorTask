import { ChangeEvent, useEffect, useState } from "react";
import { ItemType } from "../../types/itemType";
import axios from "axios";
import { api, baseURL } from "../../constants/URLs";
import { treeName } from "../../constants/treeName";
import styles from "./Layout.module.scss";
import SingleItem from "../SingleItem";

export type ModalTextType = "Add" | "Rename" | "Delete";

const Layout = () => {
  const [root, setRoot] = useState<ItemType>({
    children: [],
    id: 1,
    name: treeName,
  });
  const [parentNodeId, setParentNodeId] = useState<number>(0);
  const [value, setValue] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalText, setModalText] = useState<ModalTextType>("Add");
  const [item, setItem] = useState<ItemType>(root);

  useEffect(() => {
    const response = axios({
      method: "post",
      url: baseURL + `${api}.get?treeName=${treeName}`,
    });

    response.then((res) => {
      setRoot(res.data);
    });
  }, []);

  const handleSetValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const handleOpenModal = (item: ItemType, txt: ModalTextType) => {
    setModalText(txt);
    setIsOpenModal(true);
    setParentNodeId(item.id);
    setItem(item);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleAdd = async () => {
    await axios({
      method: "post",
      url:
        baseURL +
        `${api}.node.create?treeName=${treeName}&parentNodeId=${parentNodeId}&nodeName=${value}`,
    });
    handleCloseModal();
  };

  const handleEdit = async (item: ItemType) => {
    await axios({
      method: "post",
      url:
        baseURL +
        `${api}.node.rename?treeName=${treeName}&nodeId=${item.id}&newNodeName=${value}`,
    });
    handleCloseModal();
  };

  const handleDelete = async (item: ItemType) => {
    await axios({
      method: "post",
      url:
        baseURL + `${api}.node.delete?treeName=${treeName}&nodeId=${item.id}`,
    });
    handleCloseModal();
  };

  const handleClick = (item: ItemType) => {
    if (modalText === "Add") {
      handleAdd();
    }
    if (modalText === "Rename") {
      handleEdit(item);
    }
    if (modalText === "Delete") {
      handleDelete(item);
    }
  };

  return (
    <div className={styles.layout}>
      <div>
        <SingleItem
          key={root.id}
          item={root}
          modalText={modalText}
          isOpenModal={isOpenModal}
          value={value}
          newItem={item}
          handleOpenModal={handleOpenModal}
          handleSetValue={handleSetValue}
          handleCloseModal={handleCloseModal}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Layout;
