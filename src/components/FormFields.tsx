import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Autocomplete,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { useMemo, useState } from "react";
import {
  countryOptions,
  getCityOptions,
  getDistrictOptions,
  getPhoneCodeForCountry,
  type GeoOption,
} from "../lib/geo";

type EmailFieldProps = TextFieldProps & {
  value: string;
  onValueChange: (value: string) => void;
};

export function EmailField({ value, onValueChange, ...props }: EmailFieldProps) {
  return (
    <TextField
      {...props}
      type="email"
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      slotProps={{
        ...props.slotProps,
        input: {
          ...props.slotProps?.input,
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

type PasswordFieldProps = TextFieldProps & {
  value: string;
  onValueChange: (value: string) => void;
};

export function PasswordField({ value, onValueChange, ...props }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      slotProps={{
        ...props.slotProps,
        input: {
          ...props.slotProps?.input,
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setVisible((current) => !current)}
                aria-label={visible ? "Hide Password" : "Show Password"}
              >
                {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

type InternationalPhoneFieldProps = TextFieldProps & {
  country: string;
  value: string;
  onValueChange: (value: string) => void;
};

export function InternationalPhoneField({ country, value, onValueChange, ...props }: InternationalPhoneFieldProps) {
  const phoneCode = getPhoneCodeForCountry(country);

  const ensureInternationalValue = () => {
    if (!phoneCode || value.trim()) {
      return;
    }
    onValueChange(`${phoneCode} `);
  };

  const handleBlur = () => {
    const trimmedValue = value.trim();
    if (phoneCode && trimmedValue && !trimmedValue.startsWith("+")) {
      onValueChange(`${phoneCode} ${trimmedValue}`);
    }
  };

  return (
    <TextField
      {...props}
      value={value}
      onFocus={ensureInternationalValue}
      onBlur={handleBlur}
      onChange={(event) => onValueChange(event.target.value)}
      helperText={props.helperText || (phoneCode ? `Use international format, for example ${phoneCode}...` : "Select a country to apply the phone code.")}
      slotProps={{
        ...props.slotProps,
        input: {
          ...props.slotProps?.input,
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIcon fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

type GeoFieldsProps = {
  country: string;
  district: string;
  city: string;
  showCity?: boolean;
  required?: boolean;
  onChange: (value: { country: string; district: string; city: string }) => void;
};

function selectedOption(options: GeoOption[], value: string) {
  return options.find((option) => option.value === value) || null;
}

export function CityField({ country, district, city, onChange }: GeoFieldsProps) {
  const cityOptions = useMemo(() => getCityOptions(country, district), [country, district]);

  return (
    <Autocomplete
      freeSolo
      options={cityOptions}
      value={selectedOption(cityOptions, city)}
      inputValue={city}
      onInputChange={(_, value) => onChange({ country, district, city: value })}
      onChange={(_, option) => {
        const nextValue = typeof option === "string" ? option : option?.value || "";
        onChange({ country, district, city: nextValue });
      }}
      getOptionLabel={(option) => (typeof option === "string" ? option : option.label)}
      renderInput={(params) => <TextField {...params} label="City/Area" fullWidth />}
      fullWidth
    />
  );
}

export function GeoFields({ country, district, city, showCity = true, required = false, onChange }: GeoFieldsProps) {
  const districtOptions = useMemo(() => getDistrictOptions(country), [country]);

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <Autocomplete
        options={countryOptions}
        value={selectedOption(countryOptions, country)}
        onChange={(_, option) => onChange({ country: option?.value || "", district: "", city: "" })}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField {...params} label="Country" required={required} fullWidth />}
        fullWidth
      />
      <Autocomplete
        freeSolo
        options={districtOptions}
        value={selectedOption(districtOptions, district)}
        inputValue={district}
        onInputChange={(_, value) => onChange({ country, district: value, city: "" })}
        onChange={(_, option) => {
          const nextValue = typeof option === "string" ? option : option?.value || "";
          onChange({ country, district: nextValue, city: "" });
        }}
        getOptionLabel={(option) => (typeof option === "string" ? option : option.label)}
        renderInput={(params) => <TextField {...params} label="Region" required={required} fullWidth />}
        fullWidth
      />
      {showCity ? <CityField country={country} district={district} city={city} onChange={onChange} /> : null}
    </Stack>
  );
}
