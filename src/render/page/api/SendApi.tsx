import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import { Button } from '@material-ui/core'
import { Edit, SendOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center'
      // width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    }
  })
)

interface Props {
  method?: string
  api: string
  doSend?: Function
}

export default function SendApi(props: Props) {
  const classes = useStyles()
  const { method = 'GET', api, doSend = () => {} } = props

  return (
    <Paper className={classes.root}>
      <Button variant="contained" color="primary">
        {/* <MenuIcon /> */}
        {method.toUpperCase()}
      </Button>
      <InputBase className={classes.input} value={api} />
      <IconButton className={classes.iconButton}>
        <Edit />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        onClick={() => doSend()}
      >
        <SendOutlined />
      </IconButton>
    </Paper>
  )
}
