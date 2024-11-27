import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types"; // Importamos PropTypes
import logo from "../assets/logo.png";
import { AiOutlineCheck, AiOutlinePlus, AiOutlineInfoCircle } from "react-icons/ai";

const Home = ({ permisos }) => {
  // Estado de carga
  const [loading, setLoading] = useState(true); // Para gestionar el estado de carga
  const [permisosData, setPermisosData] = useState(permisos); // Almacena los permisos

  useEffect(() => {
    // Simulamos una llamada a la API para obtener los permisos
    setTimeout(() => {
      setPermisosData([
        { id: 1, tipo: "Día Personal", estado: "Pendiente", fecha: "2024-11-25" },
        { id: 2, tipo: "Licencia Médica", estado: "Aprobado", fecha: "2024-11-20" },
      ]);
      setLoading(false); // Cambiamos el estado de carga cuando los datos están listos
    }, 2000); // Simulamos un retraso de 2 segundos
  }, []); // Se ejecuta solo una vez después de que el componente se monte

  // Validación si no hay permisos recientes
  const permisosUnicos = Array.isArray(permisosData)
    ? permisosData.filter(
        (permiso, index, self) => index === self.findIndex((p) => p.id === permiso.id)
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-200 rounded-lg flex flex-col items-center justify-start px-4 pb-8">
      {/* Logo */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src={logo} alt="Logo del Sistema" className="h-28 w-auto" />
      </motion.div>

      {/* Título y descripción */}
      <motion.div
        className="w-full max-w-4xl text-center mt-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl font-bold text-gray-600 mb-4">
          Dirección de Recursos Humanos
        </h3>
        <h3 className="text-2xl font-bold text-gray-600 mb-4">
          Sistema de Solicitud de Permisos
        </h3>
        <p className="text-lg text-gray-600">
          Esta sección fue implementada por la División de Recursos Humanos con el propósito
          de facilitar a los empleados de la Institución la tramitación de las ausencias o
          imprevistos que se puedan presentar.
        </p>
      </motion.div>

      {/* Cards de Solicitar y Autorizar permisos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-4xl px-4 pt-8">
        {/* Card Solicitar Permiso */}
        <motion.div
          className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 mx-auto cursor-pointer"
          whileHover={{ scale: 1.1, boxShadow: "0px 4px 12px rgba(244, 156, 28, 0.7)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Link to="/request" className="card-body flex flex-col items-center space-y-4">
            <AiOutlinePlus className="h-16 w-16 text-yellow-500 hover:text-yellow-600 transition-all" />
            <h2 className="text-xl font-bold text-center">Solicitar Permiso</h2>
            <p className="text-gray-600 text-center">Solicita permisos fácilmente desde aquí.</p>
          </Link>
        </motion.div>

        {/* Card Autorizar Permiso */}
        <motion.div
          className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 mx-auto cursor-pointer"
          whileHover={{ scale: 1.1, boxShadow: "0px 4px 12px rgba(244, 156, 28, 0.7)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Link to="/authorize" className="card-body flex flex-col items-center space-y-4">
            <AiOutlineCheck className="h-16 w-16 text-yellow-500 hover:text-yellow-600 transition-all" />
            <h2 className="text-xl font-bold text-center">Autorizar Permiso</h2>
            <p className="text-gray-600 text-center">Autoriza permisos de usuarios aquí.</p>
          </Link>
        </motion.div>
      </div>

      {/* Permisos Recientes */}
      <div className="w-full max-w-4xl mt-12">
        <h4 className="text-2xl font-semibold text-gray-700 mb-6">PERMISOS REALIZADOS</h4>

        {loading ? (
          <p className="text-center text-gray-500">Cargando permisos...</p>
        ) : permisosUnicos.length === 0 ? (
          <p className="text-center text-gray-500">No hay permisos recientes para mostrar.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {permisosUnicos.map((permiso) => (
              <motion.div
                key={permiso.id}
                className="card bg-white shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-4">
                  <AiOutlineInfoCircle className="h-8 w-8 text-yellow-500" />
                  <div>
                    <h5 className="text-lg font-semibold">{permiso.tipo}</h5>
                    <p className="text-gray-600">Fecha: {permiso.fecha}</p>
                  </div>
                </div>
                <span
                  className={`badge ${
                    permiso.estado === "Aprobado"
                      ? "badge-success"
                      : permiso.estado === "Pendiente"
                      ? "badge-warning"
                      : "badge-error"
                  }`}
                >
                  {permiso.estado}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Home.propTypes = {
  permisos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      tipo: PropTypes.string.isRequired,
      estado: PropTypes.string.isRequired,
      fecha: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Home.defaultProps = {
  permisos: [], // Si no hay permisos, se asigna un array vacío
};

export default Home;
