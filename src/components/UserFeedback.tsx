import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader2, Search } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  text = 'טוען...', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center gap-2 justify-center fade-in-mobile">
      <Loader2 className={`animate-spin text-primary transition-all duration-300 ${sizeClasses[size]}`} />
      <span className="font-hebrew text-muted-foreground transition-colors duration-300 pulse-hebrew">{text}</span>
    </div>
  );
};

interface ProgressIndicatorProps {
  label: string;
  isActive?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  label, 
  isActive = false 
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-hebrew text-sm text-foreground">{label}</span>
        {isActive && <LoadingSpinner size="sm" text="" />}
      </div>
      <div className={`h-2 rounded-full ${isActive ? 'progress-hebrew' : 'bg-muted'}`} />
    </div>
  );
};

interface SearchProgressProps {
  searchTerm: string;
  resultCount: number;
  isSearching: boolean;
}

export const SearchProgress: React.FC<SearchProgressProps> = ({
  searchTerm,
  resultCount,
  isSearching
}) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-card/95 backdrop-blur-sm rounded-lg border transition-all duration-300 hover:bg-card">
      <Search className={`w-4 h-4 transition-colors duration-300 ${isSearching ? 'text-primary animate-pulse' : 'text-primary'}`} />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-hebrew text-sm transition-all duration-300">חיפוש: "{searchTerm}"</span>
          {isSearching && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
        </div>
        {!isSearching && (
          <div className="text-xs text-muted-foreground font-hebrew mt-1 transition-all duration-300 animate-fade-in">
            נמצאו {resultCount} תוצאות
          </div>
        )}
      </div>
    </div>
  );
};

interface FeedbackAlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  isVisible: boolean;
}

export const FeedbackAlert: React.FC<FeedbackAlertProps> = ({
  type,
  title,
  description,
  isVisible
}) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: AlertCircle,
  };

  const Icon = icons[type];
  
  const alertClasses = {
    success: 'success-feedback',
    error: 'error-feedback',
    warning: 'border-yellow-500 bg-yellow-50 text-yellow-800',
    info: 'border-blue-500 bg-blue-50 text-blue-800',
  };

  if (!isVisible) return null;

  return (
    <Alert className={`${alertClasses[type]} fade-in-rtl touch-target transition-all duration-500 hover:scale-102`}>
      <Icon className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
      <AlertDescription className="font-hebrew">
        <div className="font-medium mb-1 transition-colors duration-300">{title}</div>
        {description && <div className="text-sm opacity-90 transition-opacity duration-300">{description}</div>}
      </AlertDescription>
    </Alert>
  );
};

interface DataSavingProps {
  isSaving: boolean;
  lastSaved?: Date;
}

export const DataSavingIndicator: React.FC<DataSavingProps> = ({
  isSaving,
  lastSaved
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('he-IL', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {isSaving ? (
        <>
          <Loader2 className="w-3 h-3 animate-spin text-primary" />
          <span className="font-hebrew">שומר נתונים...</span>
        </>
      ) : lastSaved ? (
        <>
          <CheckCircle className="w-3 h-3 text-success" />
          <span className="font-hebrew">נשמר בשעה {formatTime(lastSaved)}</span>
        </>
      ) : (
        <span className="font-hebrew">לא נשמר</span>
      )}
    </div>
  );
};

interface FormValidationProps {
  errors: string[];
  isVisible: boolean;
}

export const FormValidationFeedback: React.FC<FormValidationProps> = ({
  errors,
  isVisible
}) => {
  if (!isVisible || errors.length === 0) return null;

  return (
    <div className="space-y-2 fade-in-rtl">
      {errors.map((error, index) => (
        <Alert key={index} className="error-feedback">
          <XCircle className="h-4 w-4" />
          <AlertDescription className="font-hebrew text-sm">
            {error}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};