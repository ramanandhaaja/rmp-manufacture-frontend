import React from 'react';

function EditSvg({ width = 20, height = 20 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_9699_202730"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="2"
        y="1"
        width={width - 2}
        height={height - 2}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.4426 1.52925C16.703 1.2689 17.1251 1.2689 17.3854 1.52925L20.0521 4.19591C20.3125 4.45626 20.3125 4.87837 20.0521 5.13872L14.7953 10.3956C14.6939 10.4969 14.5769 10.5812 14.4487 10.6453L9.21218 13.2636C8.95552 13.3919 8.64554 13.3416 8.44263 13.1387C8.23972 12.9358 8.18942 12.6258 8.31775 12.3692L10.936 7.13261C11.0001 7.00443 11.0845 6.88742 11.1858 6.78608L16.4426 1.52925ZM16.914 2.94346L12.1286 7.72889L10.7443 10.4975L11.0838 10.8371L13.8525 9.45275L18.6379 4.66732L16.914 2.94346ZM13.5807 2.66732L12.2474 4.00065H6.78073C6.20968 4.00065 5.82148 4.00117 5.52142 4.02568C5.22915 4.04956 5.07968 4.09285 4.97541 4.14597C4.72453 4.27381 4.52055 4.47778 4.39272 4.72866C4.3396 4.83293 4.29631 4.9824 4.27243 5.27468C4.24792 5.57473 4.2474 5.96293 4.2474 6.53398V14.8007C4.2474 15.3717 4.24792 15.7599 4.27243 16.06C4.29631 16.3522 4.3396 16.5017 4.39272 16.606C4.52055 16.8569 4.72453 17.0608 4.97541 17.1887C5.07968 17.2418 5.22915 17.2851 5.52142 17.3089C5.82148 17.3335 6.20968 17.334 6.78073 17.334H15.0474C15.6184 17.334 16.0066 17.3335 16.3067 17.3089C16.599 17.2851 16.7485 17.2418 16.8527 17.1887C17.1036 17.0608 17.3076 16.8569 17.4354 16.606C17.4885 16.5017 17.5318 16.3522 17.5557 16.06C17.5802 15.7599 17.5807 15.3717 17.5807 14.8007V9.33396L18.9141 8.00062V14.8007V14.8282C18.9141 15.3648 18.9141 15.8077 18.8846 16.1685C18.854 16.5433 18.7883 16.8877 18.6234 17.2113C18.3678 17.7131 17.9598 18.121 17.458 18.3767C17.1345 18.5415 16.79 18.6072 16.4153 18.6379C16.0545 18.6673 15.6116 18.6673 15.0749 18.6673H15.0474H6.78073H6.75318C6.21654 18.6673 5.77364 18.6673 5.41285 18.6379C5.03812 18.6072 4.69365 18.5415 4.37009 18.3767C3.86832 18.121 3.46038 17.7131 3.20471 17.2113C3.03985 16.8877 2.97414 16.5433 2.94353 16.1685C2.91405 15.8077 2.91406 15.3649 2.91406 14.8282V14.8282V14.8007V6.53398V6.50645V6.50641V6.5064C2.91406 5.96978 2.91405 5.52689 2.94353 5.1661C2.97414 4.79137 3.03985 4.4469 3.20471 4.12334C3.46038 3.62158 3.86832 3.21363 4.37009 2.95797C4.69365 2.79311 5.03812 2.7274 5.41285 2.69678C5.77363 2.6673 6.21653 2.66731 6.75316 2.66732H6.7532H6.78073H13.5807Z"
          fill="currentColor"
        />
      </mask>
      <g mask="url(#mask0_9699_202730)">
        <rect x="0.25" width={width} height={height} fill="currentColor" />
      </g>
    </svg>
  )
}

export default EditSvg;
