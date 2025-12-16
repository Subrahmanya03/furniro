// src/components/atoms/Button.jsx

import React from 'react';
import PropTypes from 'prop-types';
// FIX: Renaming the MUI Button import to avoid conflict with the function name 'Button'
import MuiButton from '@mui/material/Button'; 

// The exported function is named 'Button' as requested
export default function Button({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick = undefined,
  sx = {},
  btnText = "Button", // Include btnText prop for usage in LoginPage
  ...rest
}) {
  const content = children || btnText;
    
  return (
    <MuiButton // Use the aliased MUI Button here
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
      sx={{ textTransform: 'none', ...sx }}
      {...rest}
    >
      {content}
    </MuiButton>
  );
}

Button.propTypes = {
  /** The content of the button. */
  children: PropTypes.node,
  btnText: PropTypes.string,
  /** The variant to use. */
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  /** The color of the component. */
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']),
  /** The size of the component. */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** If true, the button will take up the full width of its container. */
  fullWidth: PropTypes.bool,
  /** If true, the component is disabled. */
  disabled: PropTypes.bool,
  /** Callback fired when the button is clicked. */
  onClick: PropTypes.func,
  /** Custom styles applied to the root element. */
  sx: PropTypes.object,
};