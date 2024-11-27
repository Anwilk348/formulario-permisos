import PropTypes from "prop-types";
import { formatDate } from "../utils/dateUtils";

const AuthorizePermission = ({ permissions, onApprove, onReject }) => {
  const [loading, setLoading] = useState(null);

  const handleApprove = async (id) => {
    setLoading(id);
    await onApprove(id);
    setLoading(null);
  };
  const handleReject = async (id) => {
    setLoading(id);
    await onReject(id);
    setLoading(null);
  };
  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Autorizar Permisos</h2>
      <table className="table w-full mt-4">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Motivo</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {permissions.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">No hay permisos pendientes</td>
            </tr>
          ) : (
            permissions.map((perm) => (
              <tr key={perm.id}>
                <td>{perm.user}</td>
                <td>{perm.reason}</td>
                <td>{`${formatDate(perm.startDate)} - ${formatDate(perm.endDate)}`}</td>
                <td>
                  <button className="btn btn-success" onClick={() => onApprove(perm.id)}
                    disabled={loading === perm.id}
                    aria-label={`Aprobar permiso de ${perm.user}`}
                  >
                    {loading === perm.id ? "Aprobando..." : "Aprobar"}
                  </button>

                  <button className="btn btn-error ml-2"
                    onClick={() => onReject(perm.id)}
                    aria-label={`Rechazar permiso de ${perm.user}`}
                  >
                    {loading === perm.id ? "Rechazando..." : "Rechazar"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
AuthorizePermission.propTypes = {
  permissions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      reason: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};
export default AuthorizePermission;
