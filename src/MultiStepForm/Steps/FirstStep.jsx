import React, { useContext } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { UserOutlined, IdcardOutlined, HomeOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import FormDataContext from "../context/FormDataContext";
import PropTypes from "prop-types";

const FirstStep = ({ setStep }) => {
  const { data, setValues } = useContext(FormDataContext);

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      fname: data?.fname,
      lname: data?.lname,
      address: data?.address,
      terms: data?.terms,
    },
  });

  const onSubmit = (firstStepData) => {
    trigger();
    setValues(firstStepData);
    setStep(1);
  };

  return (
    <Form onSubmitCapture={handleSubmit(onSubmit)} layout="vertical">
      <Form.Item
        label={"First name"}
        help={errors["fname"] && errors["fname"].message}
        validateStatus={errors["fname"] && "error"}
        hasFeedback
      >
        <Controller
          name="fname"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This field is required",
            },
            minLength: {
              value: 2,
              message: "Min length not met",
            },
            maxLength: {
              value: 25,
              message: "Max length not met",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<UserOutlined className="site-form-item-icon" />}
              allowClear
              type="string"
              placeholder={"First name"}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={"Last name"}
        help={errors["lname"] && errors["lname"].message}
        validateStatus={errors["lname"] && "error"}
        hasFeedback
      >
        <Controller
          name="lname"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This field is required",
            },
            minLength: {
              value: 2,
              message: "Min length not met",
            },
            maxLength: {
              value: 25,
              message: "Max length not met",
            },
            lettersOnlyValidator: {
              value: /^[A-Za-z]+$/i,
              message: "Letters only validator failed",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              allowClear
              type="string"
              placeholder={"Last name"}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={"Address"}
        help={errors["address"] && errors["address"].message}
        validateStatus={errors["address"] && "error"}
        hasFeedback
      >
        <Controller
          name="address"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This field is required",
            },
            maxLength: {
              value: 50,
              message: "Max length not met",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<HomeOutlined className="site-form-item-icon" />}
              allowClear
              type="string"
              placeholder={"Address"}
            />
          )}
        />
      </Form.Item>
      <div className="form-checkbox">
        <Form.Item
          help={errors["terms"] && errors["terms"].message}
          validateStatus={errors["terms"] && "error"}
          hasFeedback
        >
          <Controller
            name="terms"
            control={control}
            rules={{
              required: {
                value: true,
                message: "This field is required",
              },
            }}
            render={({ field }) => (
              <Checkbox defaultChecked={data?.terms} {...field}>
                I accept the Terms and Conditions
              </Checkbox>
            )}
          />
        </Form.Item>
      </div>
      <div className="form-buttons">
        <Button type="primary" htmlType="submit">
          Next Step
        </Button>
      </div>
    </Form>
  );
};

export default FirstStep;

FirstStep.propTypes = {
  setStep: PropTypes.func,
};
