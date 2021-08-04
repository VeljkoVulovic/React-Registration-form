import React, { useState } from "react";
import { FormDataProvider } from "./context/FormDataContext";
import FirstStep from "./Steps/FirstStep";
import SecondStep from "./Steps/SecondStep";
import ReviewStep from "./Steps/ReviewStep";
import { Steps, Button } from "antd";
import { useTranslation } from "react-i18next";
import MNEFlag from "../flags/MNEFlag";
import ENFlag from "../flags/ENFlag";

const { Step } = Steps;

const steps = [
  {
    title: "personal",
  },
  {
    title: "login",
  },
  {
    title: "review",
  },
];

export default function MultiStepForm() {
  const [current, setCurrent] = useState(0);
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <FormDataProvider>
      <>
        <div className="lang-buttons">
          <Button onClick={() => changeLanguage("en")}>
            <ENFlag />
          </Button>
          <Button onClick={() => changeLanguage("me")}>
            <MNEFlag />
          </Button>
        </div>
        <div className="form">
          <h1 className="form-title">{t("form.title")}</h1>
          <div className="form-steps">
            <Steps current={current} size="small">
              {steps.map((item) => (
                <Step key={item.title} title={t(`form.${item.title}`)} />
              ))}
            </Steps>
          </div>
          <div>
            {current === 0 && <FirstStep setStep={setCurrent} />}
            {current === 1 && <SecondStep setStep={setCurrent} />}
            {current === 2 && <ReviewStep setStep={setCurrent} />}
          </div>
        </div>
      </>
    </FormDataProvider>
  );
}
