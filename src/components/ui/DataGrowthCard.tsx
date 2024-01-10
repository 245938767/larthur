import * as React from 'react';
import { cn } from '@udecode/cn';

const DataGrowthCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-card p-4 text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
));
DataGrowthCard.displayName = 'Card';

const DataGrowthCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-row items-center justify-between space-y-0 ',
      className
    )}
    {...props}
  />
));
DataGrowthCardHeader.displayName = 'CardHeader';

const DataGrowthCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-sm font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
DataGrowthCardTitle.displayName = 'CardTitle';

const DataGrowthCardIcon = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('  text-muted-foreground', className)}
    {...props}
  />
));
DataGrowthCardIcon.displayName = 'CardDescription';

const DataGrowthCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      ' py-3  text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
DataGrowthCardContent.displayName = 'CardContent';

const DataGrowthCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(' flex items-center pt-0 text-xs', className)}
    {...props}
  />
));
DataGrowthCardFooter.displayName = 'CardFooter';

export {
  DataGrowthCard,
  DataGrowthCardHeader,
  DataGrowthCardFooter,
  DataGrowthCardTitle,
  DataGrowthCardIcon,
  DataGrowthCardContent,
};
