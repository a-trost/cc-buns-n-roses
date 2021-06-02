import Credit from "./";
import { storiesOf } from "@storybook/react";

storiesOf("Credit", Credit).add("Complete", () => (
  <Credit
    author="Alex Trost"
    twitter="https://twitter.com/trostcodes"
    youtube="https://youtube.com"
    codepen="https://codepen.io"
  />
));
