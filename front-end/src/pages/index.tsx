import type { NextPage } from "next";
import Head from "next/head";
import { useConsumerApi } from "../context/ConsumerApi";
import styles from "../styles/Home.module.css";
import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Image from "material-ui-image";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const Home: NextPage = () => {
  const { cursos, ApiContatos } = useConsumerApi();
  const [categoriaCurso, setCategoriaCurso] =
    React.useState<string>("EDUCACAO_BASICA");
  const [contatoCriado, setContatoCriado] = React.useState<number>();
  const [form, setForm] = React.useState({
    nome: "",
    cpf: "",
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
    email: "",
    telefone: "",
    cursoID: "",
    whatsapp: "",
    status: "NOVO",
  });

  React.useEffect(() => {
    if (contatoCriado == 201) {
      setForm({
        ...form,
        nome: "",
        cpf: "",
        cep: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        uf: "",
        email: "",
        telefone: "",
        whatsapp: "",
      });
    }
  }, [contatoCriado]);

  function handleSelectCategoria(event: React.ChangeEvent<HTMLSelectElement>) {
    const select: HTMLSelectElement | any = document.getElementById("cursos");
    select.value = "select";
    setCategoriaCurso(event.target.value);
  }

  function handleSelectCurso(event: HTMLSelectElement | any) {
    const id = event.target.options[event.target.options.selectedIndex].id;
    setForm({ ...form, cursoID: id });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify(form),
    };

    fetch(ApiContatos, requestOptions).then((response) =>
      setContatoCriado(response.status)
    );
  }

  const theme = createTheme();
/**
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
*/
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div className={styles.container}>
          <Head>
            <title>Hera</title>
            <meta
              name="description"
              content="Bem-Vindo ao projeto HERA, cadastre-se em um dos nossos cursos"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Box
            component="img"
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="Logo HERA"
            src="https://source.unsplash.com/random"
          />

          <main className={styles.main}>
            <h1 className={styles.title}>
              Projeto <span className={styles.title2}>HERA</span>
            </h1>

            <p className={styles.description}>
              Cadastre-se em um de nossos cursos!
            </p>

            {/*
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            */}

            <div>
              <select
                name="categorias"
                id="categorias"
                defaultValue="EDUCACAO_BASICA"
                onChange={(e) => handleSelectCategoria(e)}
              >
                <option value="EDUCACAO_BASICA">Educação Básica</option>
                <option value="GRADUACAO">Graduação</option>
                <option value="POS_GRADUACAO">Pós Graduação</option>
                <option value="EDUCACAO_DISTANCIA">Educação a Distancia</option>
              </select>
            </div>

            <div>
              <select
                required
                name="cursos"
                id="cursos"
                defaultValue="select"
                onChange={(e) => handleSelectCurso(e)}
              >
                <option value={"select"} disabled>
                  Select
                </option>
                {cursos?.map((e) => {
                  if (e.categoria == categoriaCurso) {
                    return (
                      <option key={e._id} id={e._id}>
                        {e.nome}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={(e) => handleSubmit(e)}
            >
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="nome"
                  required
                  fullWidth
                  id="firstName"
                  label="Nome"
                  autoFocus
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
              </Grid>
              <label title="Nome">
                Nome
                <input
                  required
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
              </label>

              <Grid item xs={12}>
                <TextField
                  autoComplete="cpf"
                  name="cpf"
                  required
                  fullWidth
                  id="cpf"
                  label="CPF"
                  value={form.cpf}
                  onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                />
              </Grid>
              <label title="CPF">
                CPF
                <input
                  required
                  type="text"
                  name="cpf"
                  value={form.cpf}
                  onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                />
              </label>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="cep"
                  label="CEP"
                  name="cep"
                  autoComplete="cep"
                  value={form.cep}
                  onChange={(e) => setForm({ ...form, cep: e.target.value })}
                />
              </Grid>
              <label title="CEP">
                CEP
                <input
                  type="text"
                  name="cep"
                  value={form.cep}
                  onChange={(e) => setForm({ ...form, cep: e.target.value })}
                />
              </label>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="logradouro"
                  label="Logradouro"
                  name="logradouro"
                  autoComplete="logradouro"
                  value={form.logradouro}
                  onChange={(e) =>
                    setForm({ ...form, logradouro: e.target.value })
                  }
                />
              </Grid>
              <label title="Logradouro">
                Logradouro
                <input
                  type="text"
                  name="logradouro"
                  value={form.logradouro}
                  onChange={(e) =>
                    setForm({ ...form, logradouro: e.target.value })
                  }
                />
              </label>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="numero"
                  label="Número"
                  name="numero"
                  autoComplete="numero"
                  value={form.numero}
                  onChange={(e) => setForm({ ...form, numero: e.target.value })}
                />
              </Grid>
              <label title="Número">
                Número
                <input
                  type="text"
                  name="numero"
                  value={form.numero}
                  onChange={(e) => setForm({ ...form, numero: e.target.value })}
                />
              </label>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="bairro"
                  label="Bairro"
                  name="bairro"
                  value={form.bairro}
                  onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                />
              </Grid>
              <label title="Bairro">
                Bairro
                <input
                  type="text"
                  name="bairro"
                  value={form.bairro}
                  onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                />
              </label>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cidade"
                  label="Cidade"
                  type="text"
                  value={form.cidade}
                  onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                />
              </Grid>
              <label title="Cidade">
                Cidade
                <input
                  type="text"
                  name="cidade"
                  value={form.cidade}
                  onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                />
              </label>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="uf"
                  label="UF"
                  type="text"
                  value={form.uf}
                  onChange={(e) => setForm({ ...form, uf: e.target.value })}
                />
              </Grid>
              <label title="UF">
                UF
                <input
                  type="text"
                  name="uf"
                  value={form.uf}
                  onChange={(e) => setForm({ ...form, uf: e.target.value })}
                />
              </label>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="E-mail"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Grid>
              <label title="E-mail">
                E-mail
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="telefone"
                  label="Telefone"
                  type="tel"
                  value={form.telefone}
                  onChange={(e) =>
                    setForm({ ...form, telefone: e.target.value })
                  }
                />
              </Grid>
              <label title="Telefone">
                Telefone
                <input
                  required
                  type="tel"
                  name="telefone"
                  value={form.telefone}
                  onChange={(e) =>
                    setForm({ ...form, telefone: e.target.value })
                  }
                />
              </label>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="whatsapp"
                  label="WhatsApp"
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) =>
                    setForm({ ...form, whatsapp: e.target.value })
                  }
                />
              </Grid>
              <label title="WhatsApp">
                WhatsApp
                <input
                  required
                  type="tel"
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={(e) =>
                    setForm({ ...form, whatsapp: e.target.value })
                  }
                />
              </label>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar
              </Button>
              <button type="submit">Cadastrar</button>
            </form>
            {contatoCriado == 201 ? (
              <p>Contato criado com sucesso</p>
            ) : (
              <p>Algo de errado ao criar o contato</p>
            )}
          </main>

          <footer className={styles.footer}></footer>
        </div>
      </Container>
    </ThemeProvider>
  );
};
export default Home;
