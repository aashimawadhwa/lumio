export default function IconDevice({ large }: { large: boolean }) {
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
            d="M20 29H12C10.344 29 9 27.656 9 26V6C9 4.344 10.344 3 12 3H20C21.656 3 23 4.344 23 6V26C23 27.656 21.656 29 20 29Z"
            stroke="#FFFEF3"
            strokeWidth="2"
          />
          <path d="M14 25.0026H18" stroke="#FFFEF3" strokeWidth="2" />
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
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 21.75H9C7.758 21.75 6.75 20.742 6.75 19.5V4.5C6.75 3.258 7.758 2.25 9 2.25H15C16.242 2.25 17.25 3.258 17.25 4.5V19.5C17.25 20.742 16.242 21.75 15 21.75Z"
            stroke="#CAC9C0"
            strokeWidth="2"
          />
          <path d="M10.5 18.75H13.5" stroke="#CAC9C0" strokeWidth="2" />
        </svg>
      )}
    </>
  );
}
