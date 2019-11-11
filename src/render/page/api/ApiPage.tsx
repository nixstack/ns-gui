import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Theme,
  withStyles,
  WithStyles,
  Box,
  Divider,
  Tabs,
  Tab,
  Paper,
  ListItem,
  ListItemText,
  List,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  createStyles,
  Typography
} from '@material-ui/core'
import React, { PureComponent } from 'react'
import { getResourse, getApis } from '../../api'
import { ResourseModel } from '../../model'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { TabPanel } from './TabPanel'
import { Close, Book, BugReport } from '@material-ui/icons'
import { TableRows } from './TableRows'
import SendApi from './SendApi'
import RequestParam from './RequestParam'
import { flatten } from 'flat'

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//   }),
// );

// const ApiPage = React.memo(() => {
//   const classes = useStyles();
//   const [age, setAge] = React.useState('');

//   React.useEffect(() => {
//     setLabelWidth(inputLabel.current!.offsetWidth);
//   }, []);

//   const inputLabel = React.useRef<HTMLLabelElement>(null);
//   const [labelWidth, setLabelWidth] = React.useState(0);

//   const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     setAge(event.target.value as string);
//   };

//   const [ resourses, setResourse ] = React.useState([] as ResourseModel[]);
//   getResourse().then(res => {
//     setResourse(res.data)
//   })

//   return (
//     <Grid container>
//       <Grid item xs={2}>
//       <FormControl variant="outlined" className={classes.formControl}>
//         <InputLabel ref={inputLabel}>
//           资源组
//         </InputLabel>
//         <Select
//           value={age}
//           onChange={handleChange}
//           labelWidth={labelWidth}
//         >
//           <MenuItem value="">
//             <em>资源组</em>
//           </MenuItem>
//           {resourses.map(item => (
//             <MenuItem value={item.url} key={item.name}>{item.name}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       </Grid>
//       <Grid item xs>33</Grid>
//     </Grid>
//   )
// }, () => true)

const styles = (theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    content: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper
    },
    centerContent: {
      maxHeight: `calc(100vh - ${64 + 48 + theme.spacing(1)}px)`,
      overflowY: 'auto'
    },
    tabNavBar: {
      // position: 'absolute',
      // https://material-ui.com/guides/typescript/
      // https://github.com/Microsoft/TypeScript/issues/241
      // https://stackoverflow.com/questions/46710747/type-string-is-not-assignable-to-type-inherit-initial-unset-fixe
      // position: 'fixed' as 'fixed',
      // top: `${64 + theme.spacing(1)}px`,
      // left: 310,
      // right: 0,
      // zIndex: 1000,
    },
    boxContent: {
      // paddingRight: theme.spacing(7) + 1,
      // [theme.breakpoints.up('sm')]: {
      //   paddingRight: theme.spacing(9) + 1,
      // },
      // height: `calc(100vh - ${64 + 48 + theme.spacing(1)}px)`,
      // maxHeight: `calc(100vh - ${64 + 48 + theme.spacing(1)}px)`,
      overflowY: 'auto'
    },
    rightTabsRoot: {
      // height: `calc(100vh - ${64 + 48 + theme.spacing(1)}px)`
    },
    rightTabRoot: {
      minWidth: 'inherit'
    },
    indicator: {
      right: 'inherit'
    },
    drawer: {
      // width: '100px',
      // flexShrink: 0,
      // whiteSpace: 'nowrap',
      // top: `calc(100vh - ${64 + 48 + theme.spacing(1)}px)`,
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      // overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1
      }
    },
    drawerPaper: {
      top: `${64 + 48 + theme.spacing(1)}px`
    }
  })

type Props = {}

type State = {
  activeResource: string
  resourses: ResourseModel[]
  labelWidth: number
  apiDocs: any
  tabs: any[]
  tabIndex: number
  tabRightIndex: number
  reqMock?: any
  resMock?: any
}

// type PropsWithStyles = Props & WithStyles<"formControl" | "selectEmpty">;
type PropsWithStyles = Props & WithStyles<typeof styles>

class ApiPageCls extends PureComponent<PropsWithStyles, State> {
  private inputLabel = React.createRef<HTMLLabelElement>()
  private requestParam = React.createRef()

  constructor(props: PropsWithStyles) {
    super(props)
    this.state = {
      activeResource: '',
      resourses: [],
      labelWidth: 0,
      apiDocs: {},
      tabs: [],
      tabIndex: 0,
      tabRightIndex: 0
    }
  }

  componentDidMount() {
    getResourse().then(res => {
      if (res.data.length) {
        const resourses = res.data.filter(item => item.name !== 'zuul-gateway')
        this.setState(
          {
            resourses: resourses,
            activeResource: resourses[0].url || resourses[0].location
          },
          () => {
            getApis(this.state.activeResource).then(res => {
              this.setState({
                apiDocs: res.data
              })
            })
          }
        )
      }
    })
  }

