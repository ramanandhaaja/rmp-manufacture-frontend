const ContentStatisticProductSvg = ({
  width = 17,
  height = 17,
  color = "currentColor",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M1.13184 2.66667V14.3333C1.13184 14.9777 1.65418 15.5 2.2985 15.5H13.9652C14.6095 15.5 15.1318 14.9777 15.1318 14.3333V2.66667C15.1318 2.02233 14.6095 1.5 13.9652 1.5H2.2985C1.65418 1.5 1.13184 2.02234 1.13184 2.66667Z"
          stroke={color}
        />
        <path d="M4.04883 4.41699H6.38216" stroke={color} />
        <path d="M4.04883 7.04199H8.13216" stroke={color} />
        <path
          d="M12.2155 8.5L9.29883 12.5833L6.38216 10.25L4.04883 12.5833"
          stroke={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_12820_26311">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0.131836 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default ContentStatisticProductSvg
