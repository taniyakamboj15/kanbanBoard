interface IconProps {
    className?: string;
    title?: string;
    'aria-label'?: string;
}

export const PlusIcon = ({
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
    </svg>
);
