import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SearchInput from "../../components/SearchInput";
import UserListItem from "./UserListItem";
import { useState } from "react";
import ModalWrapper from "../../components/ModalWrapper";
import InvitationForm, { FormData } from "../../components/InvitationForm";
import { SubmitHandler } from "react-hook-form";
import { User } from "../../app/types";
import { addUser, removeUser } from "../../app/bus/user/slice";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import EditUser from "./EditUser";
import UpdateUserPermissionsForm from "../../components/UpdateUserPermissionsForm";
import theme from "../../app/theme";

export default function Team() {
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [invitedUser, setInvitedUser] = useState<FormData | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [invitedEmail, setInvitedEmail] = useState<string | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.userSlice);
  const { currentUser } = useAppSelector((state) => state.currentUserSlice);

  const handleSearch = (results: User[]) => {
    setSearchResults(results);
    setSearching(true);
  };

  const handleOpenModal = () => {
    setIsAddUserModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddUserModalOpen(false);
    setInvitedUser(null);
  };

  const handleInvitationSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(addUser({ ...data, name: "Пользователь", image: "" }));
    setInvitedUser(data);
    setInvitedEmail(data.email);
    handleCloseModal();
    setShowSuccessModal(true);
  };

  const handleOptionsModal = () => {
    setIsEditModalVisible(1);
  };

  const handleCloseOptionsModal = () => {
    setIsEditModalVisible(0);
  };
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isSmallScreen ? "flex-start" : "center",
          gap: isSmallScreen ? 1 : 0,
          marginBottom: "12px",
        }}
      >
        <Typography variant="h6">Команда</Typography>
        <Box
          sx={{
            display: "flex",
            width: isSmallScreen ? "100%" : "auto",
            flexDirection: isSmallScreen ? "column" : "row",
            gap: isSmallScreen ? 1 : "5px",
          }}
        >
          <SearchInput onSearch={handleSearch} />
          <Button variant={"contained"} onClick={handleOpenModal} size="small">
            Добавить пользователя
          </Button>
        </Box>
      </Box>
      <ModalWrapper
        open={isAddUserModalOpen}
        handleClose={() => setIsAddUserModalOpen(false)}
        content={
          <InvitationForm
            onSubmit={handleInvitationSubmit}
            existingEmails={users.map((user) => user.email)}
          />
        }
      />
      <Divider />
      <List>
        {searching ? (
          searchResults.length > 0 ? (
            searchResults.map((user: User, i: number) => (
              <UserListItem
                key={i}
                user={user}
                currentUserEdit={handleOptionsModal}
              />
            ))
          ) : (
            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    color={"red"}
                    variant="subtitle1"
                    sx={{ textAlign: "center" }}
                  >
                    Not found
                  </Typography>
                }
              />
            </ListItem>
          )
        ) : users.length ? (
          users.map((user: User, i: number) => (
            <UserListItem
              key={i}
              user={user}
              currentUserEdit={handleOptionsModal}
            />
          ))
        ) : (
          <Typography textAlign={"center"} marginTop={2}>
            В команде никого нет
          </Typography>
        )}
        {invitedUser && (
          <UserListItem
            key={searching ? searchResults.length + 1 : users.length + 1}
            user={{
              name: "Пользователь",
              email: invitedUser.email,
              permissions: invitedUser.permissions,
              image: "",
            }}
            currentUserEdit={handleOptionsModal}
          />
        )}
      </List>
      {showSuccessModal && (
        <ModalWrapper
          open={true}
          handleClose={() => setShowSuccessModal(false)}
          useButton
          content={
            <Typography textAlign={"center"}>
              Приглашение отправлено на почту {invitedEmail}
            </Typography>
          }
        />
      )}
      <ModalWrapper
        open={isEditModalVisible === 1}
        handleClose={handleCloseOptionsModal}
        content={
          <EditUser
            handleCloseOptionsModal={handleCloseOptionsModal}
            onUpdateUserPermission={() => setIsEditModalVisible(2)}
            onDeleteUser={() => {
              dispatch(removeUser(currentUser.email));
              setIsEditModalVisible(3);
            }}
          />
        }
      />
      <ModalWrapper
        open={isEditModalVisible === 2}
        handleClose={handleCloseOptionsModal}
        content={
          <UpdateUserPermissionsForm
            email={currentUser.email}
            closeModal={() => setIsEditModalVisible(0)}
          />
        }
      />
      <ModalWrapper
        open={isEditModalVisible === 3}
        handleClose={handleCloseOptionsModal}
        useButton
        content={
          <Typography textAlign={"center"}>
            Пользователь успешно удален
          </Typography>
        }
      />
    </>
  );
}
