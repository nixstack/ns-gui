import React from 'react'
import { Typography, Box } from '@material-ui/core'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
  p?: number
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, p, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={p}>{children}</Box>
    </Typography>
  )
}
