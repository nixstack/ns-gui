import React, { Props, ReactNode } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  makeStyles,
  Theme,
  createStyles,
  useTheme,
  Divider,
  Box
} from '@material-ui/core'
import { Menu, MenuOpen, Minimize, Maximize, Close } from '@material-ui/icons'
import clsx from 'clsx'
// import { remote } from 'electron'
// import { WithStyles } from '@material-ui/styles';

interface IProps extends Props<null> {
  nav: ReactNode
  main: ReactNode
}

const drawerWidth = 240
const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
      // flexGrow: 1
    },
    grow: {
      flexGrow: 1
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1
      }
    },
    content: {
      flexGrow: 1,
      // padding: theme.spacing(3),
      paddingTop: theme.spacing(1),
      maxWidth: `calc(100% - ${theme.spacing(7) + 1}px)`,
      [theme.breakpoints.up('sm')]: {
        maxWidth: `calc(100% - ${theme.spacing(9) + 1}px)`
      }
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar
    }
  })
)

// interface IStyles extends WithStyles<typeof styles> {}
// const { remote } = window.require('electron')

let winManager = {} as any
if (window && (window as any).electron) {
  const remote = (window as any).electron.remote
  const ipcRenderer = (window as any).electron.ipcRenderer
  winManager = remote.getGlobal('winManager')
  ipcRenderer.on('app-win-toggle-maximize', (type: string, payload: any) => {
    console.log(payload.msg)
  })
}

const Layout = ({ nav, main }: IProps) => {
  const classes = styles()
  const theme = useTheme()

  const [open, setOpen] = React.useState(false)

  const handleDrawerOpenOrClose = () => {
    setOpen(!open)
  }

  return (
    <div className={`${classes.root} ${classes.grow}`}>
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            className={clsx(classes.menuButton, {
              // [classes.hide]: open,
            })}
            onClick={handleDrawerOpenOrClose}
          >
            {theme.direction === 'ltr' ? <Menu /> : <MenuOpen />}
          </IconButton>
          <div className={classes.grow} />
          <div>
            <IconButton onClick={() => winManager.minimize()} color="inherit">
              <Minimize></Minimize>
            </IconButton>
            <IconButton
              onClick={() => winManager.toggleMaximize()}
              color="inherit"
            >
              <Maximize></Maximize>
            </IconButton>
            <IconButton
              edge="end"
              aria-haspopup="true"
              onClick={() => winManager.close()}
              color="inherit"
            >
              <Close />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        // anchor="left"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <Box
          bgcolor="primary.main"
          color="primary.contrastText"
          display="flex"
          justifyContent="center"
          py={2.5}
        >
          NS GUI
        </Box>
        <Divider></Divider>
        {nav}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {main}
      </main>
    </div>
  )
}

export { Layout }
