
import React from 'react';
import { useRtlLayout } from '@/utils/rtl-layout-helpers';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface RtlFormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  description?: string;
  className?: string;
}

export const RtlFormField: React.FC<RtlFormFieldProps> = ({
  label,
  children,
  required = false,
  error,
  description,
  className = ''
}) => {
  const { getTextAlign, getFlexDirection } = useRtlLayout();

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${getTextAlign('left')}`}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
      {description && (
        <p className={`text-sm text-muted-foreground ${getTextAlign('left')}`}>
          {description}
        </p>
      )}
      {error && (
        <p className={`text-sm text-red-500 ${getTextAlign('left')}`}>
          {error}
        </p>
      )}
    </div>
  );
};

interface RtlInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  description?: string;
}

export const RtlInput: React.FC<RtlInputProps> = ({
  label,
  error,
  description,
  className = '',
  ...props
}) => {
  const { isRTL, getTextAlign } = useRtlLayout();

  const inputComponent = (
    <Input
      className={`${isRTL ? 'text-right' : 'text-left'} ${className}`}
      {...props}
    />
  );

  if (label) {
    return (
      <RtlFormField
        label={label}
        error={error}
        description={description}
      >
        {inputComponent}
      </RtlFormField>
    );
  }

  return inputComponent;
};

interface RtlTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  description?: string;
}

export const RtlTextarea: React.FC<RtlTextareaProps> = ({
  label,
  error,
  description,
  className = '',
  ...props
}) => {
  const { isRTL } = useRtlLayout();

  const textareaComponent = (
    <Textarea
      className={`${isRTL ? 'text-right' : 'text-left'} ${className}`}
      {...props}
    />
  );

  if (label) {
    return (
      <RtlFormField
        label={label}
        error={error}
        description={description}
      >
        {textareaComponent}
      </RtlFormField>
    );
  }

  return textareaComponent;
};
