import React, { useState } from 'react';

import Downshift from 'downshift';
import { Paper, Chip } from '@material-ui/core';

import { cities } from '../../../lists/cities';

import { renderInput, renderSuggestion } from './render';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: 8
    },
    container: {
      flexGrow: 1,
      position: 'relative'
    },
    paper: {
      position: 'absolute',
      zIndex: 100,
      marginTop: theme.spacing(),
      left: 0,
      right: 0
    },
    inputRoot: {},
    button: {
      marginTop: 5
    },
    chip: {
      margin: `${theme.spacing() / 2}px ${theme.spacing() / 4}px`
    }
  })
);

type AutocompleteProps = {
  selectedItem: string[];
  placeholder: string;
  selectHandle: (value: string[]) => void;
  error?: boolean;
  helperText?: string;
};

const Autocomplete = (props: AutocompleteProps) => {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<any>([]);

  const getSuggestions = async (value: string) => {
    const places: string[] = [];
    cities.map(place => {
      if (
        place.name.toLowerCase().includes(value.toLowerCase()) ||
        place.country.toLowerCase().includes(value.toLowerCase())
      )
        return places.push(place.name + ', ' + place.country);
      else return null;
    });
    const fomrattedPlaces = places.map((i: string) => ({ label: i })); // add check for suggestions length
    setSuggestions(fomrattedPlaces);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { selectHandle, selectedItem } = props;

    if (selectedItem.length && !inputValue.length && e.key === 'Backspace') {
      selectHandle(selectedItem.slice(0, selectedItem.length - 1));
    }
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleInputReset = () => {
    setInputValue('');
  };

  const handleSelect = (item: string) => {
    let { selectHandle, selectedItem } = props;
    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item];
      setInputValue('');
      return selectHandle(selectedItem);
    }

    setInputValue('');
  };

  const handleDelete = (item: string) => () => {
    const { selectedItem, selectHandle } = props;
    const selectedItemClone = [...selectedItem];

    selectedItemClone.splice(selectedItemClone.indexOf(item), 1);
    selectHandle(selectedItemClone);
  };

  const { selectedItem: items, placeholder, error, helperText } = props;

  return (
    <div className={classes.root}>
      <Downshift
        inputValue={inputValue}
        onSelect={handleSelect}
        onInputValueChange={getSuggestions}
        selectedItem={items}
        onOuterClick={handleInputReset}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex
        }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              error,
              helperText,
              InputProps: getInputProps({
                placeholder,
                startAdornment: items.map((item: string) => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={handleDelete(item)}
                  />
                )),
                onChange: handleInputChange,
                onKeyDown: handleKeyDown
              })
            })}
            {isOpen ? (
              <Paper className={classes.paper} square>
                {suggestions.map(
                  (suggestion: { label: string }, index: number) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion.label }),
                      highlightedIndex,
                      selectedItem
                    })
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    </div>
  );
};

export default Autocomplete;
