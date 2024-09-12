import { ChangeEvent, useState } from "react";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return { searchTerm, handleSearchChange };
};
