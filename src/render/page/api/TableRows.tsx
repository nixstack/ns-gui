import React from 'react'
import { TableCell, TableRow, IconButton, Box } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

interface Props {
  dataSourse: {}
  hasChild?: boolean
}
// https://github.com/mui-org/material-ui/issues/12984
export const TableRows = (props: Props) => {
  const { dataSourse, hasChild } = props
  const [expand, setExpand] = React.useState({})
  const handleExpand = (data: any, key: any) => {
    setExpand({ [key]: !(expand as any)[key] })
  }
  const renderCell = (data: any, text: string) => {
    if (
      Object.prototype.toString.call(data['$reflect']) === '[object Object]' ||
      (data['items'] &&
        Object.prototype.toString.call(data['items']['$reflect']) ===
          '[object Object]')
    ) {
      return (
        <Box>
          <IconButton
            edge="start"
            size="small"
            onClick={() => handleExpand(data, text)}
          >
            {(expand as any)[text] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
          {text}
        </Box>
      )
    } else {
      return hasChild ? <Box pl={3}>{text}</Box> : <span>{text}</span>
    }
  }

  const renderChild = (data: any) => {
    if (
      data['items'] &&
      Object.prototype.toString.call(data['items']['$reflect']) ===
        '[object Object]'
    ) {
      data.expand = false
      return <TableRows dataSourse={data['items']['$reflect']} hasChild />
    } else if (
      Object.prototype.toString.call(data['$reflect']) === '[object Object]'
    ) {
      data.expand = false
      return <TableRows dataSourse={data['$reflect']} hasChild />
    }
  }

  return (
    <React.Fragment>
      {Object.keys(dataSourse).map(key => {
        const data = (dataSourse as any)[key]
        return (
          <React.Fragment key={key}>
            <TableRow>
              <TableCell component="th" scope="row">
                {renderCell(data, key)}
              </TableCell>
              <TableCell align="right">{data.description}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">{data.type}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            {(expand as any)[key] && renderChild(data)}
          </React.Fragment>
        )
      })}
    </React.Fragment>
  )
}
