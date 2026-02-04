interface IconProps {
    className?: string;
    title?: string;
    'aria-label'?: string;
}

export const MoreOptionsIcon = ({
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
);
