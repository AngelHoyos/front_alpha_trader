import React, { useState } from "react";
import "./styled-components/style-login.css";
import videoFondo from "../../../public/assets/video/fondo_register.mp4";
import { motion } from "motion/react";
// import logo from "../../../public/assets/imgs/logo/logo_alpha.png";
import InputCustom from "../../components/Input/InputCustom";
import ButtonCutoms from "../../components/Button/ButtonCutoms";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuthLogin } from "../../hooks/useAuthLogin";
import { useNavigates } from "../../hooks/useNavigates";

const Login: React.FC = () => {
  const { userDataLogin, handleChange, handleSubmit } = useAuthLogin();
  const { goToRegister } = useNavigates();

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

  const hanldeButton = () => {
    console.log("hola");
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
            Iniciar Sesión
          </h1>
          <p className="font-montserrat font-medium text-white/60 text-[22px] tracking-widest">
            Bienvenido a Alpha Trader
          </p>
        </div>
        <div className="w-full flex justify-center items-center mt-10  flex-col">
          <div className="w-[50%] grid grid-cols-1 gap-y-10 mb-7">
            <InputCustom
              label="Correo Electrónico"
              name="Email"
              type="text"
              value={userDataLogin.Email}
              onChange={handleChange}
              fullWidth
              error={
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                  userDataLogin.Email
                )
              }
              helperText={
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                  userDataLogin.Email
                )
                  ? "El correo es invalido"
                  : ""
              }
            />
            <InputCustom
              label="Contraseña"
              name="Password"
              type="password"
              value={userDataLogin.Password}
              onChange={handleChange}
              fullWidth
              error={
                userDataLogin.Password.length > 0 &&
                (userDataLogin.Password.length < 8 ||
                  !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*\.])[A-Za-z\d!@#$%^&*\.]{8,}/.test(
                    userDataLogin.Password
                  ))
              }
              helperText={
                userDataLogin.Password.length > 0 &&
                (userDataLogin.Password.length < 8 ||
                  !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*\.])[A-Za-z\d!@#$%^&*\.]{8,}/.test(
                    userDataLogin.Password
                  ))
                  ? "Debe tener 8 caracteres, mayúscula, minúscula, número y símbolo."
                  : ""
              }
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
              onClick={hanldeButton}
              icon={faGoogle}
              className="w-12 h-12"
            />
            <ButtonCutoms
              text=""
              onClick={hanldeButton}
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
            onClick={goToRegister}
            className="w-[30%] bg-white/0! border-2! border-solid border-white rounded-xl! text-xl!"
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Login;
