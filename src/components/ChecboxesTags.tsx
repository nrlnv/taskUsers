import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useState } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type CheckboxesTagsProps = {
  name: string;
  onChange: (selectedPermissions: string[]) => void;
};

export default function CheckboxesTags({
  name,
  onChange,
}: CheckboxesTagsProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const handleOptionsChange = (
    _el: any,
    selectedOptions: { title: string }[]
  ) => {
    const selectedPermissions = selectedOptions.map(
      (option: { title: string }) => option.title
    );

    if (selectedPermissions.includes("Все")) {
      const allPermissionsExceptAll = permissions
        .filter((option) => option.title !== "Все")
        .map((option) => option.title);
      onChange(allPermissionsExceptAll);
      setSelectedOptions(allPermissionsExceptAll);
    } else {
      onChange(selectedPermissions);
      setSelectedOptions(selectedPermissions);
    }
  };

  return (
    <Autocomplete
      multiple
      id="permissions"
      options={permissions}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      value={permissions.filter((option) =>
        selectedOptions.includes(option.title)
      )}
      onChange={handleOptionsChange}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{ padding: 0 }}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            name={name}
          />
          {option.title}
        </li>
      )}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Выберите права доступа" />
      )}
    />
  );
}

const permissions = [
  { title: "Все" },
  { title: "Модерация объявлений" },
  { title: "Блог" },
  { title: "Тех. поддержка" },
  { title: "Обращения клиентов" },
  { title: "Аналитика" },
  { title: "Акции" },
];
