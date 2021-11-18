import React from "react";
import { createContext } from "react";

interface ICursosResponse {
  _id: string;
  nome: string;
  categoria: string;
}

interface IConsumerApi {
  cursos?: Array<ICursosResponse>;
  ApiCursos: string;
  ApiContatos: string;
}

const ConsumerApiContext = createContext<IConsumerApi>({} as IConsumerApi);

export const ConsumerApiProvider: React.FC = ({ children }) => {
  const ApiCursos = "https://heraapi.herokuapp.com/cursos"
  const ApiContatos = "https://heraapi.herokuapp.com/contatos"
  const [cursos, setCursos] = React.useState<Array<ICursosResponse> | undefined>()

  React.useEffect(() => {
    async function API() {
      fetch(ApiCursos)
        .then(res => res.json())
        .then(e => setCursos(e))
    }
    API()
  }, [])

  return (
    <ConsumerApiContext.Provider
      value={{ cursos, ApiCursos, ApiContatos }}
    >
      {children}
    </ConsumerApiContext.Provider>
  );
};

export function useConsumerApi() {
  const context = React.useContext(ConsumerApiContext);
  return context;
}