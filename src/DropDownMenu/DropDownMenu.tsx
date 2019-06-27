import * as React from "react";
import * as ReactDOM from "react-dom";
import { findIndex } from "lodash";
import keycode from "keycode";

import FloatingContainer from '../FloatingContainer/FloatingContainer'
import {
  DropDownMenuRoot,
  HiddenLabel,
  MenuItem,
  MenuItemList,
  MenuTitle,
  SearchField,
  TriggerContainer
} from "./DropDownMenu.styles";

export type itemsProps = {
  label: string;
  route?: string;
  searchable: string;
  disabled: boolean;
  action: () => void;
};

type DropDownMenuProps = {
  className?: string;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  position: "right" | "left";
  title?: string;
  items: Array<itemsProps>;
};

type DropDownMenuState = {
  showItems: boolean;
  highlightIndex: number;
};
 
export class DropDownMenu extends React.PureComponent<
  DropDownMenuProps,
  DropDownMenuState
> {
  private readonly id: string;
  private searchField: any;
  private clearSearchTimeout!: number;

  static defaultProps = {
    items: [],
    position: "left"
  };

  constructor(props: DropDownMenuProps) {
    super(props);

    this.state = {
      showItems: false,
      highlightIndex: -1,
    };

    this.id = Math.random()
      .toString(36)
      .substr(2);
  }

  onTrigger = () => {
    const becomeVisible = !this.state.showItems;

    this.setState(
      {
        showItems: becomeVisible
      },
      () => this.searchField.focus()
    );
  };

  onClickOut = () => {
    this.setState({ showItems: false, highlightIndex: -1 });
  };

  onSearch = () => {
    const query = this.searchField.value.toLowerCase();

    const foundIndex = findIndex(this.props.items, it => {
      const searchable = it.searchable || it.label;
      return searchable.toLowerCase().includes(query);
    });

    this.setState({ highlightIndex: foundIndex });

    clearTimeout(this.clearSearchTimeout);
    this.clearSearchTimeout = window.setTimeout(this.clearSearch, 1000);
  };

  onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const highlightIndex = this.state.highlightIndex;

    switch (e.keyCode) {
      case keycode("ENTER"):
        const item = this.props.items[highlightIndex];

        setTimeout(() => {
          item.action();
        }, 100);

        this.onClickOut();
        break;

      case keycode("TAB"):
        e.preventDefault();
        break;

      case keycode("ESC"):
        this.onClickOut();
        break;

      case keycode("DOWN"):
        this.moveHighlight(1);
        break;

      case keycode("UP"):
        this.moveHighlight(-1);
        break;
    }
  };

  moveHighlight = (step: number) => {
    const { highlightIndex } = this.state;
    const numberOfItems = this.props.items.length;
    const newSelectedIndex =
      (highlightIndex + step + numberOfItems) % numberOfItems;

    this.setState({ highlightIndex: newSelectedIndex });
  };

  clearSearch = () => {
    if (this.searchField) {
      this.searchField.value = "";
    }
  };

  handleItemOnClick = (item: itemsProps) => (e: React.SyntheticEvent) => {
    if (item.action) {
      e.preventDefault();
      e.stopPropagation();

      item.action();
      this.onClickOut();
    }
  };

  render() {
    const { highlightIndex } = this.state;
    const { className, trigger, children, items, position, title } = this.props;

    return (
      <DropDownMenuRoot className={className}>
        <HiddenLabel htmlFor={this.id}>Dropdown search</HiddenLabel>
        <SearchField
          id={this.id}
          ref={it => (this.searchField = it && ReactDOM.findDOMNode(it))}
          onKeyDown={this.onKeyDown}
          onChange={this.onSearch}
          type="text"
        />
        {typeof (children || trigger) === "function" ? (
          children || (trigger && this.onTrigger)
        ) : (
          <TriggerContainer onClick={this.onTrigger}>
            {children || trigger}
          </TriggerContainer>
        )}
        <FloatingContainer show={this.state.showItems} onClickOut={this.onClickOut} horizontalAlignment={position}>
          <MenuItemList>
            {title && <MenuTitle>{title}</MenuTitle>}
            {items.map(
              (it, i) =>
                !it.disabled && (
                  <MenuItem
                    key={it.searchable || it.label}
                    highlight={i === highlightIndex ? "true" : "false"}
                    onClick={this.handleItemOnClick(it)}
                  >
                    {it.label}
                  </MenuItem>
                )
            )}
          </MenuItemList>
        </FloatingContainer>
      </DropDownMenuRoot>
    );
  }
}

export default DropDownMenu;
