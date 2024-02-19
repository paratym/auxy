import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  heading: {
    color: "blue",
  },
});

export function Heading() {
  return <h1 {...stylex.props(styles.heading)}>Hello, world!</h1>;
}
