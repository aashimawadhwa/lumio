export default function ShippingSVGIcon({ large = true }: { large?: boolean }) {
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
            d="M11 22C11 23.656 9.65733 25 8 25C6.34267 25 5 23.656 5 22C5 20.344 6.34267 19 8 19C9.65733 19 11 20.344 11 22Z"
            stroke="#CAC9C0"
            strokeWidth="1.5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M27 22.0469C27 23.7029 25.656 25.0469 24 25.0469C22.344 25.0469 21 23.7029 21 22.0469C21 20.3895 22.344 19.0469 24 19.0469C25.656 19.0469 27 20.3895 27 22.0469Z"
            stroke="#CAC9C0"
            strokeWidth="1.5"
          />
          <path d="M20.9987 22.0885H11.332" stroke="#CAC9C0" strokeWidth="1.5" />
          <path
            d="M1 15.3359V18.6693C1 20.3253 2.34267 21.6693 4 21.6693H4.33333"
            stroke="#CAC9C0"
            strokeWidth="1.5"
          />
          <path
            d="M26 13H4C2.34267 13 1 11.6573 1 10V7H23.9187C24.1853 7 24.4387 7.10533 24.6267 7.29333L30.7067 13.3733C30.8947 13.5613 31 13.8147 31 14.0813V18V19C31 20.656 29.656 22 28 22H27"
            stroke="#CAC9C0"
            strokeWidth="1.5"
          />
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
            d="M8.25 16.5C8.25 17.742 7.243 18.75 6 18.75C4.757 18.75 3.75 17.742 3.75 16.5C3.75 15.258 4.757 14.25 6 14.25C7.243 14.25 8.25 15.258 8.25 16.5Z"
            stroke="#F5F5F5"
            strokeWidth="1.5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.25 16.5312C20.25 17.7732 19.242 18.7812 18 18.7812C16.758 18.7812 15.75 17.7732 15.75 16.5312C15.75 15.2882 16.758 14.2812 18 14.2812C19.242 14.2812 20.25 15.2882 20.25 16.5312Z"
            stroke="#F5F5F5"
            strokeWidth="1.5"
          />
          <path d="M15.75 16.5625H8.5" stroke="#F5F5F5" strokeWidth="1.5" />
          <path
            d="M0.75 11.5V14C0.75 15.242 1.757 16.25 3 16.25H3.25"
            stroke="#F5F5F5"
            strokeWidth="1.5"
          />
          <path
            d="M19.5 9.75H3C1.757 9.75 0.75 8.743 0.75 7.5V5.25H17.939C18.139 5.25 18.329 5.329 18.47 5.47L23.03 10.03C23.171 10.171 23.25 10.361 23.25 10.561V13.5V14.25C23.25 15.492 22.242 16.5 21 16.5H20.25"
            stroke="#F5F5F5"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </>
  );
}
