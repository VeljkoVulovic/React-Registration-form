import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";
import {
  SolutionOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import FormDataContext from "../Context/FormDataContext";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
// password regex changed

export default function SecondStep({ setStep }) {
  const { data, setValues } = useContext(FormDataContext);

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
        label={"Username"}
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
              message: "This field is required",
            },
            minLength: {
              value: 4,
              message: "Min length not met",
            },
            maxLength: {
              value: 20,
              message: "Max length not met",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<SolutionOutlined className="site-form-item-icon" />}
              allowClear
              type="string"
              placeholder={"Username"}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={"E-mail"}
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
              message: "This field is required",
            },
            pattern: {
              value: emailRegex,
              message: "Email validation failed",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<MailOutlined className="site-form-item-icon" />}
              allowClear
              type="string"
              placeholder={"E-mail"}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={"Password"}
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
              prefix={<LockOutlined className="site-form-item-icon" />}
              allowClear
              type="password"
              placeholder={"Password"}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "This field is required",
            },
            pattern: {
              value: passwordRegex,
              message: "Password strength failed",
            },
          }}
        />
      </Form.Item>

      <Form.Item
        label={"Password Confirmation"}
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
              prefix={<LockOutlined className="site-form-item-icon" />}
              allowClear
              type="password"
              placeholder={"Password Confirmation"}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "This field is required",
            },
            pattern: {
              value: passwordRegex,
              message: "Password strength failed",
            },
            validate: (value) => {
              if (value === getValues()["password"]) {
                return true;
              } else {
                return "The passwords do not match";
              }
            },
          }}
        />
      </Form.Item>

      <div className="form-buttons">
        <Button className="back-button" onClick={() => setStep(0)}>
          Back
        </Button>
        <Button type="primary" htmlType="submit">
          Next Step
        </Button>
      </div>
    </Form>
  );
}

SecondStep.propTypes = {
  setStep: PropTypes.func,
};
