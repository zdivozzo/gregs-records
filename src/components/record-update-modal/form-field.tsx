import React from "react";
import * as Styled from './styles';
import TextField from '@material-ui/core/TextField';

type FormFieldProps = {
  formik: any,
  fieldName: string,
  fieldLabel: string
};

export const FormField = ({ formik, fieldName, fieldLabel }: FormFieldProps) => {
  return (
    <Styled.FormControlContainer fullWidth>
      <TextField
        fullWidth
        id={fieldName}
        name={fieldName}
        label={fieldLabel}
        value={formik.values[fieldName]}
        onChange={formik.handleChange}
        error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
        helperText={formik.touched[fieldName] && formik.errors[fieldName]}
      />
    </Styled.FormControlContainer>
  );
};
