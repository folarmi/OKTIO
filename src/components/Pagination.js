import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationControlled({ count, page, handleChange }) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={10}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        color="#2170FF"
        color="primary"
      />
    </Stack>
  );
}
