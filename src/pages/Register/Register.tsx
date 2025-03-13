import React, { useState } from "react";
import "./style-register/style-register.css";
import videoFondo from "../../../public/assets/video/fondo_register.mp4";
import { motion } from "motion/react";
import { DataUser } from "../../models/DataUserRegister.model";
import InputCustom from "../../components/Input/InputCustom";
import { Checkbox, FormControlLabel } from "@mui/material";
import ButtonCutoms from "../../components/Button/ButtonCutoms";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import ModalTermsConditions from "../../components/Modals/ModalTermsConditions/ModalTermsConditions";
export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [userData, setUserData] = useState<DataUser>({
    nombre: "",
    correo_electronico: "",
    fecha_nacimiento: "",
    telefono: "",
    contraseña: "",
  });
  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const goLogin = () => {
    navigate("/login");
  };

  const handleSubmit = () => {
    console.log("hollll");
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
            onClick={goLogin}
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
        <div className="w-full flex justify-center items-center mt-10  flex-col">
          <div className="w-[80%] grid grid-cols-2 gap-x-6 gap-y-12 ">
            <InputCustom
              label="Nombre"
              name="nombre"
              type="text"
              value={userData.nombre}
              onChange={handleChange}
              fullWidth={false}
            />

            <InputCustom
              label="Correo Electronico"
              name="correo_electronico"
              type="text"
              value={userData.correo_electronico}
              onChange={handleChange}
              fullWidth={false}
            />

            <InputCustom
              label="Fecha de Nacimiento"
              name="fecha_nacimiento"
              type="date"
              value={userData.fecha_nacimiento}
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
              name="contraseña"
              type="password"
              value={userData.contraseña}
              onChange={handleChange}
              fullWidth={false}
            />

            <InputCustom
              label="Confirmar Contraseña"
              name="confirmar_contraseña"
              type="password"
              value={userData.contraseña}
              onChange={handleChange}
              fullWidth={false}
            />
          </div>
          <FormControlLabel
            control={<Checkbox color="info" checked={acceptedTerms} />}
            label={
              <span
                className="underline cursor-pointer text-blue-500"
                onClick={() => setIsModalOpen(true)}
              >
                Acepta terminos y Condiciones
              </span>
            }
            className="mt-5"
          />
          <ModalTermsConditions
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAccept={handleAcceptTerms}
          />
          <ButtonCutoms
            text="Crear Registro"
            onClick={handleSubmit}
            className="w-[25%] mt-5!"
          />
          <div className="flex flex-row w-full items-center justify-center mt-5 gap-x-5">
            <ButtonCutoms
              text=""
              onClick={handleSubmit}
              icon={faGoogle}
              className="w-12 h-12 "
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
    </motion.section>
  );
};
