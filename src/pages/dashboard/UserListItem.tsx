import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { User } from "../../app/types";
import { useAppDispatch } from "../../app/store/store";

import { setCurrentUser } from "../../app/bus/currentUser/slice";
import theme from "../../app/theme";

type UserListItemProps = {
  user: User;
  currentUserEdit: () => void;
};

const UserListItem = ({ user, currentUserEdit }: UserListItemProps) => {
  const { name, email, permissions, image } = user;
  const dispatch = useAppDispatch();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <ListItem
        sx={{
          padding: 0,
          display: "flex",
          alignItems: isSmallScreen ? "flex-start" : "center",
        }}
      >
        <ListItemAvatar>
          {image ? (
            <Avatar
              alt={`Profile photo of ${name}`}
              src={image}
              sx={{ width: 50, height: 50 }}
            />
          ) : (
            <AccountCircleIcon sx={{ width: 50, height: 50 }} />
          )}
        </ListItemAvatar>
        <ListItemText
          sx={{ display: "flex", flexDirection: "column", gap: "px" }}
          primary={
            <ListItemText
              sx={{
                margin: "0px",
                padding: "0px",
                display: "flex",
                alignItems: "center",
                gap: isSmallScreen ? "1px" : "5px",
                flexWrap: "wrap",
              }}
              primary={name}
              secondary={email}
            ></ListItemText>
          }
          secondary={
            <List
              sx={{
                margin: "0px",
                padding: "0px",
                display: "flex",
                flexDirection: isSmallScreen ? "row" : "row",
                gap: isSmallScreen ? "1px" : "5px",
                width: isSmallScreen ? "100%" : "max-content",
                flexWrap: "wrap",
              }}
            >
              {permissions.map((permission: string, i: number) => (
                <ListItemText
                  sx={{
                    textAlign: "center",
                    border: "1px solid gray",
                    borderRadius: "10px",
                    padding: isSmallScreen ? "1px 1px" : "2px 8px",
                  }}
                  key={i}
                  primary={permission}
                />
              ))}
            </List>
          }
        />
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            dispatch(setCurrentUser(user));
            currentUserEdit();
          }}
        >
          <MoreHorizIcon />
        </IconButton>
      </ListItem>
    </>
  );
};
export default UserListItem;
