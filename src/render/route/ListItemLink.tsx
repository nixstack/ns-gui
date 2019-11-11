import React from 'react'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  useLocation
} from 'react-router-dom'
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Theme,
  withStyles
} from '@material-ui/core'

// const ListItemLink = withRouter((props: any) => {
//   const { icon, primary, to } = props;

//   const renderLink = React.useMemo(
//     () =>
//       React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'innerRef' | 'to'>>(
//         (itemProps, ref) => (
//           // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
//           // See https://github.com/ReactTraining/react-router/issues/6056
//           <RouterLink to={to} {...itemProps} innerRef={ref} />
//         ),
//       ),
//     [to],
//   );

//   console.log(props)

//   return (
//     <li>
//       <ListItem button component={renderLink}>
//         {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
//         <ListItemText primary={primary} />
//       </ListItem>
//     </li>
//   );
// })

// https://material-ui.com/customization/components/#overriding-styles-with-classes
const styles = (theme: Theme) => ({
  root: {
    '&$selected': {
      backgroundColor: theme.palette.action.selected
    }
  },
  selected: {
    // backgroundColor: `${theme.palette.primary.main} !important`,
    // backgroundColor: `${theme.palette.primary.main}`,
  }
})

const ListItemLink = withStyles(styles as any)((props: any) => {
  const { icon, primary, to } = props

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<
        HTMLAnchorElement,
        Omit<RouterLinkProps, 'innerRef' | 'to'>
      >((itemProps, ref) => (
        // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
        // See https://github.com/ReactTraining/react-router/issues/6056
        <RouterLink to={to} {...itemProps} innerRef={ref} />
      )),
    [to]
  )

  const location = useLocation()
  const isMatch = location.pathname === to

  return (
    // <li>
    //   <ListItem button component={renderLink} alignItems="flex-start">
    //     {icon ? <ListItemIcon classes={{ root: 'myroot' }} color={isMatch ? "primary" : ""}>{icon}</ListItemIcon> : null}
    //     <ListItemText primary={primary} color={isMatch ? "primary" : ""} />
    //   </ListItem>
    // </li>

    // <li className={props.classes.root}>
    //   <ListItem button component={renderLink} selected={isMatch} classes={{root: "myRoot", selected: clsx({[props.classes.selected]: isMatch})}}>
    //     {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
    //     <ListItemText primary={primary} />
    //   </ListItem>
    // </li>
    <li>
      <ListItem
        button
        component={renderLink}
        selected={isMatch}
        classes={{ root: props.classes.root, selected: props.classes.selected }}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
})

export { ListItemLink }
