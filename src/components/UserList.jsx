import { useState, useEffect } from 'react';
import { getUsers } from '../services/user.service';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (pageNum = 1, query = {}) => {
    setLoading(true);
    try {
      const data = await getUsers(pageNum, query);
      setUsers(data);
      setTotalPages(data.total_pages || 1);
      setError('');
    } catch (err) {
      setError('Błąd podczas pobierania użytkowników');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="user-list">
      <h2>Lista użytkowników</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {loading ? (
        <p>Ładowanie...</p>
      ) : (
        <>
          {users.length === 0 ? (
            <p>Brak użytkowników do wyświetlenia</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Imię</th>
                  <th>Nazwisko</th>
                  <th>Email</th>
                  <th>Data urodzenia</th>
                  <th>Rola</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.birthdate).toLocaleDateString()}</td>
                    <td>{user.role_mask === 'A' ? 'Administrator' : 'Użytkownik'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="btn btn-sm btn-outline-primary"
              >
                Poprzednia
              </button>
              <span className="mx-2">
                Strona {page} z {totalPages}
              </span>
              <button 
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="btn btn-sm btn-outline-primary"
              >
                Następna
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserList;