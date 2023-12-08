import { List, ListItemButton, ListItemText } from "@mui/material";

const EditUserItems = [
  {
    id: 0,
    title: "Изменить права доступа",
  },
  {
    id: 1,
    title: "Отправить код повторно",
  },
  {
    id: 2,
    title: "Удалить",
  },
];

type EditUserProps = {
  handleCloseOptionsModal: () => void;
  onUpdateUserPermission: () => void;
  onDeleteUser: () => void;
};

const EditUser = ({ onUpdateUserPermission, onDeleteUser }: EditUserProps) => {
  return (
    <>
      <List>
        {EditUserItems.map((item) => {
          return (
            <ListItemButton
              key={item.id}
              onClick={
                item.id === 2
                  ? onDeleteUser
                  : item.id === 0
                  ? onUpdateUserPermission
                  : undefined
              }
              disabled={item.id === 1}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          );
        })}
      </List>
    </>
  );
};
export default EditUser;
