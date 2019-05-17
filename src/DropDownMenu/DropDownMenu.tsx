import * as React from "react";
import * as ReactDOM from "react-dom";
import { findIndex } from "lodash";
import keycode from "keycode";

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
  position: "right" | "left" | "center";
  title?: string;
  router?: any;
  items: Array<itemsProps>;
};

type DropDownMenuState = {
  showItems: boolean;
  highlightIndex: number;
  gravity: string;
};

export class DropDownMenu extends React.PureComponent<
  DropDownMenuProps,
  DropDownMenuState
> {
  private id: string;
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
      gravity: "down"
    };

    this.id = Math.random()
      .toString(36)
      .substr(2);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onClickOut);
  }

  onTrigger = (e: MouseEvent | any) => {
    const becomeVisible = !this.state.showItems;
    const menuHeight = 45 + 35 * this.props.items.length;
    const gravity = e.clientY + menuHeight > window.innerHeight ? "up" : "down";

    this.setState(
      {
        gravity,
        showItems: becomeVisible
      },
      () => this.searchField.focus()
    );

    if (becomeVisible) {
      setTimeout(() => window.addEventListener("click", this.onClickOut), 100);
    }
  };

  onClickOut = () => {
    this.setState({ showItems: false, highlightIndex: -1 });
    window.removeEventListener("click", this.onClickOut);
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
          if (
            item.route &&
            this.props.router &&
            this.props.router.history.push
          ) {
            this.props.router.history.push(item.route);
          } else if (item.action) {
            item.action();
          }
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
    const { highlightIndex, gravity } = this.state;
    const { className, trigger, children, items, position, title } = this.props;

    return (
      <DropDownMenuRoot
        // innerRef={(it: any) => this.root = it}
        className={className}
      >
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
        <MenuItemList
          show={this.state.showItems}
          className={position}
          gravity={gravity}
        >
          {title && <MenuTitle>{title}</MenuTitle>}
          {items.map(
            (it, i) =>
              !it.disabled && (
                <MenuItem
                  key={it.searchable || it.label}
                  highlight={i === highlightIndex ? "true" : "false"}
                  to={it.route ? it.route : ""}
                  onClick={this.handleItemOnClick(it)}
                >
                  {it.label}
                </MenuItem>
              )
          )}
        </MenuItemList>
      </DropDownMenuRoot>
    );
  }
}

export default DropDownMenu;
