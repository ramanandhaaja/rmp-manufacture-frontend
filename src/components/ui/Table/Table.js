import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Table = React.forwardRef((props, ref) => {
  const {
    borderlessRow,
    children,
    className,
    hoverable,
    compact,
    oveerflow = true,
    asElement: Component,
    wrapClass,
    ...rest
  } = props;

  const tableClass = classNames(
    Component === "table" ? "table-default" : "table-flex",
    hoverable && "table-hover",
    compact && "table-compact",
    borderlessRow && "borderless-row",
    className
  );

  return (
    <div
      className={classNames(oveerflow && "overflow-x-auto")}
      style={{ overflowX: "auto", overflowY: "hidden" }}
    >
      <div className={wrapClass}>
        <Component className={tableClass} {...rest} ref={ref}>
          {children}
        </Component>
      </div>
    </div>
  );
});

Table.propTypes = {
  hoverable: PropTypes.bool,
  compact: PropTypes.bool,
  asElement: PropTypes.string,
  borderlessRow: PropTypes.bool,
  wrapClass: PropTypes.string,
};

Table.defaultProps = {
  hoverable: true,
  compact: false,
  asElement: "table",
  borderlessRow: false,
  wrapClass: "",
};

export default Table;
