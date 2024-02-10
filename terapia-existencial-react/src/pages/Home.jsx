//import '../css/styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "../components/BaseButton";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center">
          <div className="mx-20 p-20" content="''"></div>
          <div>
            <h1 className="text-5xl pt-5 font-bold text-greyText">
              Terapia <span className="text-primary"> Humanística</span>
            </h1>
          </div>
          <div className="text-greyText text-center p-4">
            <p>Un abordaje existencial personalizado</p>
            <p>de manera individual</p>
          </div>
          <div className="flex justify-center items-center text-sm">
            <Link
              to="/services"
              className="text-white bg-primary rounded-lg p-2"
            >
              Agendar una consulta
            </Link>
            <p className="px-2">Primera sesión gratis</p>
          </div>
          <div>
            <img
              src="../../public/bg-manos.jpg"
              alt="fondo de unas manos"
              className="max-w-md bg-contain"
            />
          </div>
        </div>
      </div>
      <br />

      <div className="">
        <div className="text-center text-4xl p-4">
          <h2 className="text-greyText">
            Un abordaje logoterapéutico
            <span className="text-primary">
              <br />
              para tu salud mental
            </span>
          </h2>
        </div>
        <div className="flex justify-evenly items-center my-20">
          <div className="">
            <div className="max-w-md">
              <img
                src="/positive-img.jpg"
                className="img-fluid"
                alt="una mujer sentada al lado de una flor muy grande"
              />
            </div>
          </div>
          <div className="max-w-md flex flex-col">
            <h3 className="text-2xl font-semibold py-4">
              ¿Qué es el Análisis Existencial?
            </h3>
            <p className="text-greyText">
              El Análisis Existencial es una forma de psicología existencial que
              <strong>
                se centra en ayudar a las personas a encontrar sentido y
                propósito en sus vidas.
              </strong>
              Desarrollada por el renombrado psiquiatra Viktor Frankl, la
              logoterapia y el análisis existencial enfatizan la importancia de
              descubrir un significado personal como fuerza impulsora para el
              bienestar psicológico.
            </p>
          </div>
        </div>
        <div className="flex justify-evenly items-center my-20">
          <div className="max-w-md flex flex-col">
            <h3 className="text-2xl font-semibold py-4">
              Aplicaciones clínicas del análisis existencial
            </h3>
            <p className="text-greyText">
              La logoterapia es una forma de psicología existencial que se
              centra en ayudar a las personas a encontrar sentido y propósito en
              sus vidas. Desarrollada por el renombrado psiquiatra Viktor
              Frankl, la logoterapia enfatiza la importancia de descubrir un
              significado personal como fuerza impulsora para el bienestar
              psicológico.
            </p>
          </div>
          <div className="half">
            <div className="img-container">
              <img
                src="/positive-img.jpg"
                className="img-fluid"
                alt="una mujer sentada al lado de una flor muy grande"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-evenly items-center my-16">
          <div className="half">
            <div className="img-container">
              <img
                src="/positive-img.jpg"
                className="img-fluid"
                alt="una mujer sentada al lado de una flor muy grande"
              />
            </div>
          </div>
          <div className="max-w-md flex flex-col">
            <h3 className="text-2xl font-semibold py-4">
              Fundamentos filosóficos del análisis existencial
            </h3>
            <p className="text-greyText">
              La logoterapia es una forma de psicología existencial que se
              centra en ayudar a las personas a encontrar sentido y propósito en
              sus vidas. Desarrollada por el renombrado psiquiatra Viktor
              Frankl, la logoterapia enfatiza la importancia de descubrir un
              significado personal como fuerza impulsora para el bienestar
              psicológico.
            </p>
          </div>
        </div>
        <div className="text-center text-4xl p-4">
          <h2 className="text-greyText">
            Un abordaje personalizado
            <span className="text-primary">
              <br />
              de manera individual{" "}
            </span>
          </h2>
        </div>
        <div className="flex justify-evenly items-center my-16">
          <div className="flex-grow-1 bg-lightBlue items-stretch rounded-lg max-w-xs m-8 p-8">
            <FontAwesomeIcon icon={faHeart} style={{ color: "#21496b" }} />{" "}
            <p className="text-greyText">
              La curiosa paradoja es que cuando me acepto tal como soy, entonces
              puedo cambiar
            </p>
          </div>
          <div className="flex-grow-1 bg-lightBlue items-stretch rounded-lg max-w-xs m-8 p-8">
            <FontAwesomeIcon icon={faHeart} style={{ color: "#21496b" }} />{" "}
            <p className="text-greyText">
              No se trata de sacar el sentimiento de la mente, ni de esconderlo
              en ella, sino de experimentarlo con aceptación
            </p>
          </div>
          <div className="flex-grow-1 bg-lightBlue rounded-lg max-w-xs m-8 p-8">
            <FontAwesomeIcon icon={faHeart} style={{ color: "#21496b" }} />{" "}
            <p className="text-greyText">
              Me siento más feliz simplemente por ser yo mismo y dejar que los
              otros sean ellos mismos.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center max-w-xl text-center p-4 m-auto">
          <div>
            <p className="text-greyText text-2xl">
              Una persona, al descubrir que es amada por ser como es, no por lo
              que pretende ser, sentirá que merece respeto y amor.
            </p>
          </div>
        </div>

        <div className="flex justify-around items-center border-solid border border-blueBorder bg-lighterBlue p-4 rounded-lg m-3 my-10">
          <div className="">
            <div className="max-w-lg">
              <p className="text-darkBlue text-3xl italic">
                "El estado de felicidad se alcanza cuando descubrimos para qué
                existimos"
              </p>
              <p className="text-greyText">David Daniel del Valle</p>
            </div>
          </div>
          <div className="text-center bg-lightBlue py-4 px-20 rounded-lg">
            <div className="py-4">
              <img
                src="/profile-img.jpeg"
                className="max-w-xs max-h-80"
                alt="foto de perfil del Licenciado David Daniel del Valle"
              />
            </div>
            <p className="text-darkBlue">Lic. David Daniel del Valle</p>
            <p className="text-greyText">Consultor Psicológico</p>
          </div>
        </div>

        <div>
          <div className="text-4xl my-16">
            <h2 className="text-center text-greyText font-medium">
              Contáctanos y recibí
              <span className="text-primary text-center">
                <br />
                tu primer consulta gratis
              </span>
            </h2>
          </div>

          <div className="container ml-auto mr-auto flex items-center justify-center">
            <div className="w-full md:w-1/2">
              <form className="bg-white px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <div className="grid grid-flow-row sm:grid-flow-col gap-3">
                    <div className="sm:col-span-4 justify-center">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="nya"
                      >
                        Nombres y Apellidos
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="nya"
                        name="nya"
                        type="text"
                        placeholder="Carlos Torres"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Ingresá tu email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="mensaje"
                  >
                    Mensaje
                  </label>
                  <textarea
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="mensaje"
                    rows="5"
                    placeholder="El mensaje"
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <BaseButton
                    btnText="Enviar"
                    type="submit"
                    className="bg-primary"
                  >
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      style={{ color: "#ffffff" }}
                    />
                  </BaseButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
