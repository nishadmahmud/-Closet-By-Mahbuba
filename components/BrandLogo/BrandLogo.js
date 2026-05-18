const INLINE_SIZE_STYLES = {
  sm: {
    main: "text-[0.9rem] leading-none",
    script: "text-[0.85rem]",
    flourish: "w-[3.4rem] h-0.5 mt-0.5",
  },
  md: {
    main: "text-[1rem] md:text-[1.15rem] leading-none",
    script: "text-[0.9rem] md:text-[1rem]",
    flourish: "w-[3.75rem] md:w-[4.25rem] h-0.5 mt-0.5",
  },
  lg: {
    main: "text-[1.15rem] md:text-[1.35rem] leading-none",
    script: "text-[1rem] md:text-[1.15rem]",
    flourish: "w-[4.25rem] md:w-[5rem] h-0.5 mt-0.5",
  },
};

const STACKED_SIZE_STYLES = {
  sm: {
    line1: "text-[1.05rem] leading-none",
    script: "text-[0.95rem]",
    line2: "text-[0.95rem] leading-none mt-0.5",
    flourish: "w-14 h-1 mt-1",
  },
  md: {
    line1: "text-[1.2rem] md:text-[1.45rem] leading-none",
    script: "text-[1.05rem] md:text-[1.2rem]",
    line2: "text-[1.05rem] md:text-[1.25rem] leading-none mt-0.5",
    flourish: "w-16 h-1 mt-1",
  },
  lg: {
    line1: "text-[1.5rem] md:text-[1.75rem] leading-none",
    script: "text-[1.25rem] md:text-[1.45rem]",
    line2: "text-[1.25rem] md:text-[1.5rem] leading-none mt-1",
    flourish: "w-20 h-1.5 mt-1.5",
  },
};

const GRADIENT = {
  default:
    "bg-gradient-to-br from-[#E91E8C] via-[#C2185B] to-[#9C0E47] bg-clip-text text-transparent",
  footer:
    "bg-gradient-to-r from-[#F8BBD9] via-[#F48FB1] to-[#FCE4EC] bg-clip-text text-transparent",
};

function flourishBackground(variant) {
  return variant === "footer"
    ? "linear-gradient(90deg, #F8BBD9, #F48FB1, #FCE4EC)"
    : "linear-gradient(90deg, #E91E8C, #C2185B, #9C0E47)";
}

function StackedLogo({ size, variant, gradient, className }) {
  const s = STACKED_SIZE_STYLES[size] ?? STACKED_SIZE_STYLES.md;

  return (
    <span className={`inline-flex flex-col items-start leading-none ${className}`}>
      <span className={`flex items-baseline gap-1 ${s.line1}`}>
        <span
          className={`font-semibold tracking-tight ${gradient}`}
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Closet
        </span>
        <span
          className={`${s.script} ${gradient} -mb-0.5 translate-y-px`}
          style={{ fontFamily: "var(--font-script)" }}
        >
          by
        </span>
      </span>
      <span
        className={`font-semibold tracking-[0.04em] ${s.line2} ${gradient}`}
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Mahbuba
      </span>
      <span
        className={`${s.flourish} block rounded-full opacity-80`}
        style={{ background: flourishBackground(variant) }}
        aria-hidden
      />
    </span>
  );
}

function InlineLogo({ size, variant, gradient, className }) {
  const s = INLINE_SIZE_STYLES[size] ?? INLINE_SIZE_STYLES.md;

  return (
    <span
      className={`inline-flex items-baseline gap-1 whitespace-nowrap leading-none ${className}`}
    >
      <span
        className={`font-semibold tracking-tight ${s.main} ${gradient}`}
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Closet
      </span>
      <span
        className={`${s.script} ${gradient} -translate-y-px`}
        style={{ fontFamily: "var(--font-script)" }}
      >
        by
      </span>
      <span className="inline-flex flex-col items-stretch">
        <span
          className={`font-semibold tracking-tight ${s.main} ${gradient}`}
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Mahbuba
        </span>
        <span
          className={`${s.flourish} block rounded-full opacity-80`}
          style={{ background: flourishBackground(variant) }}
          aria-hidden
        />
      </span>
    </span>
  );
}

export default function BrandLogo({
  size = "md",
  variant = "default",
  layout = "inline",
  className = "",
}) {
  const gradient = GRADIENT[variant] ?? GRADIENT.default;

  if (layout === "stacked") {
    return (
      <StackedLogo
        size={size}
        variant={variant}
        gradient={gradient}
        className={className}
      />
    );
  }

  return (
    <InlineLogo
      size={size}
      variant={variant}
      gradient={gradient}
      className={className}
    />
  );
}
