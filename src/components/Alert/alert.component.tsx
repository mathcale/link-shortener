interface AlertProps {
  type: 'success' | 'error';
  title: string;
  message?: string;
  CustomMessage?: (props: any) => JSX.Element;
}

const settings = {
  error: {
    containerBgColor: 'bg-red-200',
    containerBorderColor: 'border-red-300',
    iconBgColor: 'bg-red-100',
    iconBorderColor: 'border-red-500',
    iconMainColor: 'text-red-500',
    icon: (
      <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
    titleColor: 'text-red-800',
    textColor: 'text-red-600',
  },
  success: {
    containerBgColor: 'bg-green-200',
    containerBorderColor: 'border-green-300',
    iconBgColor: 'bg-green-100',
    iconBorderColor: 'border-green-500',
    iconMainColor: 'text-green-500',
    icon: (
      <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
    titleColor: 'text-green-800',
    textColor: 'text-green-600',
  },
};

export const Alert: React.FC<AlertProps> = ({ type, title, message, CustomMessage }) => {
  return (
    <div
      className={`alert flex flex-row items-center w-full ${settings[type].containerBgColor} mb-5 p-5 rounded-lg border-b-2 ${settings[type].containerBorderColor}`}
    >
      <div
        className={`alert-icon flex items-center ${settings[type].iconBgColor} border-2 ${settings[type].iconBorderColor} justify-center h-10 w-10 flex-shrink-0 rounded-full`}
      >
        <span className={`${settings[type].iconMainColor}`}>{settings[type].icon}</span>
      </div>

      <div className="alert-content ml-4">
        <div className={`alert-title font-semibold text-lg ${settings[type].titleColor}`}>
          {title}
        </div>

        <div className={`alert-description text-sm ${settings[type].textColor}`}>
          {message && <p>{message}</p>}
          {CustomMessage && <CustomMessage />}
        </div>
      </div>
    </div>
  );
};
