'use client'

import { useState } from 'react'

import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Tooltip from '@mui/material/Tooltip'

import LogoutIcon from '@mui/icons-material/Logout'

import { useRouter } from 'next/navigation'
import { useUserStore, USER_STORE_GETTERS } from '@/stores/user.store'
import { logoutUser } from '@/lib/auth'

export const UserAvatar = () => {
  const router = useRouter()
  const user = useUserStore(USER_STORE_GETTERS.user)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)

    await logoutUser()

    setIsLoggingOut(false)

    router.push('/login')
  }

  return (
    <>
      <Tooltip title={user.name}>
        <IconButton onClick={handleClick}>
          <Avatar sx={{ width: 32, height: 32 }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </>
  )
}
