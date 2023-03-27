export const RenderDom = {
  functional: true,
  props: {
    render: Function,
    row: Object,
    index: Number,
    column: Object,
  },
  render: (h, context) => context.props.render(h, context.props),
};
