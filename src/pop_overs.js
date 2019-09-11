import React from 'react';

export default function MouseOverPopover({ children, hoverText, color }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handlePopoverOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handlePopoverClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <span
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {children}
      </span>
      {
        open &&
        <span style={{
          fontSize: '.8em',
          textAlign: 'center',
          color: color,
          position: "absolute",
          marginTop: "-20px",
          boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
          transform: 'translate(0, 10px)',
          marginLeft: '-60px'
        }}>{hoverText}
        </span>
      }
    </React.Fragment>

  );
}