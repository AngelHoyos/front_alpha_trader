import React, { useState } from "react";
import "./styled-components/style-login.css";
import videoFondo from "../../../public/assets/video/fondo_register.mp4";
import { motion } from "motion/react";
// import logo from "../../../public/assets/imgs/logo/logo_alpha.png";
import InputCustom from "../../components/Input/InputCustom";
import ButtonCutoms from "../../components/Button/ButtonCutoms";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { DataUserLogin } from "../../models/DataUserLogin.model";
import { useNavigate } from "react-router";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [userDataLogin, setUserDataLogin] = useState<DataUserLogin>({
    correo_electronico: "",
    contraseña: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDataLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("hollll");
  };
  const goRegister = () => {
    navigate("/");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };
  const itemsVariants = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="contenedorPrincipal"
      className="bg-[#000411] w-full h-screen flex"
    >
      <motion.div
        variants={itemsVariants}
        className="w-1/2 h-full flex items-center justify-center flex-col"
      >
        <div className="w-full flex justify-center flex-col items-center">
          <h1 className="font-montserrat font-bold text-white mb-4 text-2xl">
            Iniciar Sesion
          </h1>
          <p className="font-montserrat font-medium text-white/60 text-[22px] tracking-widest">
            Bienvenido a Alpha Trader
          </p>
        </div>
        <div className="w-full flex justify-center items-center mt-10  flex-col">
          <div className="w-[50%] grid grid-cols-1 gap-y-10 mb-7">
            <InputCustom
              label="Correo Electronico"
              name="correo_electronico"
              type="text"
              value={userDataLogin.correo_electronico}
              onChange={handleChange}
              fullWidth={false}
            />

            <InputCustom
              label="Contraseña"
              name="contraseña"
              type="password"
              value={userDataLogin.contraseña}
              onChange={handleChange}
              fullWidth={false}
            />
          </div>
          <ButtonCutoms
            text="Iniciar Sesion"
            onClick={handleSubmit}
            className="w-[25%]"
          />
          <div className="flex flex-row w-full items-center justify-center mt-5 gap-x-5">
            <ButtonCutoms
              text=""
              onClick={handleSubmit}
              icon={faGoogle}
              className="w-12 h-12"
            />
            <ButtonCutoms
              text=""
              onClick={handleSubmit}
              icon={faFacebookF}
              className="w-12 h-12"
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        variants={itemsVariants}
        className="w-1/2 h-full relative overflow-hidden"
      >
        <video
          id="fondo_video_login"
          className="w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
        >
          <source src={videoFondo} type="video/mp4" />
        </video>
        <div
          id="fondo_video_login"
          className="z-10 bg-black/65 w-full h-full absolute top-0"
        ></div>
        <div className="z-20 absolute top-10 right-10">
          <p className="font-montserrat text-white font-black text-4xl">
            Alpha Trader
          </p>
        </div>
        <div className="bottom-10 left-2/5 flex absolute z-20 w-full">
          <ButtonCutoms
            text="Registrarse"
            onClick={goRegister}
            className="w-[30%] bg-white/0! border-2! border-solid border-white rounded-xl! text-xl!"
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Login;
