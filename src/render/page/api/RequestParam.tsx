import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { IconButton, Radio } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import Mock from './Mock'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto'
    },
    cardHeader: {
      padding: theme.spacing(1, 2)
    },
    list: {
      width: 200,
      height: 230,
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto'
    },
    button: {
      margin: theme.spacing(0.5, 0)
    }
  })
)

interface Props {
  resTemplate?: object
  resSchema?: object
  resEntityFlatten?: object
  children?: any
  doChange?: (left: any, right: any) => void
}

export default React.forwardRef((props: Props, ref: any) => {
  const classes = useStyles()
  const [, setChecked] = React.useState<number[]>([])
  const [left] = React.useState<any[]>([])
  const [right, setRight] = React.useState<any[]>([])
  let resMock = React.useRef<any>()

  const handleToggle = (value: number) => () => {
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];

    // if (currentIndex === -1) {
    //   newChecked.push(value);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }

    setChecked([value])
  }

  const [place, setPlace] = React.useState('')

  const onAdd = (place: string) => {
    // setIsOpen(!isOpen);
    setPlace(place)
    if (place === 'right') {
      resMock.current.open()
    }
  }

  const doResMockConfirm = (data: {}) => {
    const newAdds = {
      ...data,
      id: Math.random()
        .toString()
        .replace('0.', ''),
      checked: true
    }
    setRight([
      ...right.map((item: any) => {
        item.checked = false
        return item
      }),
      newAdds
    ])
    props.doChange && props.doChange(left.find(item => item.checked), newAdds)
  }

  const mockChange = (place: string, id: string) => {
    let current
    if (place === 'right') {
      setRight(
        right.map((item: any) => {
          if (item.id === id) {
            item.checked = true
          } else {
            item.checked = false
          }
          current = item
          return item
        })
      )
      props.doChange && props.doChange(left.find(item => item.checked), current)
    }
  }

  const customList = (
    place: string,
    title: React.ReactNode,
    items: object[]
  ) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <IconButton onClick={() => onAdd(place)}>
            <Add />
          </IconButton>
        }
        title={title}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value: any) => {
          const labelId = `transfer-list-all-item-${value}-label`
          return (
            <ListItem
              key={value.id}
              role="listitem"
              button
              onClick={handleToggle(value.id)}
            >
              <ListItemIcon>
                <Radio
                  checked={value.checked}
                  onChange={() => mockChange('right', value.id)}
                  // tabIndex={-1}
                  // disableRipple
                  value={value.id}
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'A' }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name}></ListItemText>
              {/* <ListItemText id={labelId} primary={<span>{value.name}                <Edit color="secondary" />
                <Delete color="secondary" /></span>}></ListItemText> */}
            </ListItem>
          )
        })}
        <ListItem />
      </List>
    </Card>
  )

  let customProps = {}
  switch (place) {
    case 'left':
      break
    case 'right':
      customProps = {
        json: props.resTemplate,
        options: { schema: props.resSchema },
        jsonModelFlat: props.resEntityFlatten
      }
      break
  }

  return (
    <div>
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>{customList('left', '请求', left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              // aria-label="move selected right"
            >
              &lt;&gt;
            </Button>
            {/* <Button
              variant="outlined"
              size="small"
              className={classes.button}
              disabled={rightChecked.length === 0}
              // aria-label="move selected left"
            >
              &lt;
          </Button> */}
          </Grid>
        </Grid>
        <Grid item>{customList('right', '响应', right)}</Grid>
      </Grid>
      <Mock {...customProps} />
      {/* <Mock ref={resMock}  {...customProps} doConfirm={doResMockConfirm} /> */}
      <Mock ref={resMock} {...customProps} doConfirm={doResMockConfirm} />
    </div>
  )
})

// export default function RequestParam(props: Props & {ref: Ref<any>}) {
//   const classes = useStyles();
//   const [checked, setChecked] = React.useState<number[]>([]);
//   const [left, setLeft] = React.useState<object[]>([]);
//   const [right, setRight] = React.useState<object[]>([]);
//   let resMock = React.useRef<any>();

//   const handleToggle = (value: number) => () => {
//     // const currentIndex = checked.indexOf(value);
//     // const newChecked = [...checked];

//     // if (currentIndex === -1) {
//     //   newChecked.push(value);
//     // } else {
//     //   newChecked.splice(currentIndex, 1);
//     // }

//     setChecked([value]);
//   };

//   const [place, setPlace] = React.useState('');

//   const onAdd = (place: string) => {
//     // setIsOpen(!isOpen);
//     setPlace(place);
//     if (place === 'right') {
//       resMock.current.open();
//     }
//   }

//   const doResMockConfirm = (data: {}) => {
//     setRight([...right.map((item: any) => {
//       item.checked = false;
//       return item;
//     }), { ...data, id: Math.random().toString().replace('0.', ''), checked: true }])
//   }

//   const mockChange = (place: string, id: string) => {
//     if (place === 'right') {
//       setRight(right.map((item: any) => {
//         if (item.id === id) {
//           item.checked = true;
//         } else {
//           item.checked = false;
//         }
//         return item;
//       }));
//     }
//   }

//   const customList = (place: string, title: React.ReactNode, items: object[]) => (
//     <Card>
//       <CardHeader
//         className={classes.cardHeader}
//         avatar={
//           <IconButton onClick={() => onAdd(place)}>
//             <Add />
//           </IconButton>
//         }
//         title={title}
//       />
//       <Divider />
//       <List className={classes.list} dense component="div" role="list">
//         {items.map((value: any) => {
//           const labelId = `transfer-list-all-item-${value}-label`;
//           return (
//             <ListItem key={value.id} role="listitem" button onClick={handleToggle(value.id)}>
//               <ListItemIcon>
//                 <Radio
//                   checked={value.checked}
//                   onChange={() => mockChange("right", value.id)}
//                   // tabIndex={-1}
//                   // disableRipple
//                   value={value.id}
//                   name="radio-button-demo"
//                   inputProps={{ 'aria-label': 'A' }}
//                 />
//               </ListItemIcon>
//               <ListItemText id={labelId} primary={value.name}></ListItemText>
//                 {/* <ListItemText id={labelId} primary={<span>{value.name}                <Edit color="secondary" />
//                 <Delete color="secondary" /></span>}></ListItemText> */}
//             </ListItem>
//           );
//         })}
//         <ListItem />
//       </List>
//     </Card>
//   );

//   let customProps = {};
//   switch (place) {
//     case 'left':
//       break;
//     case 'right':
//       customProps = { json: props.resTemplate, options: { schema: props.resSchema }, jsonModelFlat: props.resEntityFlatten }
//       break;
//   }

//   return (
//     <div>
//       <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
//         <Grid item>{customList("left", '请求', left)}</Grid>
//         <Grid item>
//           <Grid container direction="column" alignItems="center">
//             <Button
//               variant="outlined"
//               size="small"
//               className={classes.button}
//             // aria-label="move selected right"
//             >
//               &lt;&gt;
//           </Button>
//             {/* <Button
//               variant="outlined"
//               size="small"
//               className={classes.button}
//               disabled={rightChecked.length === 0}
//               // aria-label="move selected left"
//             >
//               &lt;
//           </Button> */}
//           </Grid>
//         </Grid>
//         <Grid item>{customList("right", '响应', right)}</Grid>
//       </Grid>
//       <Mock {...customProps} />
//       <Mock ref={resMock}  {...customProps} doConfirm={doResMockConfirm} />
//     </div>
//   );
// }
