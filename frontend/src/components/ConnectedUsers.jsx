import { useSocket } from "../Socket/SocketContext";

function ConnectedUsers(){
    const {connectedUsers, disconnectSocket } = useSocket();
   return (
     <div className="mt-4">
       <h3>Connected Users:</h3>
       <ul className="list-group">
         {connectedUsers.map((user, index) => (
           <li
             key={index}
             className="list-group-item d-flex justify-content-between align-items-center"
           >
             {user}{" "}
             {/* <button
               className="btn btn-link text-danger p-0"
               onClick={() => disconnectSocket(index)}
               aria-label="Remove user"
             >
               <i className="bi bi-x-circle"></i> 
             </button> */}
           </li>
         ))}
       </ul>
     </div>
   );

}

export default ConnectedUsers;