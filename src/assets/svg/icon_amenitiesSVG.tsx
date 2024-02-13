export default function AmenitiesSVGIcon({ large = true }: { large?: boolean }) {
  return (
    <>
      {large ? (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 25H9V7H5V25Z"
            stroke="#CAC9C0"
            strokeWidth="1.5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23 25H27V7H23V25Z"
            stroke="#CAC9C0"
            strokeWidth="1.5"
          />
          <path d="M12 16.0026H23" stroke="#CAC9C0" strokeWidth="1.5" />
          <path d="M26.668 16.0026H30.0013" stroke="#CAC9C0" strokeWidth="1.5" />
          <path d="M2 16.0026H5.33333" stroke="#CAC9C0" strokeWidth="1.5" />
        </svg>
      ) : (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.25 18.75H7.25V5.25H4.25V18.75Z"
            stroke="#F5F5F5"
            strokeWidth="1.5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.75 18.75H20.75V5.25H17.75V18.75Z"
            stroke="#F5F5F5"
            strokeWidth="1.5"
          />
          <path d="M9.5 12H17.75" stroke="#F5F5F5" strokeWidth="1.5" />
          <path d="M20.5 12H23" stroke="#F5F5F5" strokeWidth="1.5" />
          <path d="M2 12H4.5" stroke="#F5F5F5" strokeWidth="1.5" />
        </svg>
      )}
    </>
  );
}
