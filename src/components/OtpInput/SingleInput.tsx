import { ChangeEvent } from "react";

export default function SingleInput({
  value,
  onKeyUp,
  onChange,
}: {
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="string"
      maxLength={1}
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
      className="sm:!w-16 sm:h-16 !w-12 h-12 bg-secondary rounded-2xl outline-none text-center"
    />
  );
}
