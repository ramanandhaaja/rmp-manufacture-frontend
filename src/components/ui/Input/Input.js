import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useConfig } from "../ConfigProvider";
import { useForm } from "../Form/context";
import { useInputGroup } from "../InputGroup/context";
import { CONTROL_SIZES, SIZES } from "../utils/constant";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import get from "lodash/get";

// Helper function to format number as price
const formatPrice = (value) => {
  if (!value) return "";
  // Remove any non-digit characters
  const numbers = value.toString().replace(/\D/g, "");
  // Convert to number and format with thousands separator
  return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Helper function to unformat price for actual value
const unformatPrice = (value) => {
  if (!value) return "";
  return value.toString().replace(/\./g, "");
};

const Input = React.forwardRef((props, ref) => {
  const {
    asElement: Component,
    className,
    disabled,
    invalid,
    prefix,
    size,
    suffix,
    textArea,
    type,
    style,
    unstyle,
    field,
    form,
    time,
    search = false,
    formik = true,
    uppercase = true,
    ...rest
  } = props;

  const [prefixGutter, setPrefixGutter] = useState(0);
  const [suffixGutter, setSuffixGutter] = useState(0);
  const [displayValue, setDisplayValue] = useState("");

  const { themeColor, controlSize, primaryColorLevel, direction } = useConfig();
  const formControlSize = useForm()?.size;
  const inputGroupSize = useInputGroup()?.size;

  const inputSize = size || inputGroupSize || formControlSize || controlSize;

  // Initialize display value when component mounts or value changes
  useEffect(() => {
    if (type === "price" && field?.value) {
      setDisplayValue(formatPrice(field.value));
    }
  }, [type, field?.value]);

  const handleChange = useCallback(
    (event) => {
      let newValue = event.target.value;

      if (type === "price") {
        // Format the display value
        const formattedValue = formatPrice(newValue);
        setDisplayValue(formattedValue);

        // Set the actual unformatted value in Formik
        const unformattedValue = unformatPrice(newValue);
        if (field?.name && form?.setFieldValue) {
          form.setFieldValue(field.name, unformattedValue);
        }
      } else if (uppercase) {
        // Handle regular uppercase transformation
        newValue = valueToUpperCase(newValue);
        if (field?.onChange) {
          field.onChange(event);
        }
      } else {
        // Handle regular input
        if (field?.onChange) {
          field.onChange(event);
        }
      }
    },
    [type, field, form, uppercase]
  );

  const isInvalid = useMemo(() => {
    let validate = false;
    if (!isEmpty(form)) {
      const { touched, errors } = form;
      const touchedField = get(touched, field?.name);
      const errorField = get(errors, field?.name);
      validate = touchedField && errorField;
    }
    if (typeof invalid === "boolean") {
      validate = invalid;
    }
    return validate;
  }, [form, invalid, field]);

  const fieldStyleDefault = search || textArea;
  const inputDefaultClass = `input ${
    !fieldStyleDefault && "bg-slate-50 border-none"
  } text-main-100 !h-max-[40px]`;
  const inputSizeClass = `input-${inputSize} h-${CONTROL_SIZES[inputSize]}`;
  const inputFocusClass = `focus:ring-${themeColor}-${primaryColorLevel} focus-within:ring-${themeColor}-${primaryColorLevel} focus-within:border-${themeColor}-${primaryColorLevel} focus:border-${themeColor}-${primaryColorLevel}`;
  const inputWrapperClass = `input-wrapper ${
    prefix || suffix ? className : ""
  }`;
  const inputClass = classNames(
    inputDefaultClass,
    !textArea && inputSizeClass,
    !isInvalid && inputFocusClass,
    !prefix && !suffix ? className : "",
    disabled && "input-disabled",
    isInvalid && "input-invalid",
    textArea && "input-textarea bg-slate-50 border-none",
    time && "timeInputWithoutIcon"
  );

  const prefixNode = useRef();
  const suffixNode = useRef();

  const getAffixSize = () => {
    if (!prefixNode.current && !suffixNode.current) {
      return;
    }
    const prefixNodeWidth = prefixNode?.current?.offsetWidth;
    const suffixNodeWidth = suffixNode?.current?.offsetWidth;

    if (isNil(prefixNodeWidth) && isNil(suffixNodeWidth)) {
      return;
    }

    if (prefixNodeWidth) {
      setPrefixGutter(prefixNodeWidth);
    }

    if (suffixNodeWidth) {
      setSuffixGutter(suffixNodeWidth);
    }
  };

  const valueToUpperCase = (val) => {
    if (
      uppercase &&
      typeof val === "string" &&
      field?.name !== "email" &&
      !field?.name.includes("description") &&
      !field?.name.includes("notes") &&
      !field?.name.includes("remarks") &&
      !field?.name.includes("requirements") &&
      field?.name !== "contact_email" &&
      field?.name !== "password" &&
      field?.name !== "password_old" &&
      field?.name !== "password_confirmation" &&
      field?.name !== "search" &&
      field?.name !== "" &&
      field?.name !== "document_notes" &&
      field?.name !== "allocation_notes" &&
      field?.name !== "rtd_pic.email" &&
      field?.name !== "linkedin_link" &&
      field?.name !== "portofolio_link" &&
      val !== ""
    ) {
      return val.toUpperCase();
    }
    return val;
  };

  useEffect(() => {
    getAffixSize();
  }, [prefix, suffix]);

  const remToPxConvertion = (pixel) => 0.0625 * pixel;

  const affixGutterStyle = () => {
    const leftGutter = `${remToPxConvertion(prefixGutter) + 1}rem`;
    const rightGutter = `${remToPxConvertion(suffixGutter) + 1}rem`;
    let gutterStyle = {};

    if (direction === "ltr") {
      if (prefix) {
        gutterStyle.paddingLeft = leftGutter;
      }

      if (suffix) {
        gutterStyle.paddingRight = rightGutter;
      }
    }

    if (direction === "rtl") {
      if (prefix) {
        gutterStyle.paddingRight = leftGutter;
      }

      if (suffix) {
        gutterStyle.paddingLeft = rightGutter;
      }
    }

    return gutterStyle;
  };

  const inputValue = type === "price" ? displayValue : field?.value;

  const newInputProps = {
    className: !unstyle ? inputClass : "",
    disabled,
    type: type === "price" ? "text" : type,
    ref,
    ...field,
    value: inputValue,
    onChange: handleChange,
    ...rest,
  };

  const inputProps = {
    className: !unstyle ? inputClass : "",
    disabled,
    type: type === "price" ? "text" : type,
    ref,
    value: inputValue,
    onChange: handleChange,
    ...rest,
  };

  const renderTextArea = <textarea style={style} {...newInputProps}></textarea>;

  const renderInput = formik ? (
    <Component style={{ ...affixGutterStyle(), ...style }} {...newInputProps} />
  ) : (
    <Component style={{ ...affixGutterStyle(), ...style }} {...inputProps} />
  );

  const renderAffixInput = (
    <span className={inputWrapperClass}>
      {prefix ? (
        <div
          className="input-suffix-start"
          ref={(node) => (prefixNode.current = node)}
        >
          {prefix}
        </div>
      ) : null}
      {renderInput}
      {suffix ? (
        <div
          className="input-suffix-end"
          ref={(node) => (suffixNode.current = node)}
        >
          {suffix}
        </div>
      ) : null}
    </span>
  );

  const renderChildren = () => {
    if (textArea) {
      return renderTextArea;
    }

    if (prefix || suffix) {
      return renderAffixInput;
    } else {
      return renderInput;
    }
  };

  return renderChildren();
});

Input.propTypes = {
  asElement: PropTypes.string,
  type: PropTypes.string,
  typeInput: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf([SIZES.LG, SIZES.SM, SIZES.MD]),
  value: PropTypes.any,
  invalid: PropTypes.bool,
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  unstyle: PropTypes.bool,
};

Input.defaultProps = {
  type: "text",
  asElement: "input",
  className: "",
  unstyle: false,
};

export default Input;
