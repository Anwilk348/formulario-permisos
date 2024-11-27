import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importamos SweetAlert para la confirmación
import { motion } from 'framer-motion'; // Importamos motion desde framer-motion

const Authorize = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: 'Juan Pérez', reason: 'Día libre', date: '2024-11-23' },
    { id: 2, name: 'María López', reason: 'Vacaciones', date: '2024-11-24' },
  ]);

  // Manejar la acción de autorizar o rechazar con confirmación
  const handleAction = (id, action) => {
    Swal.fire({
      title: `¿Estás seguro de que quieres ${action} esta solicitud?`,
      text: `Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sí, ${action}`,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedRequests = requests.filter((request) => request.id !== id);
        setRequests(updatedRequests);
        Swal.fire(
          '¡Completado!',
          `Solicitud ${action}: ID ${id} ha sido ${action}.`,
          'success'
        );
      }
    });
  };

  return (
    <motion.div
      className="min-h-screen bg-base-200 flex items-center justify-center"
      initial={{ opacity: 0 }}  // Inicialmente invisible
      animate={{ opacity: 1 }}   // Animar hacia visible
      transition={{ duration: 1 }} // Duración de la animación
    >
      {/* Botón flotante para volver (en la parte superior) */}
      <Link
        to="/"
        className="fixed top-4 left-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-focus transition-all duration-300"
        title="Volver al inicio"
      >
        <i className="fas fa-arrow-left text-xl"></i> {/* Icono de flecha hacia atrás */}
      </Link>

      <motion.div
        className="card bg-white shadow-lg p-6 rounded-lg w-full max-w-3xl"
        initial={{ y: -50, opacity: 0 }}  // Comienza fuera de la pantalla
        animate={{ y: 0, opacity: 1 }}   // Desliza y aparece
        transition={{ duration: 0.8 }}    // Duración de la animación
      >
        <h2 className="text-2xl font-bold mb-4">Autorizar Permisos</h2>
        <motion.table
          className="table w-full"
          initial={{ opacity: 0 }}  // Comienza invisible
          animate={{ opacity: 1 }}   // Se vuelve visible
          transition={{ duration: 1 }}
        >
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Motivo</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <motion.tr
                  key={request.id}
                  initial={{ opacity: 0 }}  // Comienza invisible
                  animate={{ opacity: 1 }}   // Se vuelve visible
                  transition={{ duration: 0.5 }}
                >
                  <td>{request.name}</td>
                  <td>{request.reason}</td>
                  <td>{request.date}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm mr-2"
                      onClick={() => handleAction(request.id, 'autorizada')}
                    >
                      Autorizar
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleAction(request.id, 'rechazada')}
                    >
                      Rechazar
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No hay solicitudes pendientes.
                </td>
              </tr>
            )}
          </tbody>
        </motion.table>
      </motion.div>
    </motion.div>
  );
};

export default Authorize;
