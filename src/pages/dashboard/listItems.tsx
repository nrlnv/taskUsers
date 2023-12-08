import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TaskIcon from "@mui/icons-material/Task";
import ChatIcon from "@mui/icons-material/Chat";
import FilterIcon from "@mui/icons-material/Filter";
import GroupsIcon from "@mui/icons-material/Groups";
import FeedIcon from "@mui/icons-material/Feed";
import PaidIcon from "@mui/icons-material/Paid";
import LogoutIcon from "@mui/icons-material/Logout";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DataSaverOffIcon />
      </ListItemIcon>
      <ListItemText primary="Аналитика" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Профиль" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <TaskIcon />
      </ListItemIcon>
      <ListItemText primary="Модерация" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText primary="Чаты" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FilterIcon />
      </ListItemIcon>
      <ListItemText primary="Баннеры" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <GroupsIcon />
      </ListItemIcon>
      <ListItemText primary="Команды" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FeedIcon />
      </ListItemIcon>
      <ListItemText primary="Блог" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PaidIcon />
      </ListItemIcon>
      <ListItemText primary="Курс валют" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon color={"error"} />
      </ListItemIcon>
      <ListItemText primary="Выйти" style={{ color: "#d32f2f" }} />
    </ListItemButton>
  </React.Fragment>
);
