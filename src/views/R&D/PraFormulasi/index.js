import React, { useState } from "react";
import PraFormulasi from "components/rmp/R&D/PraFormulasi";
import { useLocation } from "react-router-dom";

const Page = () => {
  const location = useLocation();
  const isQttp = location.pathname.includes("qttp");
  const isCma = location.pathname.includes("cma");
  const isCqa = location.pathname.includes("cqa");
  const isCpp = location.pathname.includes("cpp");
  const isTechnicalFeasibility = location.pathname.includes(
    "technical-feasibility"
  );

  return (
    <div className="p-6 bg-white rounded-lg">
      {isCma && (
        <PraFormulasi
          title="Critical Material Attribute (CMA)"
          subtitle="Elemen CMA"
        />
      )}
      {isCqa && (
        <PraFormulasi
          title="Critical Quality Attribute (CQA)"
          subtitle="Elemen CQA"
        />
      )}
      {isCpp && (
        <PraFormulasi
          title="Critical Process Parameter (CPP)"
          subtitle="Elemen CPP"
        />
      )}
      {isQttp && (
        <PraFormulasi
          title="Quality Target Product Profile (QTPP)"
          subtitle="Elemen Qttp"
        />
      )}
      {isTechnicalFeasibility && (
        <PraFormulasi
          title="Technical Feasibility"
          subtitle="Elemen Technical Feasibility"
          btnNext="Selesai"
        />
      )}
    </div>
  );
};

export default Page;
