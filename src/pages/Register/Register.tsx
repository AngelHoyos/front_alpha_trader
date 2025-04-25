import React, { useState } from "react";
import "./style-register/style-register.css";
import videoFondo from "../../../public/assets/video/fondo_register.mp4";
import InputCustom from "../../components/Input/InputCustom";
import { Checkbox, FormControlLabel } from "@mui/material";
import ButtonCutoms from "../../components/Button/ButtonCutoms";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import ModalTermsConditions from "../../components/Modals/ModalTermsConditions/ModalTermsConditions";
import { useNavigates } from "../../hooks/useNavigates";
import Alerts from "../../components/Alerts/Alerts";
import { useCreateRegister } from "../../hooks/useCreateRegister";
import { motion } from "framer-motion";
import { ButtonCustomLoad } from "../../components/Button/ButtonCustomLoad";

export const Register: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { goToLogin } = useNavigates();
  const {
    handleAcceptTerms,
    handleSubmit,
    handleChange,
    inputNombreRef,
    confirmarContraseña,
    alerta,
    userData,
    acceptedTerms,
    handleSubmitGoogle,
  } = useCreateRegister();

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
          className="w-1/2 h-full relative overflow-hidden"
        >
          <video
            id="fondo_video"
            className="w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
          >
            <source src={videoFondo} type="video/mp4" />
          </video>
          <div
            id="fondo_video"
            className="z-10 bg-black/65 w-full h-full absolute top-0"
          ></div>
          <div className="z-20 absolute top-10 left-10">
            <p className="font-montserrat text-white font-black text-4xl">
              Alpha Trader
            </p>
          </div>
          <div className="bottom-10 left-2/6 flex absolute z-20 w-full">
            <ButtonCutoms
              text="Iniciar Sesion"
              onClick={goToLogin}
              className="w-[30%] bg-white/0! border-2! border-solid border-white rounded-xl! text-xl!"
            />
          </div>
        </motion.div>

        <motion.div
          variants={itemsVariants}
          className="w-1/2 h-full flex items-center justify-center flex-col"
        >
          <div className="w-full flex justify-center flex-col items-center">
            <h1 className="font-montserrat font-bold text-white mb-4 text-2xl">
              Registro
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
            className="w-full flex justify-center items-center mt-10 flex-col"
          >
            <div className="w-[80%] grid grid-cols-2 gap-x-6 gap-y-12">
              {/* Inputs */}
              <InputCustom
                label="Nombre"
                name="FullName"
                type="text"
                value={userData.FullName}
                onChange={handleChange}
                fullWidth={false}
                inputRef={inputNombreRef}
              />
              <InputCustom
                label="Correo Electrónico"
                name="Email"
                type="text"
                value={userData.Email}
                onChange={handleChange}
                fullWidth
                error={
                  userData.Email !== "" &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.Email)
                }
                helperText={
                  userData.Email !== "" &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.Email)
                    ? "El correo es inválido"
                    : ""
                }
              />
              <InputCustom
                label="Fecha de Nacimiento"
                name="DateOfBirth"
                type="date"
                value={userData.DateOfBirth}
                onChange={handleChange}
                fullWidth={false}
                InputLabelProps={true}
              />
              <InputCustom
                label="Telefono"
                name="telefono"
                type="text"
                value={userData.telefono}
                onChange={handleChange}
                fullWidth={false}
              />
              <InputCustom
                label="Contraseña"
                name="Password"
                type="password"
                value={userData.Password}
                onChange={handleChange}
                fullWidth
                error={
                  userData.Password.length > 0 &&
                  !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*\.])/.test(
                    userData.Password
                  )
                }
                helperText={
                  userData.Password.length > 0 &&
                  !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*\.])/.test(
                    userData.Password
                  )
                    ? "Debe tener 8 caracteres, mayúscula, minúscula, número y símbolo."
                    : ""
                }
              />
              <InputCustom
                label="Confirmar Contraseña"
                name="confirmar_contraseña"
                type="password"
                value={confirmarContraseña}
                onChange={handleChange}
                fullWidth={false}
                error={
                  confirmarContraseña.length > 0 &&
                  confirmarContraseña !== userData.Password
                }
                helperText={
                  confirmarContraseña.length > 0 &&
                  confirmarContraseña !== userData.Password
                    ? "Las contraseñas no coinciden"
                    : ""
                }
              />
            </div>

            {/* Términos */}
            <FormControlLabel
              control={
                <Checkbox
                  color="info"
                  checked={acceptedTerms}
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "blue-500",
                    },
                  }}
                />
              }
              label={
                <span className="underline cursor-pointer text-blue-500">
                  Acepta términos y condiciones
                </span>
              }
              onClick={() => setIsModalOpen(true)}
              className="mt-5"
            />
            <ModalTermsConditions
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onAccept={handleAcceptTerms}
            />

            <ButtonCustomLoad sx={{ width: "20%" }} type="submit">
              Crear Registro
            </ButtonCustomLoad>

            <div className="flex flex-row w-full items-center justify-center mt-5 gap-x-5">
              <ButtonCutoms
                text="Google"
                onClick={handleSubmitGoogle}
                icon={faGoogle}
                className="h-12"
              />
            </div>
          </form>
        </motion.div>
      </motion.section>
    </>
  );
};
