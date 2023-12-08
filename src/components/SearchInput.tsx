import { useState } from "react";

import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box, useMediaQuery } from "@mui/material";
import { useAppSelector } from "../app/store/store";
import theme from "../app/theme";
import { User } from "../app/types";

type SearchInputProps = {
  onSearch: (results: User[]) => void;
};

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [searchItem, setSearchItem] = useState<string>("");
  const { users } = useAppSelector((state) => state.userSlice);

  const handleIconClick = () => {
    setIsInputVisible(true);
  };

  const handleSearchByEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchItem(inputValue);
    const results = users.filter((user) =>
      user.email.toLowerCase().includes(inputValue.toLowerCase())
    );

    onSearch(results);
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        width: isSmallScreen ? "100%" : isInputVisible ? 400 : "auto",
        transition: "width 0.1s ease",
        border: isInputVisible ? "1px solid gray" : "1px solid white",
        borderRadius: "10px",
      }}
    >
      {!isInputVisible && (
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleIconClick}
        >
          <SearchIcon />
        </IconButton>
      )}
      {isInputVisible && (
        <>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Поиск по Email"
            inputProps={{ "aria-label": "search google maps" }}
            value={searchItem}
            onChange={handleSearchByEmail}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={() => setIsInputVisible(false)}
          >
            <SearchIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
}
