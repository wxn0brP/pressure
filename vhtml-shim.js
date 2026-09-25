import h from 'vhtml'

export function Fragment(props) {
  const children = props?.children || []
  return Array.isArray(children) ? children.join('') : String(children)
}

export { h }