  getRequestParams = (left: any, right: any) => {
    this.setState({
      reqMock: left,
      resMock: right
    })
  }

  doSend = () => {
    console.log(this.state)
  }

  get apiDetail() {
    const { classes } = this.props
    return (
      <div className={this.props.classes.content}>
        <Paper square className={classes.tabNavBar}>
          <Tabs
            value={this.state.tabIndex}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {this.state.tabs.length &&
              this.state.tabs.map((item, index) => {
                const path = Object.keys(item)[0]
                const apiInfo = item[path]
                const paths = path.split('|')
                const pathInfo = apiInfo['paths'][paths[0]][paths[1]]
                return (
                  <Tab
                    label={
                      <Box>
                        {/* <Box><Chip
                        size="medium"
                        // icon={<Close  />}
                        label={pathInfo.summary}
                        onDelete={() => {}}
                        color="primary"
                      /></Box> */}
                        <Box>{pathInfo.summary}</Box>
                        <Box position="absolute" top={0} right={0}>
                          <Close
                            onClick={() => this.handleCloseTab(index)}
                            fontSize="small"
                          />
                        </Box>
                        <Box position="absolute" top={10} bottom={0} right={0}>
                          <Divider
                            style={{ height: '30px' }}
                            orientation="vertical"
                          />
                        </Box>
                      </Box>
                    }
                    key={index}
                  ></Tab>
                )
              })}
            {/* <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
                <Tab label="Item Four" />
                <Tab label="Item Five" />
                <Tab label="Item Six" />
                <Tab label="Item Seven" />
                <Tab label="Item Seven" />
                <Tab label="Item Seven" />
                <Tab label="Item Seven" />
                <Tab label="Item Seven" /> */}
          </Tabs>
        </Paper>
        <Box display="flex" className={this.props.classes.centerContent}>
          <Box flexGrow={1} className={classes.boxContent}>
            {this.state.tabs.map((item, index) => {
              const path = Object.keys(item)[0]
              const apiInfo = item[path]
              const paths = path.split('|')
              const pathInfo = apiInfo['paths'][paths[0]][paths[1]]
              let schemaRef
              let schemaRes
              if (
                pathInfo.responses['200']['schema'] &&
                pathInfo.responses['200']['schema']['$ref']
              ) {
                schemaRef = pathInfo.responses['200']['schema']['$ref'].replace(
                  '#/definitions/',
                  ''
                )
                schemaRes = apiInfo.definitions[schemaRef]
              }
              const initRes = [{}, {}, {}]
              const mapToChildern = function(schema: any) {
                return (
                  schema &&
                  schema.properties &&
                  Object.keys(schema.properties).reduce(
                    (prev: any, cur: any) => {
                      if (schema.properties[cur].type === 'array') {
                        const ref =
                          schema.properties[cur].items &&
                          schema.properties[cur].items['$ref'] &&
                          schema.properties[cur].items['$ref'].replace(
                            '#/definitions/',
                            ''
                          )
                        if (ref) {
                          // schema.properties[cur].items['$reflect'] = mapToChildern(apiInfo.definitions[schema.properties[cur].items.originalRef]);
                          // prev[1][cur] = [schema.properties[cur].items['$reflect'][1]];
                          const tmp = mapToChildern(apiInfo.definitions[ref])
                          schema.properties[cur].items['$reflect'] = tmp[0]
                          prev[1][cur] = [tmp[1]]
                          prev[2][cur] = [tmp[0]]
                        }
                      } else {
                        const ref =
                          schema.properties[cur]['$ref'] &&
                          schema.properties[cur]['$ref'].replace(
                            '#/definitions/',
                            ''
                          )
                        if (ref) {
                          if (!schema.properties[cur].type) {
                            schema.properties[cur].type = 'object'
                          }
                          const tmp = mapToChildern(apiInfo.definitions[ref])
                          schema.properties[cur]['$reflect'] = tmp[0]
                          prev[1][cur] = tmp[1]
                          prev[2][cur] = tmp[0]
                        } else {
                          switch (schema.properties[cur].type) {
                            case 'integer':
                              prev[1][cur] = 0
                              break
                            case 'boolean':
                              prev[1][cur] = false
                              break
                            default:
                              prev[1][cur] = ''
                              break
                          }
                          prev[2][cur] = schema.properties[cur]
                        }
                      }

                      return [
                        { ...prev[0], [cur]: schema.properties[cur] },
                        prev[1],
                        prev[2]
                      ]
                    },
                    initRes
                  )
                )
              }
              const res = mapToChildern(schemaRes) || initRes
              let definitions = JSON.stringify(apiInfo.definitions || {})
              // unknown format "int32" is used in schema at path
              definitions = JSON.parse(
                definitions
                  .replace(/"format":"int32"/g, '')
                  .replace(/,,/g, ',')
                  .replace(/,}/g, '}')
                  .replace(/{,/g, '{')
              )
              let properties = JSON.parse(
                JSON.stringify(res[0])
                  .replace(/"format":"int32"/g, '')
                  .replace(/,,/g, ',')
                  .replace(/,}/g, '}')
                  .replace(/{,/g, '{')
              )
              res[0] = { type: 'object', properties, definitions }
              const resSchema = res[0]
              const resTemplate = res[1]
              const resEntityFlatten = flatten(resSchema.properties) as any

              return (
                <TabPanel
                  value={this.state.tabIndex}
                  index={index}
                  key={index}
                  p={3}
                >
                  <TabPanel value={this.state.tabRightIndex} index={0}>
                    <List>
                      <ListItem>
                        <ListItemText>{pathInfo.summary}</ListItemText>
                      </ListItem>
                    </List>
                    <Divider />
                    <List>
                      <ListItem>
                        <ListItemText>
                          接口地址
                          <Box component="span" pl={2} color="secondary.main">
                            {paths[0]}
                          </Box>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>
                          请求方法
                          <Box component="span" pl={2} color="secondary.main">
                            {paths[1]}
                          </Box>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>
                          请求类型
                          <Box component="span" pl={2} color="secondary.main">
                            {pathInfo.consumes}
                          </Box>
                        </ListItemText>
                      </ListItem>
                    </List>
                    <List>
                      <ListItem>
                        <ListItemText>请求参数</ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>
                          <Paper>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>参数名称</TableCell>
                                  <TableCell align="right">参数描述</TableCell>
                                  <TableCell align="right">参数类型</TableCell>
                                  <TableCell align="right">是否必填</TableCell>
                                  <TableCell align="right">数据类型</TableCell>
                                  <TableCell align="right">参数模型</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {pathInfo.parameters &&
                                  pathInfo.parameters.map((row: any) => (
                                    <TableRow key={row.name}>
                                      <TableCell component="th" scope="row">
                                        {row.name}
                                      </TableCell>
                                      <TableCell align="right">
                                        {row.description}
                                      </TableCell>
                                      <TableCell align="right">
                                        {row.in}
                                      </TableCell>
                                      <TableCell align="right">
                                        {row.required + ''}
                                      </TableCell>
                                      <TableCell align="right">
                                        {row.type}
                                      </TableCell>
                                      <TableCell align="right"></TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </Paper>
                        </ListItemText>
                      </ListItem>
                    </List>
                    <List>
                      <ListItem>
                        <ListItemText>响应数据</ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>
                          <Paper>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>参数名称</TableCell>
                                  <TableCell align="right">参数描述</TableCell>
                                  <TableCell align="right">参数类型</TableCell>
                                  <TableCell align="right">是否有值</TableCell>
                                  <TableCell align="right">数据类型</TableCell>
                                  <TableCell align="right">参数模型</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRows dataSourse={resSchema.properties} />
                              </TableBody>
                            </Table>
                          </Paper>
                        </ListItemText>
                      </ListItem>
                    </List>
                  </TabPanel>
                  <TabPanel value={this.state.tabRightIndex} index={1}>
                    <div>
                      <Typography component="div">
                        <Box m={1}>数据模拟</Box>
                        {/* <Box fontFamily="Monospace" fontSize="h6.fontSize" m={1}>
                            Monospace
                          </Box> */}
                      </Typography>
                      <RequestParam
                        resTemplate={resTemplate}
                        resSchema={resSchema}
                        resEntityFlatten={resEntityFlatten}
                        ref={this.requestParam}
                        doChange={this.getRequestParams}
                      >
                        {() => {}}
                      </RequestParam>
                      <SendApi api={paths[0]} doSend={this.doSend} />
                    </div>
                  </TabPanel>
                </TabPanel>
              )
            })}
          </Box>
          <Box>
            {/* <Paper style={{flexGrow: 1, display: 'flex', height: 224,}}> */}
            {/* <Drawer
            variant="permanent"
            anchor="right"
            className={clsx(classes.drawer)}
            classes={{
              paper: clsx(classes.drawerPaper, {
                [classes.drawerClose]: true,
              }),
            }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={this.state.tabRightIndex}
                onChange={this.handleTabRightChange}
                classes={{ root: classes.rightTabsRoot, indicator: classes.indicator }}
              >
                <Tab label="文档" icon={<Book />} classes={{root: classes.rightTabRoot}} />
                <Tab label="调试" icon={<BugReport />} classes={{root: classes.rightTabRoot}} />
              </Tabs>
            </Drawer> */}
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={this.state.tabRightIndex}
              onChange={this.handleTabRightChange}
              classes={{
                root: classes.rightTabsRoot,
                indicator: classes.indicator
              }}
            >
              <Tab
                label="文档"
                icon={<Book />}
                classes={{ root: classes.rightTabRoot }}
              />
              <Tab
                label="调试"
                icon={<BugReport />}
                classes={{ root: classes.rightTabRoot }}
              />
            </Tabs>
          </Box>
        </Box>
      </div>
    )
  }

  handleClickApi(api: string, method: string, apiDocs: any): void {
    let existIndex = this.state.tabs.findIndex(
      item => Object.keys(item)[0] === api + '|' + method
    )
    if (existIndex < 0) {
      this.setState({
        tabs: [...this.state.tabs, { [api + '|' + method]: apiDocs }]
      })
    } else {
      // 先删除，再放入第0个位置
      // this.state.tabs.splice(existIndex, 1);
      // this.setState({
      //   tabs: [{ [api + '|' + method]: apiDocs }, ...this.state.tabs]
      // })
    }

    setTimeout(() => {
      existIndex = this.state.tabs.findIndex(
        item => Object.keys(item)[0] === api + '|' + method
      )
      this.setState({
        tabIndex: existIndex
      })
    })
  }

  handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (this.state.tabs.length > 0 && this.state.tabs.length - 1 >= newValue) {
      // 点击tab
      this.setState({
        tabIndex: newValue
      })
    } else {
      // 删除tab
      this.setState({
        tabIndex: this.state.tabs.length - 1
      })
    }
  }

  handleTabRightChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({
      tabRightIndex: newValue
    })
  }

  handleCloseTab(index: number): void {
    const tmpTabs = this.state.tabs
    if (tmpTabs.length === 1) {
      this.setState({
        tabs: []
      })
    } else {
      tmpTabs.splice(index, 1)
      const lastTabsIndex = tmpTabs.length - 1
      this.setState({
        tabIndex: lastTabsIndex,
        tabs: [...tmpTabs]
        // tabIndex: tmpTabs.length - 1,
      })

      // this.setState((prevState, props) => ({
      //   tabs: [...tmpTabs],
      //   tabIndex: lastTabsIndex,
      // }))
    }
  }

  render() {
    const classes = this.props.classes
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      this.setState({
        activeResource: event.target.value as string,
        labelWidth: this.inputLabel.current!.offsetWidth
      })

      if (event.target.value !== '') {
        getApis(event.target.value as string).then(res => {
          this.setState({
            apiDocs: res.data
          })
        })
      }
    }

    return (
      <Grid container>
        <Grid item xs={2}>
          <Box px={1}>
            <FormControl className={classes.formControl}>
              <InputLabel ref={this.inputLabel}>资源组</InputLabel>
              <Select
                value={this.state.activeResource}
                onChange={handleChange}
                // labelWidth={this.state.labelWidth}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                {this.state.resourses.map(item => (
                  <MenuItem value={item.url || item.location} key={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {this.state.apiDocs.tags && (
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
              >
                {(this.state.apiDocs.tags as []).map((tag: any, indexRoot) => (
                  <TreeItem
                    nodeId={indexRoot + ''}
                    label={tag.name}
                    key={Math.random().toString()}
                  >
                    {this.state.apiDocs.paths &&
                      Object.keys(this.state.apiDocs.paths).map(
                        (item: any, index) => {
                          return Object.keys(this.state.apiDocs.paths[item])
                            .filter(method => {
                              return (
                                this.state.apiDocs.paths[item][method][
                                  'tags'
                                ].indexOf(tag.name) > -1
                              )
                            })
                            .map(method => (
                              <TreeItem
                                nodeId={indexRoot + '-' + index}
                                key={Math.random().toString()}
                                label={
                                  <Box
                                    key={Math.random().toString()}
                                    display="flex"
                                    onClick={() =>
                                      this.handleClickApi(
                                        item,
                                        method,
                                        this.state.apiDocs
                                      )
                                    }
                                  >
                                    <Box flexGrow={1}>
                                      {
                                        this.state.apiDocs.paths[item][method]
                                          .summary
                                      }
                                    </Box>
                                    <Box>{method.toUpperCase()}</Box>
                                  </Box>
                                }
                              />
                            ))
                        }
                      )}
                  </TreeItem>
                ))}
              </TreeView>
            )}
          </Box>
        </Grid>
        <Grid item xs={10}>
          {this.state.tabs.length > 0 ? (
            <Box>{this.apiDetail}</Box>
          ) : (
            <Box
              position="absolute"
              top="50%"
              left="50%"
              zIndex={100000}
              p={2}
              bgcolor="secondary.main"
              color="primary.contrastText"
            >
              请选择任意接口查看详情信息
            </Box>
          )}
        </Grid>
      </Grid>
    )
  }
}

const ApiPage = withStyles(styles)(ApiPageCls)

export { ApiPage }
