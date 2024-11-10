import React from "react";
import PolicyItem from "./policy_item";
import {
  CustomerServiceOutlined,
  SafetyCertificateOutlined,
  UndoOutlined,
} from "@ant-design/icons";

const Policies = () => {
  const policyList = [
    {
      icon: <UndoOutlined />,
      title: "Easy Exchange",
      description: "Easily exchange any product within 7 days.",
    },
    {
      icon: <SafetyCertificateOutlined />,
      title: "7 Days Return",
      description: "Return your purchase within 7 days with no hassle.",
    },
    {
      icon: <CustomerServiceOutlined />,
      title: "Best Customer Support",
      description: "We're here to help you 24/7 with any inquiries.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold text-center mb-8">Our Policies</h1>
      <div className="flex flex-col sm:flex-row justify-between gap-8">
        {policyList.map((policy, index) => (
          <PolicyItem key={index} policy={policy} />
        ))}
      </div>
    </div>
  );
};

export default Policies;
