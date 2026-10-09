import type { AnchorHTMLAttributes } from 'react';

const variants = {
  primary: 'bg-lime text-bg hover:bg-text',
  outline: 'border border-border bg-surface/40 text-text backdrop-blur hover:border-text',
};

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: keyof typeof variants;
}

export function ButtonLink({ variant = 'primary', className = '', ...props }: ButtonLinkProps) {
  return (
    <a
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
