interface AlertProps {
  type: 'success' | 'error';
  title: string;
  message?: string;
  CustomMessage?: (props: any) => JSX.Element;
}

const settings = {
  error: {
    containerBgColor: 'red-200',
    containerBorderColor: 'red-300',
    iconBgColor: 'red-100',
    iconBorderColor: 'red-500',
    iconMainColor: 'red-500',
    icon: (
      <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
    titleColor: 'red-800',
    textColor: 'red-600',
  },
  success: {
    containerBgColor: 'green-200',
    containerBorderColor: 'green-300',
    iconBgColor: 'green-100',
    iconBorderColor: 'green-500',
    iconMainColor: 'green-500',
    icon: (
      <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
    titleColor: 'green-800',
    textColor: 'green-600',
  },
};

export const Alert: React.FC<AlertProps> = ({ type, title, message, CustomMessage }) => {
  return (
    <div
      className={`alert flex flex-row items-center w-full bg-${settings[type].containerBgColor} mb-5 p-5 rounded-lg border-b-2 border-${settings[type].containerBorderColor}`}
    >
      <div
        className={`alert-icon flex items-center bg-${settings[type].iconBgColor} border-2 border-${settings[type].iconBorderColor} justify-center h-10 w-10 flex-shrink-0 rounded-full`}
      >
        <span className={`text-${settings[type].iconMainColor}`}>{settings[type].icon}</span>
      </div>

      <div className="alert-content ml-4">
        <div className={`alert-title font-semibold text-lg text-${settings[type].titleColor}`}>
          {title}
        </div>

        <div className={`alert-description text-sm text-${settings[type].textColor}`}>
          {message && <p>{message}</p>}
          {CustomMessage && <CustomMessage />}
        </div>
      </div>
    </div>
  );
};
