import { storiesOf } from "@storybook/react";
import React from "react";
import DropDownMenu from "./DropDownMenu";

const DropDownMenuStories = storiesOf("DropDownMenu", module);

DropDownMenuStories.add("Default usage", () => (
  <div
    style={{
      paddingLeft: "45%"
    }}
  >
    <DropDownMenu
      items={[
        {
          label: "Logout",
          searchable: "logout",
          disabled: false,
          action: () => {}
        }
      ]}
    >
      Menu label
    </DropDownMenu>
  </div>
));
