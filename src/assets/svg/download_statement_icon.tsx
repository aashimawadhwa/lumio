export default function DownloadStatementIcon({ large = false }: { large?: boolean }) {
  return (
    <>
      {large ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.125 14.25C18.403 14.25 20.25 12.403 20.25 10.125C20.25 7.847 18.403 6 16.125 6C13.847 6 12 7.847 12 10.125"
            stroke="#CAC9C0"
            strokeWidth="1.5"
          />
          <path d="M14.25 14.25H16.25" stroke="#CAC9C0" strokeWidth="1.5" />
          <path d="M7.25 14.25H9.75" stroke="#CAC9C0" strokeWidth="1.5" />
          <path
            d="M7.5 14.25C5.429 14.25 3.75 12.571 3.75 10.5C3.75 8.429 5.429 6.75 7.5 6.75"
            stroke="#CAC9C0"
            strokeWidth="1.5"
          />
          <path
            d="M15.7121 17.7207L12.0001 21.4327L8.28809 17.7207"
            stroke="#CAC9C0"
            strokeWidth="1.5"
          />
          <path d="M12 20.75V10" stroke="#CAC9C0" strokeWidth="1.5" />
          <path
            d="M6.75 7.5C6.75 4.601 9.101 2.25 12 2.25C13.518 2.25 14.885 2.894 15.844 3.924"
            stroke="#CAC9C0"
            strokeWidth="1.5"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.75 9.5C12.2687 9.5 13.5 8.26867 13.5 6.75C13.5 5.23133 12.2687 4 10.75 4C9.23133 4 8 5.23133 8 6.75"
            stroke="#F5F5F5"
            strokeWidth="1.5"
          />
          <path d="M9.5 9.49935H10.8333" stroke="#F5F5F5" strokeWidth="1.5" />
          <path d="M4.83325 9.49935H6.49992" stroke="#F5F5F5" strokeWidth="1.5" />
          <path
            d="M5 9.5C3.61933 9.5 2.5 8.38067 2.5 7C2.5 5.61933 3.61933 4.5 5 4.5"
            stroke="#F5F5F5"
            strokeWidth="1.5"
          />
          <path
            d="M10.4747 11.8125L8.00006 14.2872L5.52539 11.8125"
            stroke="#F5F5F5"
            strokeWidth="1.5"
          />
          <path d="M8.00008 13.8327V6.66602" stroke="#F5F5F5" strokeWidth="1.5" />
          <path
            d="M4.5 5C4.5 3.06733 6.06733 1.5 8 1.5C9.012 1.5 9.92333 1.92933 10.5627 2.616"
            stroke="#F5F5F5"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </>
  );
}
