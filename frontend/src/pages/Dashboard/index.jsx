import ProjectUpdate from '../../components/ProjectUpdate';
import Logout from '../../components/logout';
import './style.scss';

function Dashboard() {
  return (
    <>
      <div className='dashboard'>
        <h1 className='dashboard__title'>Tableau de Bord</h1>
        <Logout />
      </div>
      <ProjectUpdate />
    </>
  );
}
export default Dashboard;
