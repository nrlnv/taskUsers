import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CheckboxesTags from "./ChecboxesTags";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

export type FormData = {
  email: string;
  permissions: string[];
};

type InvitationFormProps = {
  onSubmit: SubmitHandler<FormData>;
  existingEmails: string[];
};

const InvitationForm = ({ onSubmit, existingEmails }: InvitationFormProps) => {
  const [isEmailIncluded, setIsEmailIncluded] = useState<boolean>(false);
  const [duplicateUserEmail, setDuplicateUserEmail] = useState<string | null>(
    null
  );

  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      email: "",
      permissions: [],
    },
  });

  const handlePermissionsChange = (selectedPermissions: string[]) => {
    setValue("permissions", selectedPermissions);
  };

  const isEmailExisting = (email: string) => existingEmails.includes(email);

  const submitForm = (data: FormData) => {
    const { email } = data;

    if (isEmailExisting(email)) {
      setDuplicateUserEmail(email);
      setIsEmailIncluded(true);
      return;
    }

    onSubmit(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      {isEmailIncluded ? (
        <Typography
          textAlign={"center"}
          variant={"subtitle2"}
        >{`User ${duplicateUserEmail} already in the team`}</Typography>
      ) : (
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Отправьте приглашение
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(submitForm)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
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
              Отправить приглашение
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default InvitationForm;
