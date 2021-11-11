import { ChangeEventHandler } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

declare type FormControlElement = HTMLInputElement | HTMLTextAreaElement;
interface InputGroupProps<T> {
  onChange: ChangeEventHandler<FormControlElement>;
  model: T;
  keyList: (keyof T)[];
}

export default function InputGroup<T>({
  onChange,
  keyList,
  model,
}: InputGroupProps<T>) {
  return (
    <div className="flex-inputs">
      {keyList.map((key: keyof T) => {
        const value = model[key] || '';
        if (typeof value !== 'string') return null;
        if (typeof key !== 'string') return null;
        return (
          <FloatingLabel className="input-container" key={key} label={key}>
            <Form.Control id={key} value={value} onChange={onChange} />
          </FloatingLabel>
        );
      })}
    </div>
  );
}
