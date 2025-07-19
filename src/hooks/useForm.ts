
import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

interface UseFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<any>;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function useForm<T extends Record<string, any>>({ initialValues, onSubmit }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // Honeypot check
    if (values._gotcha) {
      setStatus('idle');
      return;
    }

    try {
      await onSubmit(values);
      setStatus('success');
      setMessage('הפנייה נשלחה בהצלחה! נחזור אליכם בקרוב.');
    } catch (error) {
      setStatus('error');
      setMessage('אירעה שגיאה בשליחת הפנייה. נסו שוב מאוחר יותר.');
      console.error('Form submission error:', error);
    }
  }, [values, onSubmit]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setStatus('idle');
    setMessage('');
  }, [initialValues]);

  return { values, handleChange, handleSubmit, status, message, resetForm };
}
