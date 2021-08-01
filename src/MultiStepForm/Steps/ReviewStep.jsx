import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button, Descriptions } from "antd";
import FormDataContext from "../context/FormDataContext";

export default function ReviewStep({ setStep }) {
  const { data, setData } = useContext(FormDataContext);

  const handleSubmit = () => {
    alert("Success");
    setData({});
    setStep(0);
  };

  return (
    <>
      <Descriptions
        bordered
        size="small"
        column={1}
        labelStyle={{ textAlign: "center" }}
      >
        <Descriptions.Item label="First name">{data?.fname}</Descriptions.Item>
        <Descriptions.Item label="Last name">{data?.lname}</Descriptions.Item>
        <Descriptions.Item label="Address">{data?.address}</Descriptions.Item>
        <Descriptions.Item label="Username">{data?.username}</Descriptions.Item>
        <Descriptions.Item label="E-mail">{data?.email}</Descriptions.Item>
        <Descriptions.Item label="Password">{data?.password}</Descriptions.Item>
        <Descriptions.Item label="Password Confirmation">
          {data?.password_confirm}
        </Descriptions.Item>
      </Descriptions>
      <div className="form-buttons">
        <div className="register-button">
          <Button className="back-button" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            Register
          </Button>
        </div>
      </div>
    </>
  );
}

ReviewStep.propTypes = {
  setStep: PropTypes.func,
};
