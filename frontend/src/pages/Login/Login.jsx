import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useEffect } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Furvo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {

  useEffect(() => {
    localStorage.clear();
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("nombre") === "") {
      window.alert("Ingrese su nombre de usuario por favor");
    } else {
      // eslint-disable-next-line no-console
      localStorage.nombre = data.get("nombre");
      axios
        .get(
          `http://127.0.0.1:3001/api/usuarioxnombre/${localStorage.nombre}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => {
          // si length = 0 no existe el usuario, lo creo:
          if (res.data.length === 0) {
            axios
              .post(`http://127.0.0.1:3001/api/usuarios/`, {
                Nombre: `${localStorage.nombre}`,
              })
              .then((res) => {
                const id = Number(res.data.id);
                localStorage.userID = id; 
                // posteo a rankings con torneo 1, puntos 0 y el id del usuario
                axios
                  .post(`http://127.0.0.1:3001/api/rankings/`, {
                    Puntos: 0,
                    TorneoID: 1, //champions
                    UsuarioID: id,
                  })
                  .then((res) => {
                    window.alert(
                      `Ingresado con éxito. Bienvenido/a ${localStorage.nombre}`
                    );
                  })
                  .catch(() => console.log("error"));
              })
              .catch(() => console.log("error"));
          } else {
            console.log(res.data[0].UsuarioID)
            const id = Number(res.data[0].UsuarioID);
            localStorage.userID = id;
            window.alert(
              `Ingresado con éxito. Bienvenido/a ${localStorage.nombre}`
            );
          }
        })
        .catch(() => console.log("error"));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Ingresar
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="nombre"
              label="Nombre"
              name="nombre"
              autoComplete="nombre"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/*<FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />*/}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            {/*<Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>*/}
          </Box>
        </Box>
        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
