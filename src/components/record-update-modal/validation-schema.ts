import * as Yup from "yup";

export const ValidationSchema = Yup.object().shape({
  album_title: Yup.string().required("Required"),
  artist: Yup.string().required("Required"),
  year: Yup.string()
    .length(4, 'Must be exactly 4 numbers')
    .matches(/^\d+$/, 'Must be numbers only')
    .required("Required"),
  condition: Yup.string().required("Required"),
});
