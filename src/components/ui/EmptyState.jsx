import { cn } from '@/lib/utils/cn';

export default function EmptyState({ icon, title, description, action, className }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-20 px-6 gap-4',
        className
      )}
    >
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-surface-elevated flex items-center justify-center text-3xl mb-1 opacity-60">
          {icon}
        </div>
      )}
      <div className="space-y-1.5">
        <p className="text-ink-primary font-semibold text-base">{title}</p>
        {description && (
          <p className="text-ink-secondary text-sm max-w-xs leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
