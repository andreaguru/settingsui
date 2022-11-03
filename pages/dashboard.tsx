import { useEffect, useState } from "react"
import { styled, createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import MuiDrawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Link from "@mui/material/Link"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeft from "@mui/icons-material/ChevronLeft"
import ChevronRight from "@mui/icons-material/ChevronRight"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { secondaryListItems } from "../components/ListItems"
import Popover from "@mui/material/Popover"
import logo from "../public/eddi-logo.jpg"
import Image from "next/image"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Checkbox from "@mui/material/Checkbox"
import ListItemText from "@mui/material/ListItemText"
import OutlinedInput from "@mui/material/OutlinedInput"
import Chip from "@mui/material/Chip"
import MainContent from "../components/MainContent"
import { getClientsList } from "../api/DashboardAPI"
import { ClientsContext, FilteredClientsContext } from "../components/AppContext"

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const drawerWidth: number = 240
const appBarHeight: number = 64

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

interface ClientInterface {
  [key: string]: any
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    height: appBarHeight,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    marginTop: appBarHeight,
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const mdTheme = createTheme({
  components: {
    // Name of the component
    MuiChip: {
      styleOverrides: {
        // Name of the slot
        deleteIcon: {
          // Some CSS
        },
      },
    },
  },
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function DashboardContent() {
  const [open, setOpen] = useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const ariaOpen = Boolean(anchorEl)

  const [filteredClients, setFilteredClients] = useState<ClientInterface[]>([])
  const [clients, setClients] = useState<ClientInterface[]>([])

  const handleChange = (event: SelectChangeEvent<typeof filteredClients>) => {
    const {
      target: { value },
    } = event

    if (typeof value === "object") {
      setFilteredClients(value)
    }
  }

  const handleDelete = (chipToDelete: number) => () => {
    setFilteredClients((chips) => chips.filter((chip) => chip.id !== chipToDelete))
  }

  const handleCheckbox = (clientId: number) => {
    return filteredClients.some((filteredClient) => filteredClient.id === clientId)
  }

  useEffect(() => {
    getClientsList()
      .then((data) => {
        if (data) {
          setClients(data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <ClientsContext.Provider value={clients}>
      <FilteredClientsContext.Provider value={filteredClients}>
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
              <Toolbar
                sx={{
                  pr: "249px", // keep right padding when drawer closed
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: "36px",
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <List component="nav">
                  <Image alt="" layout="fixed" src={logo} width={50} height={50} />
                </List>
                <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                  Dashboard
                </Typography>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>{open ? <ChevronLeft /> : <ChevronRight />}</IconButton>
              </Toolbar>
              <Divider />
              <List component="nav">
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-checkbox-label">ClientiD / Name</InputLabel>
                  {clients.length > 0 && (
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={filteredClients}
                      onChange={handleChange}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={() => {
                        return false
                      }}
                      MenuProps={MenuProps}
                    >
                      {clients.map((client: any, index) => (
                        <MenuItem key={index} value={client}>
                          <Checkbox checked={handleCheckbox(client.id)} />
                          <ListItemText primary={client.id} />
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </FormControl>

                {filteredClients.map((client, key: any) => (
                  <div key={key}>
                    <Chip label={client.id} onDelete={handleDelete(client.id)} />
                  </div>
                ))}

                <Typography aria-owns={ariaOpen ? "mouse-over-popover" : undefined} aria-haspopup="true" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                  Hover with a Popover.
                </Typography>
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: "none",
                  }}
                  open={ariaOpen}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 1 }}>I use Popover.</Typography>
                </Popover>

                <Divider sx={{ my: 1 }} />
                {secondaryListItems}
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  {/* Chart */}
                  <Grid item xs={12} md={12} lg={12}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <MainContent />
                    </Paper>
                  </Grid>
                  {/* Recent Deposits */}
                  {/* Recent Orders */}
                </Grid>
                <Copyright sx={{ pt: 4 }} />
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      </FilteredClientsContext.Provider>
    </ClientsContext.Provider>
  )
}

export default DashboardContent
