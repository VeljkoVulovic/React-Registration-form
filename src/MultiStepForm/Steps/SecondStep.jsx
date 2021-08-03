import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";
import {
  SolutionOutlined,
  MailOutlined,
  LockOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import FormDataContext from "../context/FormDataContext";
import { useTranslation } from "react-i18next";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
// password regex changed

export default function SecondStep({ setStep }) {
  const { data, setValues } = useContext(FormDataContext);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: data?.username,
      email: data?.email,
      password: data?.password,
      password_confirm: data?.password_confirm,
    },
  });

  const onSubmit = (secondStepData) => {
    setValues(secondStepData);
    setStep(2);
  };

  return (
    <Form onSubmitCapture={handleSubmit(onSubmit)} layout="vertical">
      <Form.Item
        label={t("fields.username")}
        help={errors["username"] && errors["username"].message}
        validateStatus={errors["username"] && "error"}
        hasFeedback
      >
        <Controller
          name="username"
          control={control}
          rules={{
            required: {
              value: true,
              message: t("errorMessages.required"),
            },
            minLength: {
              value: 4,
              message: t("errorMessages.min_length"),
            },
            maxLength: {
              value: 20,
              message: t("errorMessages.max_length"),
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<SolutionOutlined />}
              allowClear
              type="string"
              placeholder={t("fields.username")}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={t("fields.email")}
        help={errors["email"] && errors["email"].message}
        validateStatus={errors["email"] && "error"}
        hasFeedback
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: {
              value: true,
              message: t("errorMessages.required"),
            },
            pattern: {
              value: emailRegex,
              message: t("errorMessages.email_valid"),
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<MailOutlined />}
              allowClear
              type="string"
              placeholder={t("fields.email")}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={t("fields.password")}
        help={errors["password"] && errors["password"].message}
        validateStatus={errors["password"] && "error"}
        hasFeedback
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Password
              {...field}
              prefix={<LockOutlined />}
              allowClear
              type="password"
              placeholder={t("fields.password")}
            />
          )}
          rules={{
            required: {
              value: true,
              message: t("errorMessages.required"),
            },
            pattern: {
              value: passwordRegex,
              message: t("errorMessages.password_strength"),
            },
          }}
        />
      </Form.Item>

      <Form.Item
        label={t("fields.password_confirm")}
        help={errors["password_confirm"] && errors["password_confirm"].message}
        validateStatus={errors["password_confirm"] && "error"}
        hasFeedback
      >
        <Controller
          name="password_confirm"
          control={control}
          render={({ field }) => (
            <Input.Password
              {...field}
              prefix={<LockOutlined />}
              allowClear
              type="password"
              placeholder={t("fields.password_confirm")}
            />
          )}
          rules={{
            required: {
              value: true,
              message: t("errorMessages.required"),
            },
            pattern: {
              value: passwordRegex,
              message: t("errorMessages.password_strength"),
            },
            validate: (value) => {
              if (value === getValues()["password"]) {
                return true;
              } else {
                return t("errorMessages.password_match");
              }
            },
          }}
        />
      </Form.Item>

      <div className="form-buttons">
        <Button
          className="back-button"
          icon={<ArrowLeftOutlined />}
          onClick={() => setStep(0)}
        >
          {t("buttons.back")}
        </Button>
        <Button type="primary" htmlType="submit" icon={<ArrowRightOutlined />}>
          {t("buttons.nextStep")}
        </Button>
      </div>
    </Form>
  );
}

SecondStep.propTypes = {
  setStep: PropTypes.func,
};
