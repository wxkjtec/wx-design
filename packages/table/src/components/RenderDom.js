export const RenderDom = {
  functional: true,
  props: {
    render: Function,
  },
  render(createElement, context) {
    return context.props.render()
  },
}
