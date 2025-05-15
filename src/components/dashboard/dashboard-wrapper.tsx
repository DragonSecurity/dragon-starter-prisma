import { ReactNode } from "react"
import { clsx } from "clsx"

export function DashboardWrapper({
  title,
  subTitle,
  children,
  className,
}: {
  title: string
  subTitle: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={clsx("p-6", className && className)}>
      <div className="mb-6">
        {title && <p className="h4">{title}</p>}
        {subTitle && <p className="mt-1 text-sm">{subTitle}</p>}
      </div>
      {children}
    </div>
  )
}
