import React, { useContext } from "react";
import FormDataContext from "../context/FormDataContext";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Checkbox } from "antd";
import {
  UserOutlined,
  IdcardOutlined,
  HomeOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const FirstStep = ({ setStep }) => {
  const { data, setValues } = useContext(FormDataContext);
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fname: data?.fname,
      lname: data?.lname,
      address: data?.address,
      terms: data?.terms,
    },
  });

  const onSubmit = (firstStepData) => {
    setValues(firstStepData);
    setStep(1);
  };

  return (
    <Form onSubmitCapture={handleSubmit(onSubmit)} layout="vertical">
      <Form.Item
        label={t("fields.fname")}
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
              message: t("errorMessages.required"),
            },
            minLength: {
              value: 2,
              message: t("errorMessages.min_length"),
            },
            maxLength: {
              value: 25,
              message: t("errorMessages.max_length"),
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<UserOutlined />}
              allowClear
              type="string"
              placeholder={t("fields.fname")}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={t("fields.lname")}
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
              message: t("errorMessages.required"),
            },
            minLength: {
              value: 2,
              message: t("errorMessages.min_length"),
            },
            maxLength: {
              value: 25,
              message: t("errorMessages.max_length"),
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "Letters only validator failed",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<IdcardOutlined />}
              allowClear
              type="string"
              placeholder={t("fields.lname")}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={t("fields.address")}
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
              message: t("errorMessages.required"),
            },
            maxLength: {
              value: 50,
              message: t("errorMessages.max_length"),
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<HomeOutlined />}
              allowClear
              type="string"
              placeholder={t("fields.address")}
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
                message: t("errorMessages.required"),
              },
            }}
            render={({ field }) => (
              <Checkbox defaultChecked={data?.terms} {...field}>
                {t("fields.terms")}
              </Checkbox>
            )}
          />
        </Form.Item>
      </div>
      <div className="form-buttons">
        <Button type="primary" htmlType="submit" icon={<ArrowRightOutlined />}>
          {t("buttons.nextStep")}
        </Button>
      </div>
    </Form>
  );
};

export default FirstStep;

FirstStep.propTypes = {
  setStep: PropTypes.func,
};
