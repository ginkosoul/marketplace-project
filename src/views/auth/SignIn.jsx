import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link as ReactLink } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema as validationSchema } from "@/defaults";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import mainBg from "@assets/images/bg.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/auth/operations";
import { selectIsLoggedIn } from "@/redux/auth/selectors";

export function SignIn() {
  const isLoading = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      showPassword: false,
    },
    validationSchema,
    onSubmit: ({ email, password }) => {
      dispatch(loginUser({ email, password }));
      // formik.resetForm();
    },
  });
  return (
    <Box
      sx={{
        backgroundImage: `url(${mainBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "calc(100vh - 70px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          backgroundColor: (theme) => theme.palette.background.paper,
          maxWidth: "440px",
          padding: "40px 56px",
          borderRadius: "16px",
        }}
      >
        <Typography component="h1" variant="h5">
          Вхід
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                sx={{ mb: 2.5 }}
                size="small"
                fullWidth
                label="Введіть e-mail"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ mb: 2.5 }}
                fullWidth
                size="small"
                name="password"
                label="Введіть пароль"
                type={formik.values.showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          formik.setFieldValue(
                            "showPassword",
                            !formik.values.showPassword
                          )
                        }
                        edge="end"
                      >
                        {formik.values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Link href="#" variant="body2">
            Забули пароль?
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: 3,
              mb: 2,
              textTransform: "none",
              backgroundColor: (theme) => theme.palette.buttonColor.main,
            }}
          >
            {isLoading ? "Завантаження..." : "Увійти"}
          </Button>
          <Box justifyContent="center" sx={{ marginTop: "20px" }}>
            <Typography sx={{ textAlign: "center", mt: 2, display: "block" }}>
              Новий користувач?
            </Typography>
            <Link
              component={ReactLink}
              to="/registration"
              variant="body2"
              align="center"
              sx={{ textAlign: "center", mt: 2, display: "block" }}
            >
              Створити аккаунт
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
