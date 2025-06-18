import { FC, useEffect, useState, CSSProperties } from 'react';
import { useAuthStore } from 'app/store/auth/store';
import axios from 'axios';
import { BASE_URL } from 'shared/api/ENDPOINTS.ts';

interface TeamMemberDto {
  id: number;
  name: string;
  email: string;
  photoPath: string;
  role: string;
}

interface ProjectDto {
  id: number;
  name: string;
  description: string;
  invitationCode: string;
  teamLeadId: number;
}

interface TeamPageResponse {
  projectName: string;
  invitationCode: string;
  teamMembers: TeamMemberDto[];
}

export const TeamPage: FC = () => {
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null); // Теперь projectId динамический
  const [teamData, setTeamData] = useState<TeamPageResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [invitationCodeInput, setInvitationCodeInput] = useState<string>('');
  const [roleInput, setRoleInput] = useState<string>('Developer'); // Дефолтная роль
  const [joinSuccess, setJoinSuccess] = useState<boolean>(false);

  const { token, user } = useAuthStore(); // Получаем токен и пользователя из хранилища

  useEffect(() => {
    const determineProjectIdAndFetchTeamData = async () => {
      setLoading(true);
      setError(null);
      let resolvedProjectId: string | null = null;

      if (user?.id && token) {
        // Попытка получить ID проекта, если пользователь тимлид
        if (user.teamLead) {
          try {
            const response = await axios.get<number>(`${BASE_URL}/api/user/team-lead-project`, {
              headers: {
                'X-User-Id': user.id.toString(),
                'Authorization': `Bearer ${token}`,
              },
            });
            if (response.status === 200 && response.data) {
              resolvedProjectId = response.data.toString();
            }
          } catch (err) {
            console.warn(
              'User is team lead but no project found or failed to fetch team lead project ID:',
              err,
            );
          }
        }

        // Если projectId еще не определен (пользователь не тимлид или не имеет проекта как тимлид),
        // пытаемся получить проекты, в которых он состоит как обычный участник.
        if (!resolvedProjectId) {
          try {
            const response = await axios.get<ProjectDto[]>(`${BASE_URL}/api/projects/user/${user.id}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            if (response.status === 200 && response.data && response.data.length > 0) {
              // Берем ID первого найденного проекта
              resolvedProjectId = response.data[0].id.toString();
            }
          } catch (err) {
            console.warn('Failed to fetch user\'s projects as a member:', err);
          }
        }
      }

    
      if (!resolvedProjectId) {
        setLoading(false);
        setTeamData(null); 
        setCurrentProjectId(null);
        return;
      }

      setCurrentProjectId(resolvedProjectId); 

      try {
        const response = await axios.get<TeamPageResponse>(
          `${BASE_URL}/api/projects/${resolvedProjectId}/team`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          },
        );
        setTeamData(response.data);
      } catch (err) {
        setError(
          'Failed to fetch team data for project. Ensure project exists or you have access.',
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      determineProjectIdAndFetchTeamData();
    } else {
      setLoading(false);
    }
  }, [token, user]); 

  const handleJoinTeam = async () => {
    if (!invitationCodeInput) {
      alert('Please enter an invitation code');
      return;
    }

    const userId = user?.id; 

    if (!userId) {
      alert('User not authenticated');
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/team/join`,
        { invitationCode: invitationCodeInput, role: roleInput },
        {
          
          headers: {
            'X-User-Id': userId.toString(),
            'Authorization': `Bearer ${token}`,
          },
        },
      );
      setJoinSuccess(true);
      
      window.location.reload(); 
    } catch (err) {
      setError('Failed to join team. Check invitation code or if already a member.');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading team data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentProjectId) {
  
    return (
      <div style={styles.container}>
        <h1 style={styles.header}>Join a Team</h1>
        <div style={styles.section}>
          <h2 style={styles.subHeader}>Enter Invitation Code:</h2>
          <input
            type="text"
            placeholder="Invitation Code"
            value={invitationCodeInput}
            onChange={(e) => setInvitationCodeInput(e.target.value)}
            style={styles.input}
          />
          <h2 style={styles.subHeader}>Select Your Role:</h2>
          <select
            value={roleInput}
            onChange={(e) => setRoleInput(e.target.value)}
            style={styles.input} // Используем тот же стиль, что и для input
          >
            <option value="Developer">Developer</option>
            <option value="Tester">Tester</option>
            <option value="Designer">Designer</option>
            <option value="Viewer">Viewer</option>
          </select>
          <button onClick={handleJoinTeam} style={styles.button}>
            Join Team
          </button>
          {joinSuccess && (
            <p style={styles.successMessage}>Successfully joined the team! Reloading page...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Team: {teamData?.projectName}</h1>
      <div style={styles.section}>
        <h2 style={styles.subHeader}>Invitation Code:</h2>
        <p style={styles.invitationCode}>{teamData?.invitationCode}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subHeader}>Team Members:</h2>
        <ul style={styles.memberList}>
          {teamData?.teamMembers.map((member) => (
            <li key={member.id} style={styles.memberItem}>
              <img
                src={member.photoPath || 'https://via.placeholder.com/40'}
                alt={member.name}
                style={styles.memberPhoto}
              />
              <div>
                <p style={styles.memberName}>
                  {member.name} ({member.role})
                </p>
                <p style={styles.memberEmail}>{member.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subHeader}>Join Another Team (or if not yet joined):</h2>
        <input
          type="text"
          placeholder="Enter Invitation Code"
          value={invitationCodeInput}
          onChange={(e) => setInvitationCodeInput(e.target.value)}
          style={styles.input}
        />
        <h2 style={styles.subHeader}>Select Your Role:</h2>
        <select
          value={roleInput}
          onChange={(e) => setRoleInput(e.target.value)}
          style={styles.input}
        >
          <option value="Developer">Developer</option>
          <option value="Tester">Tester</option>
          <option value="Designer">Designer</option>
          <option value="Viewer">Viewer</option>
        </select>
        <button onClick={handleJoinTeam} style={styles.button}>
          Join
        </button>
        {joinSuccess && (
          <p style={styles.successMessage}>Successfully joined the team! Reloading page...</p>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  header: {
    fontSize: '2.5em',
    color: '#333',
    textAlign: 'center',
    marginBottom: '30px',
  },
  section: {
    marginBottom: '25px',
    borderBottom: '1px solid #eee',
    paddingBottom: '20px',
    lineHeight: '1.6',
  },
  subHeader: {
    fontSize: '1.5em',
    color: '#555',
    marginBottom: '15px',
  },
  invitationCode: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    color: '#007bff',
  },
  memberList: {
    listStyleType: 'none',
    padding: '0',
  },
  memberItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  memberPhoto: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '15px',
    objectFit: 'cover',
  },
  memberName: {
    margin: '0',
    fontSize: '1.1em',
    color: '#333',
  },
  memberEmail: {
    margin: '0',
    fontSize: '0.9em',
    color: '#777',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
    float: 'right',
  },
  successMessage: {
    color: 'green',
    marginTop: '10px',
    textAlign: 'center',
  },
};
