import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { motion } from "framer-motion";

const SendEmailJs = ({
  modalMessage,
  isModalVisible,
  closeModal,
  showStatus,
  setShow,
}) => {
  return (
    <>
      {isModalVisible && (
        <motion.Row
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            zIndex: 3,
            top: "12em",
            width: "100%"
          }}
        >
          <Row>
            <Col xs={6} style={{
            width: "100%"
          }}>
              {" "}
              <Toast
                onClose={() => {
                  setShow(false);
                  closeModal();
                }}
                show={showStatus}
                delay={5000}
                autohide
              >
                <Toast.Header>
                  <strong className="me-auto">{modalMessage}</strong>
                </Toast.Header>
              </Toast>
            </Col>
          </Row>
        </motion.Row>
      )}
    </>
  );
};

export default SendEmailJs;
