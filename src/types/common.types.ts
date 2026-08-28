export interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}
