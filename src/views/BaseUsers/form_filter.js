import React, { useState } from "react"
import {
  Input,
  Button,
  FormItem,
  FormContainer,
  toast,
  Notification,
  DatePicker,
  Drawer,
  Checkbox,
} from "components/ui"
import { Field, Form, Formik } from "formik"

import { PageConfig } from "./config"
import dayjs from "dayjs"
import { MixerVerticalIcon } from "@radix-ui/react-icons"
import { IoMdClose } from "react-icons/io"

export const FormFilter = ({
  getData,
  localState,
  openFilter,
  setOpenFilter,
}) => {
  const formInit = {}

  for (let index = 0; index < PageConfig.formFilterFields.length; index++) {
    const el = PageConfig.formFilterFields[index]
    formInit[el.key] = ""
  }

  const [filterTemp, setFilterTemp] = useState({
    start_date: "",
    end_date: "",
    position: [],
    jobOpening: [],
  })

  const [filter, setFilter] = useState({
    start_date: [],
    end_date: "",
    position: [],
    jobOpening: [],
  })

  const MenuContent = ({
    label,
    type = "checkbox",
    value,
    group,
    isChecked,
  }) => {
    const onChange = (checked) => {
      if (checked) {
        let data = [...filterTemp[group]]
        data.push(value)
        setFilterTemp({ ...filterTemp, [group]: data })
      } else {
        let data = [...filterTemp[group]]
        let index = data.indexOf(value)
        data.splice(index, 1)
        setFilterTemp({ ...filterTemp, [group]: data })
      }
    }

    return (
      <div className="flex items-center">
        {type === "checkbox" && (
          <Checkbox value={value} onChange={onChange} checked={isChecked}>
            <span className="font-nunito text-sm font-normal text-black">
              {label}
            </span>
          </Checkbox>
        )}
      </div>
    )
  }

  const onPressConfirm = () => {
    const options = []
    setFilter(filterTemp)

    const checkStartDate =
      filterTemp.start_date !== "" && filterTemp.start_date !== null
    const checkEndDate =
      filterTemp.end_date !== "" && filterTemp.end_date !== null

    // if (checkStartDate && checkEndDate) {
    //   startDate = `${dayjs(filterTemp.start_date).format('YYYY-MM-DD')} 00:00:00`;
    //   endDate = `${dayjs(filterTemp.end_date).format('YYYY-MM-DD')} 00:00:00`;
    //   options.push(`filter,period_from,greater_than_equal,${dayjs(filterTemp.start_date).format('YYYY-MM-DD')} 00:00:00`);
    //   options.push(
    //     `filter,period_to,less_then_equal,${dayjs(filterTemp.end_date).format('YYYY-MM-DD')} 23:59:59`
    //   );
    // }else if (checkStartDate) {
    //   startDate = `${dayjs(filterTemp.start_date).format('YYYY-MM-DD')} 00:00:00`;
    //   endDate = `${dayjs(filterTemp.start_date).format('YYYY-MM-DD')} 00:00:00`;
    //   options.push(`filter,period_from,greater_than_equal,${dayjs(filterTemp.start_date).format('YYYY-MM-DD')} 00:00:00`);
    //   options.push(
    //     `filter,period_from,less_then_equal,${dayjs(filterTemp.start_date).format('YYYY-MM-DD')} 23:59:59`
    //   );
    // } else if (checkEndDate) {
    //   startDate = `${dayjs(filterTemp.end_date).format('YYYY-MM-DD')} 00:00:00`;
    //   endDate = `${dayjs(filterTemp.end_date).format('YYYY-MM-DD')} 00:00:00`;
    //   options.push(`filter,period_to,greater_than_equal,${dayjs(filterTemp.end_date).format('YYYY-MM-DD')} 00:00:00`);
    //   options.push(
    //     `filter,period_to,less_then_equal,${dayjs(filterTemp.end_date).format('YYYY-MM-DD')} 23:59:59`
    //   );
    // }

    if (filterTemp.position.length > 0) {
      options.push(
        `filter,applicantJob.position.id,in,${filterTemp.position.join("|")}`
      )
    }

    if (filterTemp.jobOpening.length > 0) {
      options.push(
        `filter,applicant_job_id,in,${filterTemp.jobOpening.join("|")}`
      )
    }

    const params = {
      ...localState.params,
      page: 1,
      options: options,
      relations: [
        "educations",
        "workExperiences",
        "applicationDetails",
        "applicantJob.position",
        "applicantProcesses.moderations.moderation.lastItem",
        "applicantProcesses.moderations.moderation.items.moderator",
        "applicantProcesses.moderations.moderation.items.moderationUser.user.employee.position",
        "applicantProcesses.assignTo",
        "applicantJob.area",
      ].join(),
    }
    getData(params)
    setOpenFilter(false)
  }

  return (
    <div>
      <Drawer
        closable={false}
        isOpen={openFilter}
        onRequestClose={() => {
          setFilterTemp(filter)
          setOpenFilter(false)
        }}
      >
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-3">
            <MixerVerticalIcon height={24} width={24} color="#2c2b6b" />
            <span className="text-2xl font-bold font-nunito text-blue-999">
              Filter
            </span>
          </div>
          <div
            onClick={() => {
              setOpenFilter(false)
            }}
          >
            <IoMdClose size={24} className="text-blue-999" />
          </div>
        </div>
        <div className="mb-20" />
        <div className=" bg-white absolute border-t-2 bottom-0 self-center w-full ml-[-23px] z-50">
          <div className="flex flex-row justify-center my-5">
            <Button
              onClick={() => {
                let reset = {
                  position: "",
                  jobOpening: "",
                }
                setFilter(reset)
                setFilterTemp(reset)
                getData({
                  ...localState.params,
                  options: [],
                })
              }}
              className="mr-2 h-[40px] w-[150px] items-center rounded-lg flex flex-row gap-2 justify-center border-blue-999"
            >
              <span className="mt-[1px] text-sm text-blue-999 font-nunito">
                Reset
              </span>
            </Button>
            <Button
              onClick={onPressConfirm}
              className="mr-2 h-[40px] w-[150px] items-center rounded-lg flex flex-row gap-2 justify-center border-blue-999"
              variant="solid"
            >
              <span className="mt-[1px] text-sm text-white font-nunito">
                Apply
              </span>
            </Button>
          </div>
        </div>
      </Drawer>

      {/* <Formik
        initialValues={formInit}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true)
          let options = []

          for (const el in values) {
            if (values[el]) {
              let v = values[el]
              let key = PageConfig.formFilterFields.find((x) => x.key === el)

              if (key && key.type === "date") {
                v = dayjs(v).format("YYYY-MM-DD")
              }
              options.push("filter," + el + ",equal," + v)
            }
          }

          try {
            await getData({ ...localState.params, options: options, page: 1 })
          } catch (error) {
            toast.push(
              <Notification title={"Error"} type="danger">
                {error?.response?.data?.message ||
                  error?.message ||
                  "Something went wrong"}
              </Notification>,
              {
                placement: "top-center",
              }
            )
          }

          setSubmitting(false)
        }}
      >
        {({ values, touched, errors, isSubmitting, resetForm }) => {
          return (
            <Form>
              <FormContainer>
                <div className="lg:grid grid-cols-5 gap-4">
                  {PageConfig.formFilterFields.map((item) => {
                    let input = (
                      <Field
                        type="text"
                        name={item.key}
                        placeholder={item.label}
                        component={Input}
                      />
                    )

                    if (item.type === "date") {
                      input = (
                        <Field name={item.key}>
                          {({ field, form }) => {
                            return (
                              <DatePicker
                                field={field}
                                placeholder={item.label}
                                form={form}
                                value={values ? values[item.key] : ""}
                                onChange={(date) => {
                                  form.setFieldValue(field.name, date)
                                }}
                              />
                            )
                          }}
                        </Field>
                      )
                    }

                    return (
                      <div key={item.key}>
                        <FormItem
                          label={item.label}
                          invalid={
                            errors &&
                            touched &&
                            errors[item.key] &&
                            touched[item.key]
                          }
                          errorMessage={errors ? errors[item.key] : ""}
                        >
                          {input}
                        </FormItem>
                      </div>
                    )
                  })}
                </div>

                <div className="text-right mt-6">
                  <Button
                    className="mr-2"
                    variant="plain"
                    type="button"
                    onClick={() => {
                      resetForm()
                      getData({ ...localState.params, page: 1, options: [] })
                    }}
                  >
                    Reset
                  </Button>
                  <Button variant="solid" type="submit" loading={isSubmitting}>
                    {isSubmitting ? "Loading..." : "Submit"}
                  </Button>
                </div>
              </FormContainer>
            </Form>
          )
        }}
      </Formik> */}
    </div>
  )
}
