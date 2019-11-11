import React, { PureComponent, ReactNode } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  List,
  ListItem,
  ListItemText,
  Input,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core'
import { DialogProps } from '@material-ui/core/Dialog'
import JsonEditor, {
  Props as JSONEditorProps
} from '../../lib/component/JsonEditor'

interface Props extends JSONEditorProps {
  doClose?: () => void
  doConfirm?: (data: {}) => void
}

// export default function Mock (props: Partial<Props> & {open: boolean}) {
//   const [open, setOpen] = React.useState(props.open);

//   const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
//   const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
//     setOpen(true);
//     setScroll(scrollType);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     props.doClose && props.doClose();
//   };
//   React.useEffect(() => {
//     const { current: descriptionElement } = descriptionElementRef;
//     if (descriptionElement !== null) {
//       descriptionElement.focus();
//     }
//   }, [open]);

//   const descriptionElementRef = React.useRef<HTMLElement>(null);
//   return (
//       <Dialog
//       open={open}
//       onClose={handleClose}
//       scroll={scroll}
//     >
//       <DialogTitle id="scroll-dialog-title">新增</DialogTitle>
//       <DialogContent dividers={scroll === 'paper'}>
//         <DialogContentText
//           id="scroll-dialog-description"
//           ref={descriptionElementRef}
//           tabIndex={-1}
//         >
//           {/* {[...new Array(50)]
//         .map(
//           () => `测试.`,
//         )
//         .join('\n')} */}
//           {/* <Box fontSize="h6.fontSize" m={1}>
//           响应
//         </Box> */}
//           {/* <JsonEditor json={props.resTemplate} /> */}
//         </DialogContentText>
//         <List>
//           <ListItem>
//             <ListItemText>名称：<Input
//             /></ListItemText>
//           </ListItem>
//           <ListItem>
//             <ListItemText>描述：<TextField
//             /></ListItemText>
//           </ListItem>
//         </List>
//         <JsonEditor {...props} />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose} color="primary">
//           取消
//     </Button>
//         <Button onClick={handleClose} color="primary">
//           确认
//     </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }

export default class Mock extends PureComponent<
  Partial<Props>,
  { scroll: DialogProps['scroll']; open: boolean }
> {
  private data: { name?: string; desc?: string; json?: {} }
  private editor: any
  constructor(props: any) {
    super(props)
    this.state = {
      scroll: 'paper',
      open: false
    }

    this.data = {
      name: '',
      desc: '',
      json: props.json
    }
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.open) {
      this.setState({
        open: true
      })
    }
  }
  render(): ReactNode {
    const props = this.props
    const state = this.state
    this.editor = React.createRef()
    return (
      <Dialog
        open={state.open}
        onClose={this.handleClose}
        scroll={state.scroll}
      >
        <DialogTitle id="scroll-dialog-title">新增</DialogTitle>
        <DialogContent dividers={state.scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            // ref={descriptionElementRef}
            tabIndex={-1}
          >
            {/* {[...new Array(50)]
        .map(
          () => `测试.`,
        )
        .join('\n')} */}
            {/* <Box fontSize="h6.fontSize" m={1}>
          响应
        </Box> */}
            {/* <JsonEditor json={props.resTemplate} /> */}
          </DialogContentText>
          <List>
            <ListItem>
              <ListItemText>
                名称：
                <Input onChange={e => (this.data.name = e.target.value)} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                描述：
                <TextField onChange={e => (this.data.desc = e.target.value)} />
              </ListItemText>
            </ListItem>
          </List>
          <JsonEditor
            {...props}
            ref={v => {
              this.editor = v
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            取消
          </Button>
          <Button onClick={this.confirm} color="primary">
            确认
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  handleClose = () => {
    this.setState({
      open: false
    })
    this.props.doClose && this.props.doClose()
  }

  confirm = () => {
    this.data.json = this.editor.get()
    this.handleClose()
    this.props.doConfirm && this.props.doConfirm(this.data)
  }

  open(data: {}) {
    if (!data) {
      // 新增
      this.data = {}
    } else {
      // 修改
      this.data = data
    }
    this.setState({
      open: true
    })
  }
}
