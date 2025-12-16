// src/components/atoms/Input.jsx

import React from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

export default function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  error = "",
  fullWidth = true,
  size = "medium",
  disabled = false,
  sx = {},
  ...rest
}) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      error={Boolean(error)} // Assuming you want this error prop passed through
      helperText={error}
      fullWidth={fullWidth}
      size={size}
      disabled={disabled}
      sx={sx}
      {...rest}
    />
  );
}

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium"]),
  disabled: PropTypes.bool,
  sx: PropTypes.object,
};