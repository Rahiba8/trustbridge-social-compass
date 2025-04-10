
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const DashboardCard = ({
  title,
  value,
  description,
  icon,
  className,
  trend,
}: DashboardCardProps) => {
  return (
    <div className={cn("trust-card", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "text-xs font-medium flex items-center",
                trend.isPositive ? "text-trustbridge-green" : "text-trustbridge-red"
              )}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                <span className="ml-1 text-muted-foreground">
                  from last month
                </span>
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-2 bg-primary/10 rounded-full text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
