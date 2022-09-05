import React from "react";

export type OnSearchChangeType = (
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => void;

export const SelectItem: React.FC<{
  name: string;
  onSearchChange: OnSearchChangeType;
  value: string;
  options: string[];
}> = ({ name, onSearchChange, value, options }) => {
  return (
    <select
      name={name}
      className="mr-2"
      onChange={onSearchChange}
      value={value}
    >
      <option value="">Select an option</option>
      {options.map((option, index) => {
        return (
          <option value={option.toLowerCase()} key={index}>
            {option}
          </option>
        );
      })}
    </select>
  );
};
