import React from "react";
import {
  HiOutlineColorSwatch,
  HiOutlineDesktopComputer,
  HiOutlineTemplate,
  HiOutlineViewGridAdd,
} from "react-icons/hi"

import { AiOutlineAppstoreAdd } from "react-icons/ai"
import { VscFileSubmodule } from "react-icons/vsc"
import {
  CalendarCheckSvg,
  ClaimSvg,
  DashboardSvg,
  MasterDataSvg,
  SidenavReportSvg,
  SidenavSalesSvg,
  SubmissionSvg,
  DollarSvg,
} from "assets/svg"
import { BsTelephonePlus } from "react-icons/bs"
import { FaRegQuestionCircle } from "react-icons/fa"
import MappingSales from "assets/svg/MappingSales"
import BreakPelunasanSvg from "assets/svg/BreakPelunasanSvg"
import ApprovalSvg from "assets/svg/ApprovalSvg"
import ActivitySvg from "assets/svg/ActivitySvg"
import ReportSvg from "assets/svg/ReportSvg"

const navigationIcon = {
  home: <DashboardSvg />,
  apps: <AiOutlineAppstoreAdd />,
  modules: <VscFileSubmodule />,
  singleMenu: <HiOutlineViewGridAdd />,
  collapseMenu: <HiOutlineTemplate />,
  groupSingleMenu: <HiOutlineDesktopComputer />,
  groupCollapseMenu: <HiOutlineColorSwatch />,
  realization: <CalendarCheckSvg />,
  submission: <SubmissionSvg />,
  masterData: <MasterDataSvg />,
  helpService: <FaRegQuestionCircle className="text-sm" />,
  claim: <ClaimSvg />,
  mappingSales: <MappingSales />,
  approval: <ApprovalSvg />,
  emergencyCalls: <BsTelephonePlus className="text-sm" />,
  sales: <SidenavSalesSvg />,
  report: <SidenavReportSvg />,
  finance: <DollarSvg />,
  breakPelunasan: <BreakPelunasanSvg />,
  activityLog: <ActivitySvg />,
  report: <ReportSvg />,
}

export default navigationIcon;
