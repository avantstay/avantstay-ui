import React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import DropDownMenu from "./DropDownMenu";

type Position = "left" | "right" | "center" | undefined;
const DropDownMenuStories = storiesOf("DropDownMenu", module);

DropDownMenuStories.addDecorator(centered)
  .addDecorator(withKnobs)
  .add("Default usage", () => (
    <DropDownMenu
      items={[
        {
          label: "Logout",
          searchable: "logout",
          disabled: false,
          action: () => { }
        }
      ]}
      position={"right"}
    >
      Menu label
    </DropDownMenu>
  )).add('Close the last opened', () => (<>
    <DropDownMenu
      closeTheLastOpened
      items={[
        {
          label: "Logout",
          searchable: "logout",
          disabled: false,
          action: () => { }
        }
      ]}
      position={"right"}
    >
      Menu label
    </DropDownMenu>
    <DropDownMenu
      closeTheLastOpened
      items={[
        {
          label: "Logout",
          searchable: "logout",
          disabled: false,
          action: () => { }
        }
      ]}
      position={"right"}
    >
      Menu label
    </DropDownMenu></>));
