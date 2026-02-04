interface IconProps {
    className?: string;
    title?: string;
    'aria-label'?: string;
}

export const CheckIcon = ({
    className = 'w-5 h-5',
    title,
    'aria-label': ariaLabel
}: IconProps) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-label={ariaLabel}
    >
        {title && <title>{title}</title>}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);
