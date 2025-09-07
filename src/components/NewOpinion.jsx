import { use } from "react";
import { useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";

export function NewOpinion() {
  const {addOpinion}=use(OpinionsContext);
  async function shareOptionAction(prevState,formData){
      const title=formData.get("title");
      const body = formData.get("body");
      const userName=formData.get("userName");
      // console.log(formData);
      let errors=[];
      if(title.trim().length < 5){
        errors.push("Title must be at least five character long.");
      }
      if(body.trim().length<10 || body.trim().length>300){
        errors.push("Opnion must be b/t 10 to 300 characters long");
      }
      if(!userName.trim()){
        errors.push("User name must be required");
      }
      if(errors.length>0){
        return{
          errors,
          enteredValues:{
            title,
            body,
            userName
          }
        };
      }
      //submit to backed:-
      await addOpinion({title,body,userName});
      return {
        errors: null,
        enteredValues: {
        title: "",
        body: "",
        userName: ""
    }
  };
      
  }
 const [formState, formAction] = useActionState(shareOptionAction, { 
  errors: null,
  enteredValues: {
    title: "",
    body: "",
    userName: ""
  }
});

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.userName}/>
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title}/>
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5}defaultValue={formState.enteredValues?.body}></textarea>
        </p>
          {
            formState.errors &&(
              <ul className="errors">
                {formState.errors.map((error)=>(
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )
          }
        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
