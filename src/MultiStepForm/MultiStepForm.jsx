import React, { useState } from "react";
import { FormDataProvider } from "./Context/FormDataContext";
import FirstStep from "./Steps/FirstStep";
import SecondStep from "./Steps/SecondStep";
import ReviewStep from "./Steps/ReviewStep";
import { Steps } from "antd";

const { Step } = Steps;

const steps = [
  {
    title: "Personal",
  },
  {
    title: "Login",
  },
  {
    title: "Review",
  },
];

export default function MultiStepForm() {
  const [current, setCurrent] = useState(0);

  return (
    <FormDataProvider>
      <>
        <div className="form">
          <h1 className="form-title">Registration form</h1>
          <div className="form-steps">
            <Steps current={current} size="small">
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </div>
          <div className="form-fields">
            {current === 0 && <FirstStep setStep={setCurrent} />}
            {current === 1 && <SecondStep setStep={setCurrent} />}
            {current === 2 && <ReviewStep setStep={setCurrent} />}
          </div>
        </div>
      </>
    </FormDataProvider>
  );
}
