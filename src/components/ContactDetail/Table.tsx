import React from "react";

interface TableProps {
  children: React.ReactNode;
}

export const TableSpan: React.FC<{ text: string; isHeader?: boolean }> = ({
  text,
  isHeader,
}) => {
  return (
    <p
      className={`grid-span-1 text-center${
        isHeader ? " font-bold text-l mb-3" : ""
      }`}
    >
      {text}
    </p>
  );
};

export const Table: React.FC<TableProps> = ({ children }) => {
  const tableHeaders = ["Name", "Air Date", "Episode", "Created Date"];

  return (
    <div className="grid grid-cols-4 gap-3 items-center md:gap-5">
      {tableHeaders.map((header, index) => {
        return <TableSpan text={header} isHeader={true} key={index} />;
      })}
      {children}
    </div>
  );
};
