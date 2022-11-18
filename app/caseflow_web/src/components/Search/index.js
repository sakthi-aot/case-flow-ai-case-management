import React from "react";

const Search = () => {
  return (
    <div style={{ "align-items": "center", width: "50%" }}>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <Input
          id="standard-adornment-amount"
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          endAdornment={
            <div>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                  bgcolor: "background.paper",
                  color: "text.secondary",
                  "& hr": {
                    mx: 0.5,
                  },
                }}
              >
                <Divider orientation="vertical" variant="middle" flexItem />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 70 }}>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Age"
                    disableUnderline
                    defaultValue={10}
                    IconComponent={KeyboardArrowDownIcon}
                  >
                    <MenuItem value={10}>All</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          }
        />
      </FormControl>
    </div>
  );
};

export default Search;
