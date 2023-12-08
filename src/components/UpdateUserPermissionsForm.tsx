import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CheckboxesTags from "./ChecboxesTags";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../app/store/store";
import { updatePermissions } from "../app/bus/user/slice";

export type FormData = {
  email: string;
  permissions: string[];
};

type UpdateUserPermissionsFormProps = {
  email: string;
  closeModal: () => void;
};

const UpdateUserPermissionsForm = ({
  email,
  closeModal,
}: UpdateUserPermissionsFormProps) => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, setValue, reset } = useForm<FormData>({
    defaultValues: {
      email: email,
      permissions: [],
    },
  });

  const handlePermissionsChange = (selectedPermissions: string[]) => {
    setValue("permissions", selectedPermissions);
  };

  const onSubmit = (data: FormData) => {
    dispatch(updatePermissions(data));
    reset();
    closeModal();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Изменить права доступа
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            disabled
            margin="normal"
            fullWidth
            id="email"
            // label={email}
            value={email}
            autoComplete="email"
            autoFocus
            {...register("email")}
          />
          <CheckboxesTags
            name="permissions"
            onChange={handlePermissionsChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Изменить
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateUserPermissionsForm;
