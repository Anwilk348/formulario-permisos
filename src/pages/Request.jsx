import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import PropTypes from "prop-types"; // Importamos PropTypes

const Request = ({ onRequestSubmit }) => {
  const [formData, setFormData] = useState({ name: "", reason: "", date: "" });
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true); // Inicia el estado de carga
    const requestStatus = Math.random() > 0.5 ? "Autorizado" : "No Autorizado"; // Simulación aleatoria de autorización
    
    // Simulamos un retardo para la carga (ejemplo: llamada a la API)
    setTimeout(() => {
      onRequestSubmit(formData, requestStatus); // Pasar los datos de la solicitud y su estado
      Swal.fire({
        icon: "success",
        title: "Solicitud enviada",
        text: `Tu solicitud ha sido enviada y está en espera de autorización.`,
        confirmButtonText: "Aceptar",
      });
      setFormData({ name: "", reason: "", date: "" }); // Limpiar formulario
      setLoading(false); // Finaliza el estado de carga
    }, 2000); // Simulamos un retraso de 2 segundos
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center rounded-lg justify-center py-12">
      {/* Botón de volver */}
      <Link
        to="/"
        className="fixed top-20 left-4 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
        title="Volver al inicio"
      >
        <i className="fas fa-arrow-left text-xl"></i>
      </Link>

      {/* Card principal con animación */}
      <motion.div
        className="card bg-white shadow-xl p-6 rounded-lg w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl font-semibold mb-6 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Solicitar Permiso
        </motion.h2>
        <form onSubmit={handleSubmit}>
          {/* Campo Nombre */}
          <motion.div
            className="form-control mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <label className="label text-gray-600">
              <span className="label-text">Nombre:</span>
            </label>
            <input
              type="text"
              name="name"
              className="input input-bordered border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </motion.div>

          {/* Campo Motivo */}
          <motion.div
            className="form-control mb-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <label className="label text-gray-600">
              <span className="label-text">Motivo:</span>
            </label>
            <textarea
              name="reason"
              className="textarea textarea-bordered border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </motion.div>

          {/* Campo Fecha */}
          <motion.div
            className="form-control mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <label className="label text-gray-600">
              <span className="label-text">Fecha:</span>
            </label>
            <input
              type="date"
              name="date"
              className="input input-bordered border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </motion.div>

          {/* Botón Enviar */}
          <motion.button
            type="submit"
            className="btn btn-blue w-full py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading} // Deshabilitamos el botón mientras se envía la solicitud
          >
            {loading ? "Enviando..." : "Enviar Solicitud"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

Request.propTypes = {
  onRequestSubmit: PropTypes.func.isRequired, // Validación de la prop onRequestSubmit
};

Request.defaultProps = {
  onRequestSubmit: () => {}, // Función vacía por defecto
};

export default Request;
