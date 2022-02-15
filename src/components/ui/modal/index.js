import React from "react";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import "./styles.scss";

const CustomModal = ({ open, close, children, size }) => {
  return (
    <Modal
      open={open}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={open}>
        <Box className={`modal-body ${size === "small" ? "sm" : ""}`}>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
