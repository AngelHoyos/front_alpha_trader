import React, { useState } from "react";
import "./styled-components/style-login.css";
import videoFondo from "../../../public/assets/video/fondo_register.mp4";
import { motion } from "motion/react";
import InputCustom from "../../components/Input/InputCustom";
import ButtonCutoms from "../../components/Button/ButtonCutoms";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuthLogin } from "../../hooks/useAuthLogin";
import { useNavigates } from "../../hooks/useNavigates";
import { ButtonCustomLoad } from "../../components/Button/ButtonCustomLoad";
import Alerts from "../../components/Alerts/Alerts";
import { Typography } from "@mui/material";
import ModalEmailRecoveryPassword from "../../components/Modals/ModalEmailRecoveryPassword/ModalEmailRecoveryPassword";

const Login: React.FC = () => {
  const { userDataLogin,hanldeButtonGoogle, handleChange, handleSubmit, alerta } = useAuthLogin();
  const { goToRegister } = useNavigates();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <>
      {alerta && <Alerts key={alerta.id} {...alerta} />}
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
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await handleSubmit();
            }}
            className="w-full flex justify-center items-center mt-10  flex-col"
          >
            <div className="w-[50%] grid grid-cols-1 gap-y-10 mb-7">
              <InputCustom
                label="Correo Electrónico"
                name="Email"
                type="text"
                value={userDataLogin.Email}
                onChange={handleChange}
                fullWidth
                error={
                  userDataLogin.Email !== "" &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDataLogin.Email)
                }
                helperText={
                  userDataLogin.Email !== "" &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDataLogin.Email)
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
            <Typography
              variant="body2"
              sx={{
                color: "white",
                cursor: "pointer",
                mt: -2,
                mb: 2,
                alignSelf: "flex-end",
                mr: "25%",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={handleOpen}
            >
              Recuperar Contraseña
            </Typography>

            <ButtonCustomLoad sx={{ width: "20%" }} type="submit">
              Iniciar Sesión
            </ButtonCustomLoad>
            <div className="flex flex-row w-full items-center justify-center mt-5 gap-x-5">
              <ButtonCutoms
                text="Google"
                onClick={hanldeButtonGoogle}
                icon={faGoogle}
                className="h-12"
              />
            </div>
          </form>
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
      <ModalEmailRecoveryPassword
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

export default Login;
