import React from 'react';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

// type InputProps = {
//   InputProps: any;
//   ref: string;
//   type: string;
//   classes: any;
//   fullWidth: boolean;
// };

type RenderSuggestionProps = {
  suggestion: { label: string };
  index: number;
  itemProps: object;
  highlightedIndex: number | null;
  selectedItem: string;
};

export const renderInput = (inputProps: any) => {
  const { InputProps, ref, classes, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
};

export const renderSuggestion = (props: RenderSuggestionProps) => {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  } = props;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component='div'
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
};
