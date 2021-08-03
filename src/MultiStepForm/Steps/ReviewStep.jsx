import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button, Descriptions, message } from "antd";
import {
  RollbackOutlined,
  UploadOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import FormDataContext from "../context/FormDataContext";
import { useTranslation } from "react-i18next";

export default function ReviewStep({ setStep }) {
  const { data, setData } = useContext(FormDataContext);
  const { t } = useTranslation();

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
    message.loading({
      content: t("registration.loading"),
      key,
    });
    return new Promise((fulfill, reject) => {
      setTimeout(() => {
        const error = false; //change boolean to test
        if (!error) {
          //success
          fulfill(
            message.success({
              content:
                t("registration.user") +
                fields.fields[0].valueStr +
                t("registration.successfully"),
              key,
              duration: 3,
            })
          );
        } else {
          //error
          reject(
            message.error({
              content:
                t("registration.user") +
                fields.fields[0].valueStr +
                t("registration.unsuccessfully"),
              key,
              duration: 3,
            })
          );
        }
      }, 1000);
    });
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
        <Descriptions.Item label={t("fields.fname")}>
          {data?.fname}
        </Descriptions.Item>
        <Descriptions.Item label={t("fields.lname")}>
          {data?.lname}
        </Descriptions.Item>
        <Descriptions.Item label={t("fields.address")}>
          {data?.address}
        </Descriptions.Item>
        <Descriptions.Item label={t("fields.username")}>
          {data?.username}
        </Descriptions.Item>
        <Descriptions.Item label={t("fields.email")}>
          {data?.email}
        </Descriptions.Item>
        <Descriptions.Item label={t("fields.password")}>
          {data?.password}
        </Descriptions.Item>
        <Descriptions.Item label={t("fields.password_confirm")}>
          {data?.password_confirm}
        </Descriptions.Item>
      </Descriptions>
      <div className="form-buttons">
        <div className="register-button">
          <Button
            className="back-button"
            icon={<ArrowLeftOutlined />}
            onClick={() => setStep(1)}
          >
            {t("buttons.back")}
          </Button>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={() => submitRegistration(promiseData)}
          >
            {t("buttons.register")}
          </Button>
          <Button
            className="reset-button"
            danger
            type="dashed"
            icon={<RollbackOutlined />}
            onClick={() => resetForm()}
          >
            {t("buttons.reset")}
          </Button>
        </div>
      </div>
    </>
  );
}

ReviewStep.propTypes = {
  setStep: PropTypes.func,
};
