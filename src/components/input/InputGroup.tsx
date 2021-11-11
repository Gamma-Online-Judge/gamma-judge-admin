import { ChangeEventHandler } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

declare type FormControlElement = HTMLInputElement | HTMLTextAreaElement;
interface InputGroupProps<T> {
  onChange: ChangeEventHandler<FormControlElement>;
  model: T;
  keyList: (keyof T)[];
  renderType?: undefined | 'textarea';
}

export default function InputGroup<T>({
  onChange,
  keyList,
  model,
  renderType = undefined,
}: InputGroupProps<T>) {
  const containerClass =
    renderType === 'textarea' ? 'full-inputs' : 'flex-inputs';
  const inputClass = renderType === 'textarea' ? 'full-input' : 'flex-input';
  return (
    <div className={containerClass}>
      {keyList.map((key: keyof T) => {
        const value = model[key] || '';
        if (typeof value !== 'string') return null;
        if (typeof key !== 'string') return null;
        return (
          <FloatingLabel className={inputClass} key={key} label={key}>
            <Form.Control
              as={renderType}
              id={key}
              value={value}
              onChange={onChange}
            />
          </FloatingLabel>
        );
      })}
    </div>
  );
}
