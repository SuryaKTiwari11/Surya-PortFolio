import { people } from "../../../data";
import avatar from "../../../assets/default-avatar.svg"
const list = () => {
  return (
    <div>
      {people.map((person) => {
        return (
          <div key={person.id}>
            <h4>{person.name}</h4>
            <h4>{person.id}</h4>
            <h4>{person.nickName || "suryaisABADDIE"}</h4>
            
            <img style={{width:'50px'}} src={
              person.images?.[0]?.small?.url || avatar}/>
          </div>
        );
      })}
    </div>
  );
};

export default list;
