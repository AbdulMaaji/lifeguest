import React from 'react';

type IconProps = {
  className?: string;
};

export const LogoIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.82m5.84-2.56a12.022 12.022 0 0 0-5.84-2.56m0 0a12.022 12.022 0 0 1-5.84 2.56m5.84-2.56V4.72a6 6 0 0 1 5.84-2.56m-5.84 2.56a12.022 12.022 0 0 0-5.84-2.56m11.68 5.12A12.022 12.022 0 0 1 12 4.72v14.56a12.022 12.022 0 0 1-5.84-2.56m5.84 2.56a6 6 0 0 0 5.84-7.38m-5.84 7.38a12.022 12.022 0 0 0 5.84 2.56m-11.68-5.12a12.022 12.022 0 0 0 5.84 2.56" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
);

export const RefreshIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-11.667-11.667a8.25 8.25 0 0 1 11.667 0l3.181 3.183m-14.85-3.183L4.636 6.514" />
    </svg>
);

export const TrophyIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 0 1-4.874-1.971l.242-.145a8.25 8.25 0 0 1 15.262 0l.242.145A9.75 9.75 0 0 1 16.5 18.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 15.75a.75.75 0 0 1 .75.75v3.375a.75.75 0 0 1-1.5 0V16.5a.75.75 0 0 1 .75-.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75a.75.75 0 0 1 .75.75v3.375a.75.75 0 0 1-1.5 0V16.5a.75.75 0 0 1 .75-.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75v3.75m-3.75-6.75A3.375 3.375 0 0 1 12 5.625a3.375 3.375 0 0 1 3.75 3.375" />
    </svg>
);

export const ClockIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const BarChartIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

export const DocumentTextIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

export const CameraIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.776 48.776 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
  </svg>
);

export const MicrophoneIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m12 5.25v-1.5a6 6 0 0 0-12 0v1.5m12 0a9 9 0 0 0-9-9m9 9a9 9 0 0 1-9 9M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747" />
  </svg>
);

export const UploadIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const FireIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.667a8.287 8.287 0 0 0 3-2.622 8.287 8.287 0 0 0 3.362-1.83Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.25A8.25 8.25 0 0 0 12 2.75a8.25 8.25 0 0 0-4.5 15.5" />
  </svg>
);

export const StarIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
);

export const LogoutIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
  </svg>
);

export const WandIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-2.865 3.867L6.63 21.01a3 3 0 0 0 3.754 2.865 3 3 0 0 0 2.865-3.867l.03-1.02a.5.5 0 0 1 .5-.45h2.5a.5.5 0 0 1 .5.45l.03 1.02a3 3 0 0 0 2.865 3.867 3 3 0 0 0 3.754-2.865l.03-1.02a.5.5 0 0 1 .5-.45h2.5a.5.5 0 0 1 .5.45l.03 1.02a3 3 0 0 0 2.865 3.867 3 3 0 0 0 3.754-2.865l-1.02.03a.5.5 0 0 1-.45.5v2.5a.5.5 0 0 1-.45.5l-1.02.03a3 3 0 0 0-3.867 2.865 3 3 0 0 0 2.865 3.754l1.02-.03a.5.5 0 0 1 .45-.5v-2.5a.5.5 0 0 1 .45-.5l1.02-.03a3 3 0 0 0 3.867-2.865 3 3 0 0 0-2.865-3.754l-1.02.03a.5.5 0 0 1-.45.5v2.5a.5.5 0 0 1-.45.5l-1.02.03a3 3 0 0 0-3.867 2.865A3 3 0 0 0 21 21.37l1.02-.03a.5.5 0 0 1 .45-.5v-2.5a.5.5 0 0 1 .45-.5l1.02-.03a3 3 0 0 0 3.867-2.865 3 3 0 0 0-2.865-3.754l-1.02.03a.5.5 0 0 1-.45.5v2.5a.5.5 0 0 1-.45.5l-1.02.03a3 3 0 0 0-3.867 2.865 3 3 0 0 0 2.865 3.754l1.02-.03a.5.5 0 0 1 .45-.5V16.5a.5.5 0 0 1 .45-.5l1.02-.03a3 3 0 0 0 3.867-2.865 3 3 0 0 0-2.865-3.754l-1.02.03a.5.5 0 0 1-.45.5v2.5a.5.5 0 0 1-.45.5l-1.02.03a3 3 0 0 0-3.867 2.865 3 3 0 0 0 2.865 3.754l1.02-.03a.5.5 0 0 1 .45-.5V14.5a.5.5 0 0 1 .45-.5l1.02-.03a3 3 0 0 0 3.867-2.865A3 3 0 0 0 19.5 6.63l-1.02.03a.5.5 0 0 1-.45.5V9.5a.5.5 0 0 1-.45.5l-1.02.03a3 3 0 0 0-3.867 2.865 3 3 0 0 0 2.865 3.754l1.02-.03a.5.5 0 0 1 .45-.5v-2.5a.5.5 0 0 1 .45-.5l1.02-.03a3 3 0 0 0 3.867-2.865A3 3 0 0 0 15 3.37l-1.02.03a.5.5 0 0 1-.45.5V6.5a.5.5 0 0 1-.45.5l-1.02.03a3 3 0 0 0-3.867 2.865 3 3 0 0 0 2.865 3.754l1.02-.03a.5.5 0 0 1 .45-.5V10.5a.5.5 0 0 1 .45-.5l1.02-.03a3 3 0 0 0 3.867-2.865 3 3 0 0 0-2.865-3.754L9.53 16.122Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.5 7.5-1.5-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.25 5.25-1.5-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m12 3-1.5-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75.75-1.5-1.5" />
    </svg>
);

export const SettingsIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-1.226.554-.22 1.196-.22 1.75 0 .548.219 1.02.684 1.11 1.226l.043.25a1.875 1.875 0 0 0 3.493.395l.21-.21a1.875 1.875 0 0 1 2.652 2.652l-.21.21a1.875 1.875 0 0 0-.395 3.493l-.25.043c-.542.09-1.007.56-1.226 1.11-.22.554-.22 1.196 0 1.75.219.548.684 1.02 1.226 1.11l.25.043a1.875 1.875 0 0 0 3.493-.395l.21.21a1.875 1.875 0 0 1-2.652 2.652l-.21-.21a1.875 1.875 0 0 0-3.493.395l-.043.25c-.09.542-.56 1.007-1.11 1.226-.554.22-1.196.22-1.75 0-.548-.219-1.02-.684-1.11-1.226l-.043-.25a1.875 1.875 0 0 0-3.493-.395l-.21.21a1.875 1.875 0 0 1-2.652-2.652l.21-.21a1.875 1.875 0 0 0 .395-3.493l.25-.043c.542-.09 1.007.56 1.226-1.11.22-.554.22-1.196 0-1.75-.219-.548-.684-1.02-1.226-1.11l-.25-.043a1.875 1.875 0 0 0-3.493.395l-.21-.21a1.875 1.875 0 0 1 2.652-2.652l.21.21a1.875 1.875 0 0 0 3.493.395l.043-.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0ZM10.5 18.75a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Zm10.5-6.115a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Z" />
    </svg>
);

export const UserCircleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
  </svg>
);

export const LockIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);

export const BadgeIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
  </svg>
);

export const ClipboardListIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" />
  </svg>
);