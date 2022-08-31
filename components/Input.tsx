import { ChangeEvent, KeyboardEvent } from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (_e: ChangeEvent<HTMLInputElement>) => void;
  onKeyup?: (_e: KeyboardEvent<HTMLInputElement>) => void;
}

const Input = ({ type, placeholder, value, onChange, onKeyup }: InputProps) => {
  return (
    <input
      className="w-full h-full h-12 text-black rounded-2xl px-2"
      autoFocus
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyUp={onKeyup}
    />
  );
};

export default Input;
