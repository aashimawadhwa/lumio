export default function AddPaymentSVGIcon({ large = true }: { large?: boolean }) {
  return (
    <>
      {' '}
      {large ? (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27 22V10C27 8.34267 25.656 7 24 7H8C6.344 7 5 8.34267 5 10V22C5 23.656 6.344 25 8 25H16"
            stroke="#CAC9C0"
            strokeWidth="1.5"
          />
          <path d="M5 13.0026H27" stroke="#CAC9C0" strokeWidth="1.5" />
          <path d="M22.9987 20V30" stroke="#CAC9C0" strokeWidth="1.5" />
          <path d="M28 25.0026H18" stroke="#CAC9C0" strokeWidth="1.5" />
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.25 16.5V7.5C20.25 6.257 19.242 5.25 18 5.25H6C4.758 5.25 3.75 6.257 3.75 7.5V16.5C3.75 17.742 4.758 18.75 6 18.75H12"
            stroke="#F5F5F5"
            strokeWidth="1.5"
          />
          <path d="M3.75 9.75H20.25" stroke="#F5F5F5" strokeWidth="1.5" />
          <path d="M17.25 15V22.5" stroke="#F5F5F5" strokeWidth="1.5" />
          <path d="M21 18.75H13.5" stroke="#F5F5F5" strokeWidth="1.5" />
        </svg>
      )}{' '}
    </>
  );
}
