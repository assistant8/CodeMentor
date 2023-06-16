// import styles from "./ModalWithButton.module.scss";
// import { Modal } from "./index.jsx";
// import { SmallVioletButton } from "../buttons/SmallVioletButton";

// export const ModalWithButton = ({
//   Modal_isOpen,
//   Modal_closeModal,
//   Modal_children,
// }) => {
// 누르면 모달 띄우게 하려는 버튼 컴포넌트에서 아래 설정
//const [isOpen, setIsOpen] = useState(false);
//const openModal = () => {
//  setIsOpen(true);
//};
//const closeModal = () => {
//  setIsOpen(false);
//};

//   return (
//     <Modal children={Modal_children} onClick={Modal_closeModal} onClick={}>
//       <SmallVioletButton />
//     </Modal>
//   );
// };

//   const handleModalClick = (e) => {
//     e.stopPropagation();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className={styles.reactModalOverlay} onClick={closeModal}>
//       <div className={styles.reactModal} onClick={handleModalClick}>
//         {children}
//       </div>
//     </div>
//   );
// };

// import React from "react";
// import styles from "./SmallVioletButton.module.scss";

// export const SmallVioletButton = React.forwardRef(
//   ({ children, onClick }, ref) => {
//     return (
//       <button ref={ref} className={styles.smallVioletButton} onClick={onClick}>
//         {children}
//       </button>
//     );
