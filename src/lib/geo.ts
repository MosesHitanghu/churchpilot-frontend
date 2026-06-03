import { City, Country, State } from "country-state-city";

export type GeoOption = {
  label: string;
  value: string;
  isoCode?: string;
  phonecode?: string;
};

export const countryOptions: GeoOption[] = Country.getAllCountries().map((country) => ({
  label: country.name,
  value: country.name,
  isoCode: country.isoCode,
  phonecode: country.phonecode,
}));

export function getCountryByName(countryName: string) {
  return countryOptions.find((country) => country.value === countryName);
}

export function normalizePhoneCode(phonecode?: string) {
  if (!phonecode) {
    return "";
  }
  const firstCode = phonecode.split(" and ")[0].split(",")[0].trim();
  return firstCode.startsWith("+") ? firstCode : `+${firstCode}`;
}

export function getPhoneCodeForCountry(countryName: string) {
  return normalizePhoneCode(getCountryByName(countryName)?.phonecode);
}

export function getDistrictOptions(countryName: string): GeoOption[] {
  const country = getCountryByName(countryName);
  if (!country?.isoCode) {
    return [];
  }
  return State.getStatesOfCountry(country.isoCode).map((district) => ({
    label: district.name,
    value: district.name,
    isoCode: district.isoCode,
  }));
}

export function getCityOptions(countryName: string, districtName: string): GeoOption[] {
  const country = getCountryByName(countryName);
  if (!country?.isoCode) {
    return [];
  }

  const district = State.getStatesOfCountry(country.isoCode).find((item) => item.name === districtName);
  const cities = district
    ? City.getCitiesOfState(country.isoCode, district.isoCode)
    : City.getCitiesOfCountry(country.isoCode) || [];

  return Array.from(new Set(cities.map((city) => city.name))).map((city) => ({
    label: city,
    value: city,
  }));
}
