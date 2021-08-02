import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button, Descriptions, message } from "antd";
import FormDataContext from "../Context/FormDataContext";

export default function ReviewStep({ setStep }) {
  const { data, setData } = useContext(FormDataContext);

  const promiseData = {
    fields: [
      {
        code: "fname",
        valueStr: data?.fname,
        dataType: "string",
      },
      {
        code: "lname",
        valueStr: data?.lname,
        dataType: "string",
      },
      {
        code: "username",
        valueStr: data?.username,
        dataType: "string",
      },
      {
        code: "email",
        valueStr: data?.email,
        dataType: "string",
      },
      {
        code: "password",
        valueStr: data?.password,
        dataType: "string",
      },
      {
        code: "password_confirm",
        valueStr: data?.password_confirm,
        dataType: "string",
      },
    ],
  };

  const key = "updatable";

  const submitRegistration = (fields) => {
    message.loading({ content: "Loading...", key });
    return new Promise(
      (fulfill) => {
        //success
        setTimeout(() => {
          fulfill(
            message.success({
              content:
                "User " +
                fields.fields[0].valueStr +
                " registered successfully!",
              key,
              duration: 3,
            })
          );
        }, 1000); // 2000 for test
      },
      (reject) => {
        // error
        setTimeout(() => {
          reject(
            message.error({
              content:
                "User " +
                fields.fields[0].valueStr +
                " registered successfully!",
              key,
              duration: 3,
            })
          );
        }, 1000); // 2000 for test
      }
    );
  };

  const resetForm = () => {
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
          <Button
            type="primary"
            onClick={() => submitRegistration(promiseData)}
          >
            Register
          </Button>
          <Button className="reset-button" type="dashed" onClick={() => resetForm()}>
            Reset
          </Button>
        </div>
      </div>
    </>
  );
}

ReviewStep.propTypes = {
  setStep: PropTypes.func,
};
