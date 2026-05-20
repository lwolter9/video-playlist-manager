import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const TaskList = ({
  tasks,
  setTasks,
}) => {

  const { user } = useAuth();

  const handleDelete = async (id) => {

    try {

      await axiosInstance.delete(
        `/api/playlists/${id}`,
        {
          headers: {
            Authorization:
            `Bearer ${user.token}`,
          },
        }
      );

      setTasks(
        tasks.filter(
          (playlist) =>
          playlist._id !== id
        )
      );

    }

    catch {

      alert(
        'Delete failed'
      );

    }

  };

  return (

    <div>

      {

        tasks.map(
          (playlist) => (

            <div
              key={playlist._id}
              className="bg-gray-100 p-4 rounded mb-4"
            >

              <h2 className="font-bold">

                {playlist.title}

              </h2>

              <p>

                {playlist.description}

              </p>

              <p>

                Videos:

                {

                  playlist.videos?.length || 0

                }

              </p>

              <button
                onClick={() =>
                  handleDelete(
                    playlist._id
                  )
                }
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >

                Delete

              </button>

            </div>

          )

        )

      }

    </div>

  );

};

export default TaskList;