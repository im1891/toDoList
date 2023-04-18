import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useAppDispatch } from "../../custom_hooks/useAppDispatch";
import { loginTC } from "./auth-reducer";
import { useAppSelector } from "../../custom_hooks/useAppSelector";
import { Navigate } from "react-router-dom";
import * as Yap from "yup";
import { LoginDataType } from "../../api/todolists-api";

type FormikErrorsType = {
  email?: string;
  password?: string;
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.authData.isLoggedIn);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yap.object({
      email: Yap.string()
        .email("Ivalid email adress")
        .required("Email is required"),
      password: Yap.string()
        .min(6, "Password should be more 6 symbols")
        .required(),
    }),
    onSubmit: (values: LoginDataType) => {
      dispatch(loginTC(values));
      formik.resetForm();
    },
  });

  if (isLoggedIn) return <Navigate replace to={"/"} />;
  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href={"https://social-network.samuraijs.com/"}
                  target={"_blank"}
                >
                  {" "}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              )}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                label={"Remember me"}
                control={
                  <Checkbox
                    checked={formik.values.rememberMe}
                    {...formik.getFieldProps("rememberMe")}
                  />
                }
              />
              <Button
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                disabled={Object.keys(formik.errors).length !== 0}
              >
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
